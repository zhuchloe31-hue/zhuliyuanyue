import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  tags: string[];
  cover: string;
  role: string;
}

export interface ProjectTocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export interface ProjectCaseStudy {
  id: string;
  metadata: ProjectFrontmatter;
  content: string;
  toc: ProjectTocItem[];
}

const projectDirectory = path.join(process.cwd(), "src/content/projects");
const validProjectId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getProjectIds() {
  const files = await readdir(projectDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => filenameToProjectId(file))
    .sort();
}

export async function getProjectCaseStudy(
  projectId: string,
): Promise<ProjectCaseStudy | null> {
  if (!validProjectId.test(projectId)) return null;

  try {
    const files = await readdir(projectDirectory);
    const filename = files.find(
      (file) => file.endsWith(".md") && filenameToProjectId(file) === projectId,
    );
    if (!filename) return null;

    const source = await readFile(path.join(projectDirectory, filename), "utf8");
    const parsed = matter(source);
    const metadata = parseMetadata(parsed.data, projectId);

    return {
      id: projectId,
      metadata,
      content: parsed.content.trim(),
      toc: buildTableOfContents(parsed.content),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function filenameToProjectId(filename: string) {
  return filename
    .replace(/\.md$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function parseMetadata(data: Record<string, unknown>, projectId: string): ProjectFrontmatter {
  const title = toRequiredString(data.title, "title", projectId);
  const subtitle = toRequiredString(data.subtitle, "subtitle", projectId);

  return {
    title,
    subtitle,
    category: toStringValue(data.category, "Project Case Study"),
    date: toStringValue(data.date, ""),
    tags: Array.isArray(data.tags)
      ? data.tags.map((tag) => String(tag)).filter(Boolean)
      : [],
    cover: toStringValue(data.cover, ""),
    role: toStringValue(data.role, ""),
  };
}

function toRequiredString(value: unknown, field: string, projectId: string) {
  const result = toStringValue(value, "");
  if (!result) {
    throw new Error(`Project "${projectId}" is missing frontmatter field "${field}".`);
  }
  return result;
}

function toStringValue(value: unknown, fallback: string) {
  if (value === null || value === undefined) return fallback;
  return String(value).trim() || fallback;
}

function buildTableOfContents(content: string): ProjectTocItem[] {
  const tree = unified().use(remarkParse).parse(content);
  const slugger = new GithubSlugger();
  const headings: ProjectTocItem[] = [];

  visit(tree, "heading", (node) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const label = toString(node).trim();
    if (!label) return;

    headings.push({
      id: slugger.slug(label),
      label,
      level: node.depth,
    });
  });

  return headings;
}
