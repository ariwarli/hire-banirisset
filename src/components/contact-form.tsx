"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { CONTACT } from "@/lib/constants";

const initialState: ContactState = { status: "idle" };

const LABEL =
  "font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted-foreground";
const FIELD =
  "rounded border border-input bg-white px-4 py-3.5 text-[15px] leading-snug outline-none transition-colors focus:border-foreground/50";

/**
 * Server action, honeypot, and validation bounds are unchanged — only the
 * field chrome is restyled, so the ui/input + ui/textarea primitives are no
 * longer used here (their radius and dark-mode fills fight the new palette).
 */
export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  const showFallback =
    state.status === "error" || state.status === "rate_limited";

  return (
    <form action={formAction} className="flex max-w-[52ch] flex-col gap-5">
      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={LABEL}>
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={100}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL}>
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={LABEL}>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className={`${FIELD} min-h-[118px] resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded bg-ink px-[30px] py-4 text-[15px] font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? t("sending") : t("submit")}
      </button>

      {state.status === "success" ? (
        <p className="text-base text-accent-paper">{t("success")}</p>
      ) : null}
      {state.status === "validation_error" ? (
        <p className="text-base text-destructive">{t("error")}</p>
      ) : null}
      {showFallback ? (
        <div className="border-l-2 border-destructive/40 bg-paper-alt p-4 text-base">
          <p className="text-destructive">
            {state.status === "rate_limited" ? t("rateLimited") : t("error")}
          </p>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-medium underline underline-offset-4"
          >
            WhatsApp: {CONTACT.whatsappNumber}
          </a>
        </div>
      ) : null}
    </form>
  );
}
