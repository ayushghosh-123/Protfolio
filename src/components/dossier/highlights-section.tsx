import SectionHeader from "./section-header";

const HIGHLIGHTS = [
  "Engineered autonomous AI agent workflows using LangGraph and LangChain for real-time task execution.",
  "Shipped production-grade full-stack web applications with Next.js 16 (App Router), React 19, and Tailwind CSS.",
  "Designed and scaled event-driven architectures, WebSocket endpoints, and REST APIs with sub-50ms latency.",
  "Built intelligent Retrieval-Augmented Generation (RAG) pipelines integrating vector databases and LLMs.",
  "Completed intensive Cybersecurity & API Testing program in collaboration with Federation University Australia.",
  "Optimized database query performance and caching strategies across MongoDB and PostgreSQL.",
];

export default function HighlightsSection() {
  return (
    <section className="mb-14">
      <SectionHeader number="04" label="HIGHLIGHTS" />

      <ul className="space-y-3 font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[var(--text-secondary)]">
        {HIGHLIGHTS.map((item, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <span
              className="text-[#4BC16B] font-mono text-[13px] font-bold select-none shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ↗
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
