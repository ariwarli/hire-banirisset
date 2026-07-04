import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/work";
import { SITE } from "@/lib/constants";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const staticPaths = ["", "/work", "/about", "/contact"];
  const caseStudies = getAllCaseStudies();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    for (const p of staticPaths) {
      entries.push({
        url: `${base}${prefix}${p}`,
        lastModified: new Date(),
      });
    }

    for (const cs of caseStudies) {
      entries.push({
        url: `${base}${prefix}/work/${cs.slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
