"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur-xl mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section - Takes up more space */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Rushabh Bhosale
              </h2>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-md">
              Crafting digital experiences with code and creativity. Specialized
              in building scalable, user-centric web applications.
            </p>

            {/* Social Links */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                Connect
              </h3>
              <div className="flex gap-3">
                <SocialLink
                  href="https://github.com/RushabhBhosale"
                  icon={<Github className="h-4 w-4" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/rushabh-bhosale-software-developer/"
                  icon={<Linkedin className="h-4 w-4" />}
                  label="LinkedIn"
                />
                <SocialLink
                  href="mailto:bhosalerushabh0@gmail.com"
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:col-span-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/home">Home</FooterLink>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/projects">Projects</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {year} Rushabh Bhosale. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with <span className="text-primary">Next.js</span> &{" "}
              <span className="text-primary">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg bg-muted p-2.5 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label={label}
  >
    {icon}
  </a>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
