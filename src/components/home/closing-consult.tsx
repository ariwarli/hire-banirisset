import { useTranslations } from "next-intl";
import { CtaPanel } from "@/components/cta-panel";
import { CONTACT } from "@/lib/constants";

/**
 * Named closing-consult, not closing-cta — that name/namespace belonged to
 * the pre-redesign homepage closer and is unrelated to this section.
 */
export function ClosingConsult() {
  const t = useTranslations("HomePage.closingCta");

  return (
    <CtaPanel
      heading={t("heading")}
      headingMaxWidthCh={26}
      body={t.raw("body") as string[]}
      primary={{ label: t("primary"), href: CONTACT.bookingUrl }}
      rows={[
        { label: t("consultLabel"), value: t("consultValue") },
        { label: t("responseLabel"), value: t("responseValue") },
        { label: t("emailLabel"), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
      ]}
      whatsapp={{ label: t("whatsappLabel"), value: t("whatsappValue"), href: CONTACT.whatsappUrl }}
    />
  );
}
