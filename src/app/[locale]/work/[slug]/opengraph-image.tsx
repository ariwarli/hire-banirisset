import { ImageResponse } from "next/og";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/work";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCaseStudies(locale).map((cs) => ({ locale, slug: cs.slug }))
  );
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(locale, slug);
  const title = cs?.title ?? SITE.name;
  const metric = cs?.metrics?.[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#8b5cf6",
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 600 }}>{SITE.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {metric && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                border: "1px solid rgba(139,92,246,0.4)",
                borderRadius: 999,
                padding: "10px 24px",
                fontSize: 24,
                color: "#a78bfa",
              }}
            >
              {metric}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
