import ProjectsSection from "@/components/dossier/projects-section";
import StatusBar from "@/components/dossier/status-bar";

export const metadata = {
  title: "Projects | Ayush Ghosh",
  description: "Featured engineering projects, repositories, and agentic workflows by Ayush Ghosh.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <main className="max-w-[700px] mx-auto px-5 sm:px-6 pt-8 pb-24 selection:bg-[#4BC16B]/25 selection:text-[#4BC16B]">
        <div className="mb-8 pb-4 border-b border-[var(--hairline)]">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-tertiary)] mb-1">
            <span className="text-[#4BC16B]">●</span>
            <span>DIRECTORY // REPOSITORIES</span>
          </div>
          <h1 className="font-mono text-[22px] sm:text-[26px] font-semibold tracking-tight text-[var(--text-primary)]">
            Projects &amp; Deployments
          </h1>
          <p className="font-sans text-[13px] text-[var(--text-secondary)] mt-1">
            Production full-stack platforms, autonomous Agentic workflows, and open-source frameworks.
          </p>
        </div>

        <ProjectsSection />
      </main>
      <StatusBar />
    </div>
  );
}
