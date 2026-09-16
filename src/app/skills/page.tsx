import TechStackSection from "@/components/dossier/tech-stack-section";
import HighlightsSection from "@/components/dossier/highlights-section";
import StatusBar from "@/components/dossier/status-bar";

export const metadata = {
  title: "Skills | Ayush Ghosh",
  description: "Technical competencies, toolchains, and frameworks by Ayush Ghosh.",
};

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <main className="max-w-[700px] mx-auto px-5 sm:px-6 pt-8 pb-24 selection:bg-[#4BC16B]/25 selection:text-[#4BC16B]">
        <div className="mb-8 pb-4 border-b border-[var(--hairline)]">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-tertiary)] mb-1">
            <span className="text-[#4BC16B]">●</span>
            <span>SYSTEM // CAPABILITIES</span>
          </div>
          <h1 className="font-mono text-[22px] sm:text-[26px] font-semibold tracking-tight text-[var(--text-primary)]">
            Technologies &amp; Competencies
          </h1>
          <p className="font-sans text-[13px] text-[var(--text-secondary)] mt-1">
            Core programming languages, backend runtimes, frontend libraries, and Agentic AI tools.
          </p>
        </div>

        <TechStackSection />
        <HighlightsSection />
      </main>
      <StatusBar />
    </div>
  );
}
