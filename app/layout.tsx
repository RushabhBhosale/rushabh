import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../styles/base.css";
import "../styles/shell.css";
import "../styles/chrome.css";
import "../styles/home.css";
import "../styles/work.css";
import "../styles/pages.css";
import { RightClickMenu } from "@/components/RightClickMenu";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

/* Runs before paint: applies the saved theme, enables entrance states only when
   JS + motion are available, and shows the preloader once per session. Falls back to plain content if the app
   never boots. */
const bootScript = `(function(){try{var d=document.documentElement;var t='dark';try{t=localStorage.getItem('rb-theme')==='light'?'light':'dark'}catch(e){}d.dataset.theme=t;d.classList.toggle('dark',t==='dark');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-anim');var seen=false;try{seen=!!sessionStorage.getItem('rb-loaded')}catch(e){}if(!seen)d.setAttribute('data-loader','on');setTimeout(function(){if(!window.__rbBooted){d.classList.remove('js-anim');d.removeAttribute('data-loader')}},6000)}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://rushabh.in"),
  title: "Rushabh Bhosale | Software Developer Portfolio",
  description:
    "Rushabh Bhosale builds web, mobile, and desktop products. Explore independent projects, technical writing, and professional experience.",
  keywords: [
    "Rushabh Bhosale",
    "Rushabh portfolio",
    "Rushabh Bhosale developer",
    "software developer",
    "React developer",
    "Next.js developer",
    "full stack developer",
    "TypeScript",
    "Node.js",
  ],
  openGraph: {
    title: "Rushabh Bhosale | Software Developer",
    description:
      "Portfolio of Rushabh Bhosale featuring projects, experience, and writing on modern web development.",
    url: "https://rushabh.in",
    siteName: "Rushabh Bhosale",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Rushabh Bhosale portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Rushabh Bhosale | Software Developer Portfolio",
    description:
      "Rushabh Bhosale builds web, mobile, and desktop products. Explore independent projects, technical writing, and professional experience.",
    images: ["/me.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${geistSans.variable} ${geistMono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script id="rb-boot" dangerouslySetInnerHTML={{ __html: bootScript }} />
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
                    "MongoDB",
                    "Full Stack Development",
                    "SEO",
                    "Tailwind CSS",
                    "JavaScript",
                  ],
                  sameAs: [
                    "https://github.com/RushabhBhosale",
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
      </head>
      <body suppressHydrationWarning suppressContentEditableWarning>
        <RightClickMenu>{children}</RightClickMenu>
      </body>
    </html>
  );
}
