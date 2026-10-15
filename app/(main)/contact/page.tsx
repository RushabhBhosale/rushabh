import type { Metadata } from "next";
import CopyEmail from "@/components/site/CopyEmail";
import LocalTime from "@/components/site/LocalTime";
import { EMAIL, PHONE, PHONE_HREF, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Rushabh Bhosale",
  description: "Work opportunities, collaborations, and conversations about things worth building.",
};

export default function ContactPage() {
  const channels = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { label: "Phone", value: PHONE, href: PHONE_HREF },
    ...socials.map((s) => ({
      label: s.label,
      value: s.label === "Résumé" ? "Download PDF" : s.label === "WhatsApp" ? "Start a chat" : s.href.replace(/^https:\/\/(www\.)?/, ""),
      href: s.href,
    })),
  ];

  return (
    <div className="page contact">
      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(Contact)</span>
          <span className="dim">Mumbai — <LocalTime /> IST</span>
          <span>
            <span className="signal-dot" /> Open to new projects
          </span>
        </div>
        <h1 className="page-hero__title display contact__title" data-lines>
          Let’s talk
        </h1>
        <p className="page-hero__lede" data-reveal>
          Work, collaborations, or a conversation about <span className="serif">something worth building.</span> A
          product, a problem, an idea that won’t leave you alone — tell me about it.
        </p>
      </header>

      <section className="section">
        <div className="contact__email" data-reveal>
          <a href={`mailto:${EMAIL}`} className="contact__email-link" data-cursor="Write">
            {EMAIL}
          </a>
          <CopyEmail />
        </div>

        <ul className="channels">
          {channels.map((c, i) => (
            <li key={c.label} data-reveal>
              <a
                href={c.href}
                className="channel"
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="channel__label">{c.label}</span>
                <span className="channel__value mono">{c.value}</span>
                <span className="channel__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
