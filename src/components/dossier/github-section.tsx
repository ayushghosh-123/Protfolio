import SectionHeader from "./section-header";

export default function GithubSection() {
  return (
    <section className="mb-14">
      <SectionHeader number="02" label="GITHUB CONTRIBUTIONS" />

      <div className="space-y-4">
        {/* Heatmap Container */}
        <a
          href="https://github.com/ayushghosh-123"
          target="_blank"
          rel="noreferrer"
          className="group block p-3.5 sm:p-4 rounded border border-[var(--hairline)] hover:border-[var(--hairline-bright)] bg-[var(--surface)] transition-colors duration-150 overflow-hidden"
          aria-label="View Ayush Ghosh's GitHub profile and activity"
        >
          <div className="w-full overflow-x-auto pb-1 scrollbar-thin">
            {/* Direct terminal-green SVG heatmap from ghchart */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ghchart.rshah.org/4BC16B/ayushghosh-123"
              alt="GitHub contributions chart for ayushghosh-123"
              className="w-full min-w-[580px] h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-200 select-none filter contrast-125"
              loading="lazy"
            />
          </div>

          {/* Activity Metadata Row */}
          <div className="mt-3 pt-3 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono text-[var(--text-tertiary)] tabular-nums">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4BC16B]" aria-hidden="true" />
              <span className="text-[var(--text-secondary)]">ACTIVE OPEN-SOURCE BUILDER</span>
              <span>/ 2024–2026</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[var(--text-secondary)] group-hover:text-[#4BC16B] transition-colors duration-150">
                github.com/ayushghosh-123 ↗
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
