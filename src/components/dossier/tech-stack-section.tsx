import SectionHeader from "./section-header";

interface TechRow {
  category: string;
  items: string;
}

const TECH_DATA: TechRow[] = [
  {
    category: "Languages",
    items: "TypeScript, JavaScript, Python, HTML5, CSS3, SQL, Bash",
  },
  {
    category: "Frontend & UI",
    items: "Next.js, React.js, Tailwind CSS, Framer Motion, GSAP, shadcn/ui",
  },
  {
    category: "Backend & APIs",
    items: "Node.js, Express.js, Socket.io, RESTful APIs, WebSockets",
  },
  {
    category: "AI & LLMs",
    items: "LangChain, LangGraph, OpenAI, Ollama, RAG Systems, Hugging Face",
  },
  {
    category: "Databases & DevOps",
    items: "MongoDB, PostgreSQL, Firebase, Docker, AWS, Vercel, GitHub Actions",
  },
];

export default function TechStackSection() {
  return (
    <section className="mb-14">
      <SectionHeader number="01" label="TECH STACK" />

      <div className="space-y-3 font-mono text-[13px] sm:text-[14px]">
        {TECH_DATA.map((row) => (
          <div
            key={row.category}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0 leading-relaxed"
          >
            <span className="font-semibold text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[var(--text-tertiary)] sm:w-48 shrink-0">
              {row.category}
            </span>
            <span className="hidden sm:inline-block mx-2 text-[var(--text-tertiary)] opacity-60">
              —
            </span>
            <span className="text-[var(--text-secondary)]">
              {row.items}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
