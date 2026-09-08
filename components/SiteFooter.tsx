"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteFooter({ children }: { children: ReactNode }) {
  return usePathname() === "/home" ? null : children;
}
