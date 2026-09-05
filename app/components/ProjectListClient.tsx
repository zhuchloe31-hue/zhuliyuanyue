"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectCategories, projects, type ProjectCategory } from "@/src/data/projects";
import type { Project } from "@/src/data/projects";
import { TagList } from "./SiteChrome";

export function ProjectListClient() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | Extract<ProjectCategory, "internship" | "independent-ai">
  >("all");
  const visibleProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="project-area">
      <div className="filter-row" aria-label="项目分类">
        {projectCategories.map((category) => (
          <button
            className={category.value === activeCategory ? "filter active" : "filter"}
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="project-list">
        {visibleProjects.map((project) => (
          <ProjectListItem key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectListItem({ project }: { project: Project }) {
  return (
    <Link className="project-list-item" href={`/project/${project.slug}`}>
      <span className="project-index">{project.id}</span>
      <div className="project-summary">
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
        <div className="project-meta">
          <span>
            {project.categoryLabel} · {project.statusLabel}
          </span>
          <TagList tags={project.tags} />
        </div>
      </div>
      <span className="project-arrow" aria-hidden="true">
        <ArrowRight size={18} />
      </span>
    </Link>
  );
}
