"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border mt-20 py-10 px-6 text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Rushabh. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/blogs" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <Link
            href="/projects"
            className="hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <a
            href="https://github.com/RushabhBhosale"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
