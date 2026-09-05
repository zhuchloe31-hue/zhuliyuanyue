"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Project, ProjectSection } from "@/src/data/projects";
import { ProjectMiniPreview } from "./SiteChrome";

export function ProjectDocument({ project }: { project: Project }) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(["overview"]),
  );
  const [activeId, setActiveId] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    Object.values(sectionRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSection = (id: string) => {
    setOpenSections((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const jumpToSection = (id: string) => {
    setOpenSections((current) => new Set(current).add(id));
    setActiveId(id);
    window.requestAnimationFrame(() => {
      sectionRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="document-layout">
      <aside className="document-sidebar" aria-label="项目目录">
        {project.sections.map((section) => (
          <button
            className={activeId === section.id ? "active" : ""}
            key={section.id}
            onClick={() => jumpToSection(section.id)}
            type="button"
          >
            {section.navLabel}
          </button>
        ))}
      </aside>
      <div className="accordion-list">
        {project.sections.map((section, index) => (
          <DocumentSection
            index={index}
            isOpen={openSections.has(section.id)}
            key={section.id}
            onToggle={() => toggleSection(section.id)}
            project={project}
            section={section}
            setRef={(node) => {
              sectionRefs.current[section.id] = node;
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DocumentSection({
  index,
  isOpen,
  onToggle,
  project,
  section,
  setRef,
}: {
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  project: Project;
  section: ProjectSection;
  setRef: (node: HTMLDivElement | null) => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <section className="document-section" id={section.id} ref={setRef}>
      <button
        aria-expanded={isOpen}
        className="document-section-trigger"
        onClick={onToggle}
        type="button"
      >
        <span>{number}</span>
        <strong>{section.title}</strong>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </button>
      <div className="document-section-panel" data-open={isOpen}>
        <div className="document-section-content">
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.flow ? <FlowList items={section.flow} /> : null}
          {section.decisions ? <DecisionList decisions={section.decisions} /> : null}
          {section.checklist ? <Checklist groups={section.checklist} /> : null}
          {section.id === "mvp" ? <ProjectMiniPreview project={project} /> : null}
        </div>
      </div>
    </section>
  );
}

function FlowList({ items }: { items: string[] }) {
  return (
    <ol className="flow-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function DecisionList({ decisions }: { decisions: ProjectSection["decisions"] }) {
  return (
    <div className="decision-list">
      {decisions?.map((decision, index) => (
        <article className="decision-item" key={decision.title}>
          <span>Decision {String(index + 1).padStart(2, "0")}</span>
          <h3>{decision.title}</h3>
          {decision.situation ? <p>{decision.situation}</p> : null}
          <p>
            <strong>为什么：</strong>
            {decision.reason}
          </p>
          <p>
            <strong>Trade-off：</strong>
            {decision.tradeoff ?? decision.decision}
          </p>
        </article>
      ))}
    </div>
  );
}

function Checklist({ groups }: { groups: NonNullable<ProjectSection["checklist"]> }) {
  return (
    <div className="checklist-grid">
      {groups.map((group) => (
        <div className="checklist-group" key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li data-tone={group.tone ?? "done"} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
