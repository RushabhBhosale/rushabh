"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" prefetch>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" prefetch>
            About
          </Link>
        </li>
        <li>
          <Link href="/services" prefetch>
            Services
          </Link>
        </li>
        <li>
          <Link href="/contact" prefetch>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
