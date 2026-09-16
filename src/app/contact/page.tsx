import StatusBar from "@/components/dossier/status-bar";
import SectionHeader from "@/components/dossier/section-header";

export const metadata = {
  title: "Contact | Ayush Ghosh",
  description: "Direct communication channels and social links for Ayush Ghosh.",
};

const CHANNELS = [
  {
    name: "Email",
    value: "ghoshayush910@gmail.com",
    href: "mailto:ghoshayush910@gmail.com",
    desc: "Primary channel for consulting, enterprise contracts, and project inquiries.",
  },
  {
    name: "GitHub",
    value: "github.com/ayushghosh-123",
    href: "https://github.com/ayushghosh-123",
    desc: "Source code repositories, pull requests, and open-source contributions.",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/ayush-ghosh-9659772b0",
    href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/",
    desc: "Professional career history and network recommendations.",
  },
  {
    name: "Twitter / X",
    value: "@AyushGhosh30804",
    href: "https://x.com/AyushGhosh30804",
    desc: "Thoughts on Agentic AI, system architectures, and rapid shipping.",
  },
  {
    name: "Spotify",
    value: "Ayush Ghosh on Spotify",
    href: "https://open.spotify.com/user/31j5r7lq7bo5nea62cvxvfx7udoa",
    desc: "Deep focus playlists and ambient electronic music.",
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <main className="max-w-[700px] mx-auto px-5 sm:px-6 pt-8 pb-24 selection:bg-[#4BC16B]/25 selection:text-[#4BC16B]">
        <div className="mb-8 pb-4 border-b border-[var(--hairline)]">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-tertiary)] mb-1">
            <span className="text-[#4BC16B]">●</span>
            <span>TRANSMISSION // DIRECT ROUTES</span>
          </div>
          <h1 className="font-mono text-[22px] sm:text-[26px] font-semibold tracking-tight text-[var(--text-primary)]">
            Contact &amp; Transmissions
          </h1>
          <p className="font-sans text-[13px] text-[var(--text-secondary)] mt-1">
            Have a project, contract, or architecture to discuss? Reach out through any channel below.
          </p>
        </div>

        <SectionHeader number="01" label="COMMUNICATION CHANNELS" />

        <div className="space-y-6 mb-12">
          {CHANNELS.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded border border-[var(--hairline)] bg-[var(--surface)] hover:border-[var(--hairline-bright)] transition-colors duration-150"
            >
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                  {item.name}
                </span>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="font-mono text-[12px] text-[#4BC16B] hover:underline inline-flex items-center gap-1"
                >
                  <span>{item.value}</span>
                  <span>↗</span>
                </a>
              </div>
              <p className="font-sans text-[13px] text-[var(--text-secondary)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
      <StatusBar />
    </div>
  );
}
