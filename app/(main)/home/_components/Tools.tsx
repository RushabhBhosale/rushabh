import Link from "next/link";
import { Wrench, ExternalLink } from "lucide-react";

const tools = [
  {
    slug: "/tools/site-inspector",
    name: "Site Inspector",
    icon: Wrench,
    description:
      "Headless page scan: frameworks, theme colors, fonts, assets, Google Fonts, SEO and network stats.",
    badge: "New",
  },
];

export default function ToolsSection() {
  return (
    <section className="w-full max-w-6xl px-6 py-16 mx-auto my-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={t.slug}
            className="group border border-border rounded-xl p-6 bg-muted dark:bg-muted/30 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <t.icon className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">{t.name}</h3>
              </div>
              {t.badge ? (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {t.badge}
                </span>
              ) : null}
            </div>
            <p className="text-sm mt-3 text-muted-foreground">{t.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-primary text-sm">
              Open <ExternalLink className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

