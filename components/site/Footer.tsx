import Link from "next/link";
import BackTop from "./BackTop";
import CopyEmail from "./CopyEmail";
import FooterMarquee from "./FooterMarquee";
import LocalTime from "./LocalTime";
import { EMAIL, nav, socials } from "@/lib/site";

const whatsapp = socials.find((s) => s.label === "WhatsApp")!.href;

/* On desktop the footer sits underneath the page and is uncovered as the content
   scrolls away (see .footer-reveal). On small screens it is a normal block. */
export default function Footer() {
  return (
    <div className="footer-reveal">
      <div className="footer-reveal__track">
        <footer className="footer" id="contact">
          <div className="footer__top mono">
            <span>(Next step)</span>
            <span className="dim footer__ask">Have a project, a role or an idea?</span>
            <span>©{new Date().getFullYear()}</span>
          </div>

          <FooterMarquee />

          {/* Phones: the marquee isn't an obvious button, so give clear actions. */}
          <div className="footer__actions">
            <a href={`mailto:${EMAIL}`} className="footer__btn footer__btn--primary">
              Email me <span className="arrow">↗</span>
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="footer__btn">
              WhatsApp <span className="arrow">↗</span>
            </a>
          </div>

          <div className="footer__grid">
            <div className="footer__col footer__col--mail">
              <span className="mono dim">Write to me</span>
              <a href={`mailto:${EMAIL}`} className="footer__email">
                {EMAIL}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <CopyEmail />
            </div>
            <div className="footer__col">
              <span className="mono dim">Elsewhere</span>
              <ul>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <span className="roll">
                        <span data-text={s.label}>{s.label}</span>
                      </span>
                      <span className="arrow dim">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <span className="mono dim">Pages</span>
              <ul>
                {[{ label: "Index", href: "/home" }, ...nav].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>
                      <span className="roll">
                        <span data-text={n.label}>{n.label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <span className="mono dim">Local time</span>
              <span className="footer__time">
                <LocalTime seconds /> <span className="mono dim">IST</span>
              </span>
              <span className="footer__status mono">
                <span className="signal-dot" /> Open to new projects
              </span>
            </div>
          </div>

          <div className="footer__bottom mono">
            <span>Rushabh Bhosale — Software developer</span>
            <span className="dim">Designed &amp; built in Mumbai</span>
            <BackTop />
          </div>
        </footer>
      </div>
    </div>
  );
}
