import HeroSection from "@/components/dossier/hero-section";
import SectionWrapper from "@/components/dossier/section-wrapper";
import TechStackSection from "@/components/dossier/tech-stack-section";
import CompaniesSection from "@/components/dossier/companies-section";
import GithubSection from "@/components/dossier/github-section";
import HighlightsSection from "@/components/dossier/highlights-section";
import ExperienceSection from "@/components/dossier/experience-section";
import ProjectsSection from "@/components/dossier/projects-section";
import AchievementsSection from "@/components/dossier/achievements-section";
import EducationSection from "@/components/dossier/education-section";
import StatusBar from "@/components/dossier/status-bar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Central Narrow Dossier Column (max-w ~680-720px) */}
      <main className="max-w-[700px] mx-auto px-5 sm:px-6 pt-6 pb-24 selection:bg-[#4BC16B]/25 selection:text-[#4BC16B]">
        {/* Hero Section */}
        <HeroSection />

        {/* [ 01 ] Tech Stack */}
        <SectionWrapper delay={0.05}>
          <TechStackSection />
        </SectionWrapper>

        {/* [ 02 ] GitHub Heatmap */}
        <SectionWrapper delay={0.05}>
          <GithubSection />
        </SectionWrapper>

        {/* [ 03 ] Highlights */}
        <SectionWrapper delay={0.05}>
          <HighlightsSection />
        </SectionWrapper>

        {/* [ 04 ] Industry Experience */}
        <SectionWrapper delay={0.05}>
          <ExperienceSection />
        </SectionWrapper>

        {/* [ 05 ] Projects */}
        <SectionWrapper delay={0.05}>
          <ProjectsSection />
        </SectionWrapper>

        {/* [ 06 ] Achievements */}
        <SectionWrapper delay={0.05}>
          <AchievementsSection />
        </SectionWrapper>

        {/* [ 07 ] Education */}
        <SectionWrapper delay={0.05}>
          <EducationSection />
        </SectionWrapper>
      </main>

      {/* Fixed bottom status bar spanning the viewport */}
      <StatusBar />
    </div>
  );
}
