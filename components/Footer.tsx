"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Send } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur-xl mt-24">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-12 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-6 xl:gap-8">
          {/* Brand Section */}
          <div className="xl:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Rushabh Bhosale
            </Link>
            <p className="mt-2 text-sm leading-6 text-muted-foreground max-w-xs">
              Crafting digital experiences with code and creativity. Specialized in building scalable, user-centric web applications.
            </p>
            <div className="mt-4 flex gap-4">
              <SocialLink href="https://github.com/RushabhBhosale" icon={<Github className="h-4 w-4" />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/rushabh-bhosale-software-developer/" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
              <SocialLink href="mailto:bhosalerushabh0@gmail.com" icon={<Mail className="h-4 w-4" />} label="Email" />
              <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} label="Twitter" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-4">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">Navigation</h3>
              <ul className="mt-4 space-y-2">
                <FooterLink href="/home">Home</FooterLink>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/projects">Projects</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
              </ul>
            </div>

            {/* Newsletter / CTA */}
            <div className="md:col-span-1">
              <h3 className="text-sm font-semibold leading-6 text-foreground">Stay Updated</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Subscribe to my newsletter for the latest updates.
              </p>
              <form className="mt-4 sm:flex sm:max-w-md" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 sm:mt-12 lg:mt-16">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {year} Rushabh Bhosale. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-muted p-2 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label={label}
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">
      {children}
    </Link>
  </li>
);

export default Footer;
