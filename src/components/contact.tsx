"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import FadeUp from "@/components/fade-up";

// Email obfuscation — reversed + split so scrapers can't trivially harvest it.
// Decoded at runtime only when the user clicks.
const EMAIL_PARTS = ["moc.liamg", "@", "019hsuyahsohg"].reverse().join("");

function openEmail() {
  // Decode: join reversed parts → ghoshayush910@gmail.com
  window.location.href = `mailto:${EMAIL_PARTS}`;
}

export default function Contact() {
  const socialLinks = [
    {
      name: "Email",
      icon: <Mail size={20} />,
      href: null,
      onClick: openEmail,
      label: "ghoshayush910 [at] gmail.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      href: "https://github.com/ayushghosh-123",
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={20} />,
      href: "https://x.com/AyushGhosh30804",
    },
  ];

  return (
    <section id="contact" className="py-16 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Center Content Area */}
        <FadeUp className="flex flex-col items-center text-center max-w-xl mx-auto mb-16">
          <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">// contact</p>

          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight leading-tight mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-base text-[var(--muted)] leading-[1.6] mb-8">
            Have a suggestion, idea, or project in mind? I&apos;d love to hear from you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-2.5 text-sm font-semibold hover:bg-[var(--foreground)] hover:text-[var(--card)] hover:border-[var(--foreground)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              Work with me
            </a>
            <a
              href="https://drive.google.com/file/d/1H3wOjfFWLRCoVCw9RskE3c2228J_F5YX/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-2.5 text-sm hover:bg-[var(--card)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              Download Resume
            </a>
          </div>
        </FadeUp>

        {/* Social Links List */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto border-b border-[var(--border)]"
        >
          {socialLinks.map((social, i) => {
            const isEmail = !social.href;
            const commonClass =
              "flex items-center justify-between py-5 px-4 border-t border-[var(--border)] hover:bg-[var(--card)]/50 hover:px-6 transition-all duration-200 group cursor-pointer";

            const inner = (
              <>
                <div className="flex items-center gap-4 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                  <span className="text-lg shrink-0">{social.icon}</span>
                  <span className="text-base font-semibold">{social.name}</span>
                  {isEmail && (
                    <span className="hidden sm:inline text-xs text-[var(--muted)] font-normal">
                      {social.label}
                    </span>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--foreground)] group-hover:translate-x-1 transition-all duration-200" />
              </>
            );

            return isEmail ? (
              <button
                key={i}
                onClick={openEmail}
                className={`w-full text-left ${commonClass}`}
                aria-label="Send email"
              >
                {inner}
              </button>
            ) : (
              <a
                key={i}
                href={social.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={commonClass}
              >
                {inner}
              </a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
