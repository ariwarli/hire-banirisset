import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

function contentDir(locale: string) {
  return path.join(process.cwd(), "src/content/work", locale);
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  year: z.string().min(1),
  sector: z.string().min(1),
  tools: z.array(z.string()).min(1),
  outcome: z.string().min(1, "outcome wajib diisi — tanpa outcome konkret, case study tidak layak publish"),
  featured: z.boolean().default(false),
  metrics: z.array(z.string()).optional(),

  // ── added by the redesign — all optional, nothing breaks without them ──
  /** 16:9 screenshot shown between the meta strip and Problem. */
  image: z.string().optional(),
  imageCaption: z.string().optional(),
  /** 3:2 proof artefact shown inside Outcome (award, handover photo). */
  proofImage: z.string().optional(),
  proofCaption: z.string().optional(),
  /** External asset gallery (e.g. Playbook) — renders a small text link. */
  assetsUrl: z.string().url().optional(),
});

export type CaseStudyFrontmatter = z.infer<typeof frontmatterSchema>;

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  content: string;
};

/** Splits MDX body into `## `-delimited sections so the page can render a
 *  heading rail beside each block. Text before the first h2 becomes intro. */
export function splitSections(content: string) {
  const parts = content.split(/^##\s+/m);
  const intro = parts.shift()?.trim() ?? "";
  const sections = parts.map((part) => {
    const [heading, ...rest] = part.split("\n");
    return { heading: heading.trim(), body: rest.join("\n").trim() };
  });
  return { intro, sections };
}

export function getAllCaseStudies(locale: string): CaseStudy[] {
  const dir = contentDir(locale);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = frontmatterSchema.parse(data);
      return { ...frontmatter, slug, content };
    })
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export function getCaseStudyBySlug(locale: string, slug: string): CaseStudy | null {
  const filePath = path.join(contentDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = frontmatterSchema.parse(data);

  return { ...frontmatter, slug, content };
}

export function getFeaturedCaseStudies(locale: string, limit = 3): CaseStudy[] {
  const all = getAllCaseStudies(locale);
  const featured = all.filter((cs) => cs.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}
