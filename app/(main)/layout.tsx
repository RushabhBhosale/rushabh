import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rushabh Bhosale | Software Developer Portfolio",
  description:
    "Rushabh Bhosale is a software developer specializing in React, Next.js, TypeScript, and full stack web applications. Explore projects, experience, and contact details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className="pt-24 min-h-[76vh]">{children}</div>
      <Footer />
    </main>
  );
}
