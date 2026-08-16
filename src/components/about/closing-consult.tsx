import { useTranslations } from "next-intl";
import { CtaPanel } from "@/components/cta-panel";
import { CONTACT } from "@/lib/constants";

/** No WhatsApp button/row here — desktop gets a single Book Consultation
 *  button, mobile skips the practical-info table entirely (2.8). */
export function ClosingConsult() {
  const t = useTranslations("AboutPage.closingCta");

  return (
    <CtaPanel
      heading={t("heading")}
      headingMaxWidthCh={24}
      body={t.raw("body") as string[]}
      primary={{ label: t("primary"), href: "/contact" }}
      rows={[
        { label: t("consultLabel"), value: t("consultValue") },
        { label: t("responseLabel"), value: t("responseValue") },
        { label: t("emailLabel"), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
      ]}
      hideRowsOnMobile
    />
  );
}
