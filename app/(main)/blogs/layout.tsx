import { ThemeProvider } from "@/components/ThemeProvider";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="max-w-3xl mx-auto px-6 md:px-4 py-18 md:py-12">
        {children}
      </main>
    </ThemeProvider>
  );
}
