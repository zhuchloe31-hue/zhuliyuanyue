import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDocument } from "../../components/ProjectDocument";
import { ProjectHeader, ProjectPager, SiteShell } from "../../components/SiteChrome";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from "@/src/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "项目不存在 | AI 产品作品集",
    };
  }

  return {
    title: `${project.title} | AI 产品作品集`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | AI 产品作品集`,
      description: project.subtitle,
      images: [],
    },
    twitter: {
      title: `${project.title} | AI 产品作品集`,
      description: project.subtitle,
      images: [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <SiteShell>
      <article className="document-shell">
        <ProjectHeader project={project} />
        <ProjectDocument project={project} />
        <ProjectPager previous={previous} next={next} />
      </article>
    </SiteShell>
  );
}
