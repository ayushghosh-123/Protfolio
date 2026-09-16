import HeroSection from "@/components/dossier/hero-section";
import ExperienceSection from "@/components/dossier/experience-section";
import EducationSection from "@/components/dossier/education-section";
import StatusBar from "@/components/dossier/status-bar";

export const metadata = {
  title: "About | Ayush Ghosh",
  description: "Background, industry experience, and education of Ayush Ghosh.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <main className="max-w-[700px] mx-auto px-5 sm:px-6 pt-8 pb-24 selection:bg-[#4BC16B]/25 selection:text-[#4BC16B]">
        <HeroSection />
        <ExperienceSection />
        <EducationSection />
      </main>
      <StatusBar />
    </div>
  );
}
