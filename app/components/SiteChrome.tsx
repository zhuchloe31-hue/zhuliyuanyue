import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Menu } from "lucide-react";
import { profile } from "@/src/data/profile";
import { type Project } from "@/src/data/projects";
import { ProjectListClient } from "./ProjectListClient";

const navItems = [
  { href: "/#projects", label: "项目" },
  { href: profile.resumeUrl, label: "简历", external: true },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="主导航">
          <Link className="brand" href="/">
            {profile.name}
          </Link>
          <div className="nav-links desktop-nav">
            {navItems.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ),
            )}
          </div>
          <details className="mobile-menu">
            <summary aria-label="打开导航菜单">
              <Menu size={17} />
              Menu
            </summary>
            <div>
              {navItems.map((item) =>
                item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </details>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export function HomeIntro() {
  return (
    <section className="intro" id="top">
      <div className="intro-copy">
        <p className="kicker">{profile.status}</p>
        <h1>{profile.name}</h1>
        <p className="intro-title">{profile.title}</p>
        <p className="intro-text">{profile.headline}</p>
        <p className="intro-text">{profile.intro}</p>
        <div className="intro-contact-links" aria-label="联系链接">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
      <aside className="intro-projects" id="projects" aria-labelledby="home-projects-title">
        <h2 id="home-projects-title">项目</h2>
        <ProjectListClient />
      </aside>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div>© 2027 {profile.name}</div>
    </footer>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export function ProjectMiniPreview({ project }: { project: Project }) {
  return (
    <div className="mini-preview" aria-label={`${project.title} 产品预览`}>
      <div className="mini-preview-top">
        <span />
        <span />
        <span />
      </div>
      <div className="mini-preview-body">
        <p>{project.visual.label}</p>
        <h3>{project.visual.title}</h3>
        {project.visual.rows.map((row) => (
          <div key={row}>{row}</div>
        ))}
      </div>
    </div>
  );
}

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="document-header">
      <Link className="back-link" href="/#projects">
        <ArrowLeft size={16} />
        返回项目
      </Link>
      <h1>{project.title}</h1>
      <p>{project.subtitle}</p>
      <div className="document-meta">
        {project.year} · {project.categoryLabel} · {project.statusLabel}
      </div>
      <div className="document-links">
        {project.demoUrl ? <ExternalTextLink href={project.demoUrl} label="Demo" /> : null}
        {project.githubUrl ? <ExternalTextLink href={project.githubUrl} label="GitHub" /> : null}
        {project.documentUrl ? (
          <ExternalTextLink href={project.documentUrl} label="完整文档" />
        ) : null}
      </div>
    </header>
  );
}

export function ProjectPager({
  previous,
  next,
}: {
  previous: Project | null;
  next: Project | null;
}) {
  return (
    <nav className="project-pager" aria-label="项目切换">
      {previous ? (
        <Link href={`/projects/${previous.slug}`}>
          <ArrowLeft size={16} />
          {previous.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/projects/${next.slug}`}>
          {next.title}
          <ArrowRight size={16} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function ExternalTextLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
      <ExternalLink size={14} />
    </a>
  );
}
