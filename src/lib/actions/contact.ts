"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { isRateLimited } from "@/lib/rate-limit";
import { CONTACT } from "@/lib/constants";

const MAILKETING_ENDPOINT = "https://api.mailketing.co.id/api/v1/send";

// Mailketing's error response schema isn't fully documented — only `status`
// is consistently present, so that's the only field we branch on.
type MailketingResponse = {
  status?: string;
  response?: string;
};

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  status: "idle" | "success" | "error" | "rate_limited" | "validation_error";
  message?: string;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "validation_error" };
  }

  // Honeypot filled -> silently pretend success, do not send email.
  if (parsed.data.website) {
    return { status: "success" };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return { status: "rate_limited" };
  }

  const apiToken = process.env.MAILKETING_API_TOKEN;
  if (!apiToken) {
    return { status: "error" };
  }

  try {
    const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT.email;

    const body = new URLSearchParams({
      api_token: apiToken,
      from_name: CONTACT.mailFromName,
      from_email: CONTACT.mailFromEmail,
      recipient: toEmail,
      subject: parsed.data.subject || `Pesan baru dari ${parsed.data.name}`,
      content: [
        `Nama: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    const res = await fetch(MAILKETING_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data: MailketingResponse = await res.json().catch(() => ({}));

    if (!res.ok || data.status !== "success") {
      return { status: "error" };
    }

    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
