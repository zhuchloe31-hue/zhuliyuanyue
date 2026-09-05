import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { SiteShell } from "../../components/SiteChrome";
import {
  getProjectCaseStudy,
  getProjectIds,
} from "@/src/lib/projectContent";

export async function generateStaticParams() {
  const projectIds = await getProjectIds();
  return projectIds.map((projectId) => ({ projectId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProjectCaseStudy(projectId);

  if (!project) {
    return { title: "项目不存在 | AI 产品作品集" };
  }

  return {
    title: `${project.metadata.title} | AI 产品作品集`,
    description: project.metadata.subtitle,
    openGraph: {
      title: `${project.metadata.title} | AI 产品作品集`,
      description: project.metadata.subtitle,
      images: [],
    },
    twitter: {
      title: `${project.metadata.title} | AI 产品作品集`,
      description: project.metadata.subtitle,
      images: [],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectCaseStudy(projectId);

  if (!project) notFound();

  const { metadata } = project;

  return (
    <SiteShell>
      <article className="case-study-shell">
        <header className="case-study-header">
          <Link className="case-back" href="/#projects">
            <ArrowLeft size={16} />
            返回项目列表
          </Link>
          <section className="case-study-card" aria-labelledby="case-study-title">
            <div className="case-card-kicker">
              <span>AI Product Case Study</span>
              <span>{metadata.category}</span>
            </div>
            <h1 id="case-study-title">{metadata.title}</h1>
            <p className="case-subtitle">{metadata.subtitle}</p>
            <div className="case-card-divider" />
            <div className="case-meta" aria-label="项目元信息">
              {metadata.date ? (
                <div>
                  <span>时间</span>
                  <strong>{metadata.date}</strong>
                </div>
              ) : null}
              {metadata.role ? (
                <div>
                  <span>我的角色</span>
                  <strong>{metadata.role}</strong>
                </div>
              ) : null}
            </div>
            {metadata.tags.length ? (
              <div className="case-tags" aria-label="项目标签">
                {metadata.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}
          </section>
        </header>

        <div className="case-layout">
          <aside className="case-toc" aria-label="文章目录">
            <p>目录</p>
            <nav>
              {project.toc.map((item) => (
                <a className={item.level === 3 ? "nested" : ""} href={`#${item.id}`} key={item.id}>
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="case-markdown">
            <ReactMarkdown
              rehypePlugins={[rehypeSlug]}
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ alt, src }) => (
                  <figure className="markdown-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={alt ?? "项目内容图片"} loading="lazy" src={src} />
                    {alt ? <figcaption>{alt}</figcaption> : null}
                  </figure>
                ),
              }}
            >
              {project.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
