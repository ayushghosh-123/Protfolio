import SectionHeader from "./section-header";

const CERTIFICATIONS = [
  "Cybersecurity: API Testing Certification — Employability.life & Federation University Australia (XPro Program).",
  "Agentic AI & LLM Workflow Architecture — LangChain & LangGraph Engineering.",
  "Full-Stack Web Development & Modern MERN Stack Certification.",
  "API Testing & Automated Security Incident Simulation — Postman & Splunk.",
];

export default function CertificationsSection() {
  return (
    <section className="mb-14">
      <SectionHeader number="07" label="CERTIFICATIONS" />

      <ul className="space-y-3 font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[var(--text-secondary)]">
        {CERTIFICATIONS.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 group">
            <span
              className="text-[#4BC16B] font-mono text-[12px] select-none shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ✦
            </span>
            <span className="group-hover:text-[var(--text-primary)] transition-colors duration-150">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
