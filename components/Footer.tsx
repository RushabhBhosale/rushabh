"use client";

import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 w-full border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="text-base font-semibold text-foreground">
              Rushabh Bhosale
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Software Developer • India
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a
                href="mailto:bhosalerushabh0@gmail.com"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                bhosalerushabh0@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/rushabh-bhosale-software-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/RushabhBhosale"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <p className="text-sm font-medium text-foreground">
              Important Links
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link
                href="/home"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Rushabh Bhosale
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="md:col-span-3 md:text-right">
            <p className="text-sm font-medium text-foreground">Let’s work</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Open to full-time roles and freelance projects.
            </p>

            <div className="mt-4 flex gap-3 md:justify-end">
              <a
                href="mailto:bhosalerushabh0@gmail.com"
                className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/rushabh-bhosale-software-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:text-primary hover:border-primary/60 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Rushabh Bhosale. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/sitemap.xml"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
            <Link
              href="/robots.txt"
              className="hover:text-primary transition-colors"
            >
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
