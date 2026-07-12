"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { CONTACT } from "@/lib/constants";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  const showFallback =
    state.status === "error" || state.status === "rate_limited";

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" name="name" required minLength={2} maxLength={100} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
        />
      </div>

      <Button type="submit" disabled={isPending} size="lg">
        {isPending ? t("sending") : t("submit")}
      </Button>

      {state.status === "success" && (
        <p className="text-base text-primary">{t("success")}</p>
      )}
      {state.status === "validation_error" && (
        <p className="text-base text-destructive">{t("error")}</p>
      )}
      {showFallback && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-base">
          <p className="text-destructive">
            {state.status === "rate_limited" ? t("rateLimited") : t("error")}
          </p>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-medium text-primary underline underline-offset-4"
          >
            WhatsApp: {CONTACT.whatsappNumber}
          </a>
        </div>
      )}
    </form>
  );
}
