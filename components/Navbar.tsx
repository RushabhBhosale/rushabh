"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();

  const navItem = (name: string, href: string) => (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`px-4 py-2 text-sm rounded-xl transition-all duration-200
        ${
          pathname === href
            ? "bg-accent text-accent-foreground shadow-md"
            : "hover:bg-muted"
        }`}
      >
        {name}
      </Button>
    </Link>
  );

  return (
    <nav className="backdrop-blur-md bg-black/10 dark:bg-accent/30 dark:text-white rounded-full px-9 py-3 mt-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg tracking-wide">Rushabh</div>
        <div className="flex gap-2 sm:gap-4">
          {navItem("Home", "/home")}
          {navItem("About", "/about")}
          {navItem("Portfolio", "/portfolio")}
          {navItem("Career", "/career")}
          {navItem("Contact", "/contact")}
        </div>
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Navbar;
