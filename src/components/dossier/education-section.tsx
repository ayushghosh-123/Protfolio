import SectionHeader from "./section-header";

export default function EducationSection() {
  return (
    <section className="mb-20">
      <SectionHeader number="08" label="EDUCATION" />

      <div className="space-y-1">
        <p className="font-mono text-[15px] font-semibold text-[var(--text-primary)]">
          Sister Nivedita University
        </p>
        <p className="font-sans text-[14px] text-[var(--text-secondary)]">
          BCA (Bachelor of Computer Applications) Student
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] tabular-nums pt-0.5">
          2023 — 2027
        </p>
      </div>
    </section>
  );
}
