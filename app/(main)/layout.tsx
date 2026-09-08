import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rushabh Bhosale — The Switchyard",
  description:
    "Software developer building web, mobile, and desktop products. Explore independent projects, technical writing, and the routes between ideas and useful software.",
};
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="site-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
