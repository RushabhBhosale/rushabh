import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rushabh Bhosale",
  description: "Your friendly neighborhood developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <Navbar />
      <div className="pt-24">{children}</div>
      <Footer />
    </main>
  );
}
