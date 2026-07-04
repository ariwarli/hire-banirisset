import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "as-needed",
  // PRD edge case: "pengunjung berbahasa Inggris membuka URL ID -> tidak
  // redirect paksa". Without this, next-intl auto-redirects "/" to "/en"
  // based on the browser's Accept-Language header on every first visit.
  localeDetection: false,
});
