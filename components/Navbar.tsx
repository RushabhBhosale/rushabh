"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  const navItem = (name: string, href: string, index: number = 0) => (
    <Link href={href} key={href} onClick={() => setOpen(false)}>
      <Button
        variant="ghost"
        className={`w-full sm:w-auto text-sm px-4 py-2 rounded-xl transition-all duration-200 ${
          pathname === href
            ? "bg-accent dark:bg-white/10 text-accent-foreground shadow-md"
            : "hover:bg-muted dark:hover:bg-white/10"
        } ${open ? "animate-slideInUp" : ""}`}
        style={{
          animationDelay: open ? `${index * 50}ms` : "0ms",
        }}
      >
        {name}
      </Button>
    </Link>
  );

  return (
    <>
      <nav className="fixed left-1/2 -translate-x-1/2 md:top-4 z-50 backdrop-blur-2xl bg-black/40 dark:bg-accent/40 dark:text-white md:rounded-full px-6 py-3 lg:w-3xl md:w-2xl w-full mx-auto">
        <div className="flex items-center justify-between gap-4">
          <Link className="font-black" href="/">
            Rushabh
          </Link>

          <div className="hidden sm:flex gap-2">
            {navLinks.map((link) => navItem(link.name, link.href))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggler />
            <button
              onClick={() => setOpen(!open)}
              className="sm:hidden p-2 transition-transform duration-200 hover:scale-110"
            >
              <div
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`sm:hidden fixed left-1/2 -translate-x-1/2 top-[75px] z-40 w-[90%] transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div
          className={`bg-background/95 dark:bg-muted/95 backdrop-blur-md p-4 shadow-xl rounded-xl border border-border/50 ${
            open ? "animate-slideInDown" : ""
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) =>
              navItem(link.name, link.href, index)
            )}
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-30 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
    </>
  );
};

export default Navbar;
