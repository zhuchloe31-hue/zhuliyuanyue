import { Footer, HomeIntro, SiteShell } from "./components/SiteChrome";

export default function Home() {
  return (
    <SiteShell>
      <div className="page-shell">
        <HomeIntro />
      </div>
      <Footer />
    </SiteShell>
  );
}
