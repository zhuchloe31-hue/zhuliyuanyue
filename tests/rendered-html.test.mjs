import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("portfolio source contains the requested homepage structure", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const chrome = await readFile(
    new URL("../app/components/SiteChrome.tsx", import.meta.url),
    "utf8",
  );
  const profile = await readFile(
    new URL("../src/data/profile.ts", import.meta.url),
    "utf8",
  );
  const projects = await readFile(
    new URL("../src/data/projects.ts", import.meta.url),
    "utf8",
  );
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(page, /HomeIntro/);
  assert.doesNotMatch(page, /AboutSection/);
  assert.doesNotMatch(page, /ExperienceList/);
  assert.doesNotMatch(page, /ProjectList/);
  assert.doesNotMatch(page, /ContactSection/);
  assert.doesNotMatch(chrome, /href: "\/#about"/);
  assert.doesNotMatch(chrome, /href: "\/#experience"/);
  assert.match(chrome, /href: "\/#projects"/);
  assert.doesNotMatch(chrome, /href: "\/#contact"/);
  assert.match(chrome, /intro-projects/);
  assert.doesNotMatch(chrome, /intro-card/);
  assert.match(chrome, /intro-contact-links/);
  assert.doesNotMatch(chrome, /about-placeholder/);
  assert.doesNotMatch(chrome, /联系我/);
  assert.match(chrome, /© 2027/);
  assert.match(css, /grid-template-columns: minmax\(0, 4fr\) minmax\(420px, 6fr\)/);
  assert.match(css, /--background: #fbfdff/);
  assert.match(css, /--font-display:/);
  assert.match(profile, /朱李元月/);
  assert.match(profile, /zhuchloe31@gmail\.com/);
  assert.match(profile, /github\.com\/zhuchloe31-hue/);
  assert.match(profile, /AI Product Builder/);
  assert.match(profile, /目前正在寻找 2027 秋招机会/);
  assert.match(profile, /关注 AI Agent、大模型应用与 AI Native 产品。/);
  assert.match(profile, /把 AI 能力转化为可理解、可控制、可持续使用的产品体验。/);
  assert.match(projects, /title: "Eat First"/);
  assert.match(projects, /title: "ChinaGo"/);
  assert.match(projects, /slug: "by-claw"/);
  assert.match(projects, /ProjectCategory/);
  assert.match(projects, /label: "实习"/);
  assert.match(projects, /label: "个人"/);
  assert.doesNotMatch(projects, /"2026"/);
  assert.match(projects, /项目概览/);
  assert.match(projects, /未来优化/);
});

test("project source has Cloudflare support without Sites or sign-in configuration", async () => {
  const viteConfig = await readFile(
    new URL("../vite.config.ts", import.meta.url),
    "utf8",
  );
  const packageJson = await readFile(
    new URL("../package.json", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(viteConfig, /@openai\/sites|hosting\.json/);
  assert.doesNotMatch(packageJson, /@openai\/sites/);
  assert.match(viteConfig, /@cloudflare\/vite-plugin/);
  assert.match(packageJson, /deploy:vinext/);
});

test("cloudflare and d1 scaffolding remains available", async () => {
  const worker = await readFile(
    new URL("../worker/index.ts", import.meta.url),
    "utf8",
  );
  const db = await readFile(new URL("../db/index.ts", import.meta.url), "utf8");
  const drizzle = await readFile(
    new URL("../drizzle.config.ts", import.meta.url),
    "utf8",
  );

  assert.match(worker, /Cloudflare Worker/);
  assert.match(db, /Cloudflare D1 binding/);
  assert.match(drizzle, /drizzle-kit/);
  await assert.rejects(
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    /ENOENT/,
  );
});

test("standalone pages removed in favor of anchors and project reader", async () => {
  await assert.rejects(
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    /ENOENT/,
  );
  await assert.rejects(
    readFile(new URL("../app/resume/page.tsx", import.meta.url), "utf8"),
    /ENOENT/,
  );
  await assert.rejects(
    readFile(new URL("../app/projects/page.tsx", import.meta.url), "utf8"),
    /ENOENT/,
  );
});

test("markdown project case study system is wired to the homepage", async () => {
  const list = await readFile(
    new URL("../app/components/ProjectListClient.tsx", import.meta.url),
    "utf8",
  );
  const detail = await readFile(
    new URL("../app/project/[projectId]/page.tsx", import.meta.url),
    "utf8",
  );
  const loader = await readFile(
    new URL("../src/lib/projectContent.ts", import.meta.url),
    "utf8",
  );
  const eatFirst = await readFile(
    new URL("../src/content/projects/EatFirst.md", import.meta.url),
    "utf8",
  );
  const chinaGo = await readFile(
    new URL("../src/content/projects/ChinaGo.md", import.meta.url),
    "utf8",
  );
  const byClaw = await readFile(
    new URL("../src/content/projects/BYClaw.md", import.meta.url),
    "utf8",
  );

  assert.match(list, /href={`\/project\/\${project\.slug}`}/);
  assert.match(detail, /ReactMarkdown/);
  assert.match(detail, /rehypeSlug/);
  assert.match(detail, /返回项目列表/);
  assert.match(detail, /case-study-card/);
  assert.doesNotMatch(detail, /case-hero/);
  assert.doesNotMatch(detail, /case-cover-fallback/);
  assert.match(loader, /gray-matter/);
  assert.match(loader, /import\.meta\.glob/);
  assert.doesNotMatch(loader, /node:fs|process\.cwd/);
  assert.match(loader, /buildTableOfContents/);
  assert.match(eatFirst, /title: Eat First/);
  assert.match(chinaGo, /title: ChinaGo/);
  assert.match(byClaw, /title: 百应Claw AI Agent & skills 生态建设/);
});
