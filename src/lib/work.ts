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
});

export type CaseStudyFrontmatter = z.infer<typeof frontmatterSchema>;

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  content: string;
};

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
