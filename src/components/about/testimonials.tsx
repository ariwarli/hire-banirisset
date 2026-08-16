import { useTranslations } from "next-intl";

interface Testimonial {
  quote: string;
  name: string;
  source: string;
}

/**
 * Reviews are verbatim and are NOT translated — they stay in the language the
 * client wrote them in, in both locales. Only the section title comes from
 * messages (`AboutPage.testimonials.title`). New Google reviews get appended
 * to REVIEWS; FEATURED is rendered as the large opening quote.
 */
const FEATURED: Testimonial = {
  quote:
    "Buat website, LMS, SEO. Sampe training AI buat kantor. Semua sama Mas Bani n team. Salutee…!",
  name: "Renwa Sikis",
  source: "Training AI Level Manajer",
};

const REVIEWS: Testimonial[] = [
  {
    quote:
      "Analisisnya tajam, really helpful buat yang punya berbagai macam kebutuhan di dunia digital. Tengkyuu Bani.",
    name: "Efnie Indrianie, Psikolog",
    source: "Bedah Personal Brand",
  },
  {
    quote: "Pelatihan AI dan penggunaan prompt sangat bermangfaat",
    name: "Munggar Agan",
    source: "Kelas AI",
  },
  {
    quote:
      "ikut kelas ini meskipun singkat tapi sangat bermanfaat sekali kita jadi tidak gaptek dan bisa bikin logo serta bikin konten [ iklan sendiri ] unk mengembangkan usaha kita",
    name: "Ai Marfuah",
    source: "Kelas AI UMKM",
  },
  {
    quote:
      "Thanks, website kami dapat urutan 10 besar di keyword yang kami inginkan, visitor per harinya pun bertambah banyak.",
    name: "Eric Afrianto",
    source: "Search Engine Optimization",
  },
  {
    quote:
      "Yang saya suka dari kerjasama disini adalah Profesional, hasil kerjanya juga bagus, dan sabar ngadepin klien kayak saya yg cerewet ini...hahahaha...sukses ya om bani ....dan pastinya akan banyak kerjaan yg harus dikerjakan",
    name: "Fitri Andayani",
    source: "Website dan Konsultasi",
  },
  {
    quote:
      "Nih, gw kasi review buat Teras Digital Tech. Mereka emang kompeten banget buat bikin segala aplikasi Chat GPT. Aplikasinya keren trus interaksi dengan user keren. Stabil, responnya cepat, dan gampang dioperasin. Jadi, gw puas banget deh!",
    name: "Reva Fitya",
    source: "Aplikasi AI Custom",
  },
];

const STARS = "★★★★★";

export function Testimonials() {
  const t = useTranslations("AboutPage.testimonials");

  return (
    <section className="flex flex-col gap-7 px-[22px] py-10 md:px-11 md:pb-13">
      <h2 className="text-[26px] leading-tight">{t("title")}</h2>

      <figure className="m-0 flex max-w-[840px] flex-col gap-[18px] border-t-2 border-foreground pt-[22px]">
        <p className="font-mono text-xs tracking-[0.16em] text-accent-paper">{STARS}</p>
        <blockquote className="font-serif text-[22px] leading-[1.42] text-pretty md:text-[27px]">
          {"“"}
          {FEATURED.quote}
          {"”"}
        </blockquote>
        <figcaption className="flex flex-wrap items-baseline gap-3">
          <span className="text-[15px] leading-snug font-medium">{FEATURED.name}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{FEATURED.source}</span>
        </figcaption>
      </figure>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className="m-0 flex flex-col gap-3 border-t border-border pt-4"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-accent-paper">{STARS}</p>
            <blockquote className="text-[15px] leading-[1.62] text-pretty">
              {"“"}
              {review.quote}
              {"”"}
            </blockquote>
            <figcaption className="mt-auto flex flex-col gap-0.5 pt-1.5">
              <span className="text-sm leading-snug font-medium">{review.name}</span>
              <span className="font-mono text-[10.5px] leading-normal text-muted-foreground">
                {review.source}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
