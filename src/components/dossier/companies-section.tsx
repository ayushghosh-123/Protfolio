import SectionHeader from "./section-header";
import Image from "next/image";

interface Company {
  name: string;
  role: string;
  href?: string;
  image: string;
  location: string;
}

const COMPANIES: Company[] = [
  {
    name: "Employability.life",
    role: "Testing Trainee (Cybersecurity: API Testing)",
    image: "/ExperienceImage/EmpLife_Fed_Logo.png",
    location: "Australia / Remote",
  },
  {
    name: "Freelancer (Fiverr)",
    role: "Freelance Software Developer",
    href: "https://www.fiverr.com",
    image: "/ExperienceImage/fiver.png",
    location: "Global / Remote",
  },
];

export default function CompaniesSection() {
  return (
    <section className="mb-14">
      <SectionHeader number="02" label="WORKPLACES & AFFILIATIONS" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMPANIES.map((company) => {
          const content = (
            <div className="flex items-center gap-3 p-3 rounded border border-[var(--hairline)] hover:border-[var(--hairline-bright)] bg-[var(--surface)] transition-colors duration-150 group">
              {/* 26px rounded square full-color logo */}
              <div className="relative w-[26px] h-[26px] rounded-[5px] overflow-hidden bg-white shrink-0 p-0.5 border border-[var(--hairline)]">
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-contain"
                  sizes="26px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-mono text-[13px] text-[var(--text-primary)] group-hover:text-[#4BC16B] truncate transition-colors duration-150 font-medium">
                    {company.name}
                  </span>
                  {company.href && (
                    <span
                      className="font-mono text-[10px] text-[var(--text-tertiary)] group-hover:text-[#4BC16B] transition-colors duration-150 shrink-0"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  )}
                </div>
                <p className="font-mono text-[11px] text-[var(--text-tertiary)] truncate">
                  {company.role}
                </p>
              </div>
            </div>
          );

          return company.href ? (
            <a
              key={company.name}
              href={company.href}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              {content}
            </a>
          ) : (
            <div key={company.name}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}
