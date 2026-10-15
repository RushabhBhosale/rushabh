export const EMAIL = "bhosalerushabh0@gmail.com";
export const PHONE = "+91 91379 96317";
export const PHONE_HREF = "tel:+919137996317";
export const RESUME = "/Rushabh%20Resume.pdf";

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/RushabhBhosale" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rushabh-bhosale-software-developer/",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919137996317?text=Hey%20Rushabh%2C%20I%20just%20checked%20out%20your%20portfolio.%20I%27d%20love%20to%20connect.",
  },
  { label: "Résumé", href: RESUME },
];

const routes: Record<string, [string, string]> = {
  "": ["Index", "01"],
  home: ["Index", "01"],
  work: ["Work", "02"],
  about: ["About", "03"],
  blogs: ["Writing", "04"],
  contact: ["Contact", "05"],
  tools: ["Tools", "06"],
};

/* Name and index shown on the transition curtain while moving between pages. */
export function routeLabel(pathname: string): { name: string; index: string } {
  const [name, index] = routes[pathname.split("/")[1] ?? ""] ?? ["Rushabh", "00"];
  return { name, index };
}
