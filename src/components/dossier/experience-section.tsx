import SectionHeader from "./section-header";

interface ExperienceItem {
  company: string;
  dateRange: string;
  location: string;
  role: string;
  summary: string;
  bullets: string[];
  techChips: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Freelancer (Fiverr)",
    dateRange: "Jan 2026 — Present",
    location: "Global / Remote",
    role: "Freelance Software Developer",
    summary:
      "Building AI-based automation solutions that help clients grow their businesses using a modern, AI-integrated tech stack.",
    bullets: [
      "Delivered custom agentic AI pipelines, LLM workflows, and modern web applications for international clients with high customer ratings.",
      "Architected full-stack web solutions from concept to cloud deployment on Vercel and AWS.",
      "Collaborated transparently with clients to translate business problems into scalable, reliable digital systems.",
    ],
    techChips: [
      "Next.js",
      "React",
      "TypeScript",
      "LangChain",
      "LangGraph",
      "Node.js",
      "MongoDB",
    ],
  },
  {
    company: "Employability.life",
    dateRange: "Sep 2024 — Nov 2024",
    location: "Australia & Remote",
    role: "Testing Trainee (Cybersecurity: API Testing)",
    summary:
      "Completed a 6-week XPro Program on Cybersecurity: API Testing in collaboration with Employability.life and Federation University Australia.",
    bullets: [
      "Completed deliverables including API testing, documentation, incident response simulations, and final presentations.",
      "Proficient with Postman, cURL, and Splunk for API development, regression testing, and automated vulnerability scanning.",
      "Evaluated endpoint security, token validation, rate-limiting, and error handling mechanisms across distributed services.",
    ],
    techChips: [
      "API Testing",
      "Postman",
      "cURL",
      "Splunk",
      "Cybersecurity",
      "REST APIs",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="mb-14">
      <SectionHeader number="05" label="INDUSTRY EXPERIENCE" />

      <div className="space-y-12">
        {EXPERIENCES.map((exp) => (
          <article
            key={exp.company}
            className="pb-8 border-b border-[var(--hairline)] last:border-b-0 last:pb-0"
          >
            {/* Header: Company Name on left, Date & Location on right (wraps on mobile) */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="font-mono text-[16px] sm:text-[17px] font-semibold text-[var(--text-primary)] tracking-tight">
                {exp.company}
              </h3>

              <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-tertiary)] tabular-nums">
                <span>{exp.dateRange}</span>
                <span className="opacity-40" aria-hidden="true">
                  /
                </span>
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Role Title */}
            <p className="font-mono text-[13px] font-medium text-[#4BC16B] mb-2">
              {exp.role}
            </p>

            {/* One-line summary */}
            <p className="font-sans text-[14px] leading-[1.65] text-[var(--text-secondary)] mb-3">
              {exp.summary}
            </p>

            {/* Em-dash bullets in Inter */}
            <ul className="space-y-2 mb-4 font-sans text-[14px] leading-[1.65] text-[var(--text-secondary)]">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    className="font-mono text-[var(--text-tertiary)] opacity-60 select-none shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    —
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech chips: 11-12px, brighten border on hover */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {exp.techChips.map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--hairline)] hover:border-[var(--hairline-bright)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 select-none bg-[var(--surface)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
