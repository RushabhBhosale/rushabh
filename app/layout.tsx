import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeScript } from "@/components/ThemeScript";
import { RightClickMenu } from "@/components/RightClickMenu";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rushabh Bhosale",
  description: "Your friendly neighborhood developer",
  openGraph: {
    title: "Rushabh Bhosale",
    description: "Your friendly neighborhood developer",
    url: "https://rushabh.in",
    siteName: "Rushabh Bhosale",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Rushabh Bhosale Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Rushabh Bhosale",
    description: "Your friendly neighborhood developer",
    images: ["/me.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="ld-person-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://rushabh.in/",
                  name: "Rushabh Bhosale",
                  url: "https://rushabh.in",
                  image: "https://rushabh.in/me.png",
                  jobTitle: "Software Developer",
                  knowsAbout: [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "SEO",
                  ],
                  sameAs: [
                    "https://github.com/RushabhBhosale",
                    "https://x.com/yourhandle",
                    "https://www.linkedin.com/in/rushabh-bhosale-software-developer/",
                  ],
                  owns: {
                    "@type": "WebSite",
                    "@id": "https://www.animesparks.blog",
                    name: "AnimeSparks",
                    url: "https://www.animesparks.blog",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://rushabh.in",
                  url: "https://rushabh.in",
                  name: "Rushabh Bhosale",
                  publisher: { "@id": "https://rushabh.in" },
                },
              ],
            }),
          }}
        />
        <ThemeScript />
      </head>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1425611919231559"
        crossOrigin="anonymous"
      ></script>
      <body
        suppressHydrationWarning
        suppressContentEditableWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <RightClickMenu>{children}</RightClickMenu>
        </ThemeProvider>
      </body>
    </html>
  );
}
