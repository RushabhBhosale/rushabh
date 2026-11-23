import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "../styles/base.css";
import "../styles/shell.css";
import "../styles/chrome.css";
import "../styles/home.css";
import "../styles/work.css";
import "../styles/pages.css";
import { RightClickMenu } from "@/components/RightClickMenu";
import { jsonLd, personNode, serviceNode, SITE_URL, websiteNode } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rushabh Bhosale | Freelance Software Developer in Navi Mumbai",
    template: "%s",
  },
  description:
    "Rushabh Bhosale is a freelance full stack software developer in Navi Mumbai, India. Web apps, mobile apps and automations with React, Next.js, React Native and Node.js for clients across Mumbai and India.",
  applicationName: "Rushabh Bhosale",
  authors: [{ name: "Rushabh Bhosale", url: SITE_URL }],
  creator: "Rushabh Bhosale",
  category: "technology",
  keywords: [
    "Rushabh Bhosale",
    "freelance software developer Navi Mumbai",
    "software developer Navi Mumbai",
    "hire developer Mumbai",
    "React developer Mumbai",
    "Next.js developer Mumbai",
    "React Native developer Mumbai",
    "full stack developer India",
    "MERN stack developer India",
    "freelance developer India",
    "TypeScript",
    "Node.js",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Rushabh Bhosale | Freelance Software Developer in Navi Mumbai",
    description:
      "Freelance full stack developer in Navi Mumbai building web apps, mobile apps and automations with React, Next.js, React Native and Node.js.",
    url: SITE_URL,
    siteName: "Rushabh Bhosale",
    locale: "en_IN",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Rushabh Bhosale, freelance software developer in Navi Mumbai",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushabh Bhosale | Freelance Software Developer in Navi Mumbai",
    description:
      "Freelance full stack developer in Navi Mumbai building web apps, mobile apps and automations with React, Next.js, React Native and Node.js.",
    images: ["/me.png"],
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Navi Mumbai",
    "geo.position": "19.0330;73.0297",
    ICBM: "19.0330, 73.0297",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      className={`${display.variable} ${geistSans.variable} ${geistMono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="92-gzlVmk3f427ii9zdCK6iixsRVgTSJcE1Udv0K25o" />
        <script id="rb-boot" dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          id="ld-person-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd([personNode, serviceNode, websiteNode]) }}
        />
      </head>
      <body suppressHydrationWarning suppressContentEditableWarning>
        <RightClickMenu>{children}</RightClickMenu>
      </body>
    </html>
  );
}
