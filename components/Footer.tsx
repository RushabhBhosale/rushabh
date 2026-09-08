import Link from "next/link";
import Convergence from "./switchyard/Convergence";
import { contactLinks } from "@/utils/switchyard";

export default function Footer() {
  return (
    <footer id="contact" className="sy-footer">
      <div className="section-line mono">
        <span>06 / ALL ROUTES LEAD SOMEWHERE</span>
        <span>
          <i className="signal" /> LET’S MAKE A CONNECTION
        </span>
      </div>
      <Convergence />
      <a href="mailto:bhosalerushabh0@gmail.com" className="contact-invitation">
        <h2>
          BRING ME THE
          <br />
          NEXT <em>HARD THING.</em>
          <span>↗</span>
        </h2>
      </a>
      <div className="contact-row">
        <p>
          A product, a problem, an idea that won’t leave you alone.
          <br />
          Let’s find out where it goes.
        </p>
        <a
          className="text-link email-link"
          href="mailto:bhosalerushabh0@gmail.com"
        >
          bhosalerushabh0@gmail.com ↗
        </a>
      </div>
      <nav className="contact-links" aria-label="Contact channels">
        {contactLinks.map((l, i) => (
          <a key={l.label} href={l.href}>
            <span className="mono">0{i + 1}</span>
            {l.label}
            <span>↗</span>
          </a>
        ))}
      </nav>
      <div className="footer-end mono">
        <span>© {new Date().getFullYear()} RUSHABH BHOSALE</span>
        <span className="next-station">
          <i /> NEXT / UNASSIGNED
        </span>
        <Link href="/home#main-content">BACK TO THE START ↑</Link>
      </div>
    </footer>
  );
}
