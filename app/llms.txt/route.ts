import { EMAIL, PHONE } from "@/lib/site";
import { PROFILES, SITE_URL } from "@/lib/seo";
import { hirePages } from "@/utils/hire";
import { work } from "@/utils/work";
import { blogPosts } from "../(main)/blogs/index";

export const dynamic = "force-static";

export function GET() {
  const body = `# Rushabh Bhosale — Freelance Software Developer, Navi Mumbai, India

> Rushabh Bhosale is an independent full stack software developer based in Navi Mumbai, Maharashtra, India. He builds web applications, mobile apps and automations with React, Next.js, TypeScript, Node.js, MongoDB and React Native, for clients in Navi Mumbai, Mumbai, Thane and across India. He is a software developer at Peracto Infotech and takes freelance projects.

## Hire
${hirePages.map((p) => `- [${p.title}](${SITE_URL}/hire/${p.slug}): ${p.description}`).join("\n")}

## Contact
- Email: ${EMAIL}
- Phone / WhatsApp: ${PHONE}
- Contact page: ${SITE_URL}/contact

## Projects
${work.map((w) => `- [${w.title}](${SITE_URL}/work/${w.slug}): ${w.summary}`).join("\n")}

## Writing
${blogPosts.map((b) => `- [${b.title}](${SITE_URL}/blogs/${b.slug}): ${b.description}`).join("\n")}

## About
- [About Rushabh Bhosale](${SITE_URL}/about): background, experience and skills
- Profiles: ${PROFILES.join(", ")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
