"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { isRateLimited } from "@/lib/rate-limit";
import { CONTACT } from "@/lib/constants";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error" };
  }

  try {
    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT.email;

    // onboarding@resend.dev works without domain verification; switch to a
    // banirisset.com sender once SPF/DKIM is configured (see .env.example).
    await resend.emails.send({
      from: "hire.banirisset.com <onboarding@resend.dev>",
      to: toEmail,
      replyTo: parsed.data.email,
      subject: parsed.data.subject || `Pesan baru dari ${parsed.data.name}`,
      text: [
        `Nama: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
