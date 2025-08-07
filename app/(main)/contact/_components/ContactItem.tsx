import Link from "next/link";

export function ContactItem({
  icon,
  label,
  value,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}) {
  const content = link ? (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-base text-card-foreground hover:text-primary break-words select-all"
    >
      {value}
    </Link>
  ) : (
    <p className="text-base text-card-foreground break-words select-all">
      {value}
    </p>
  );

  return (
    <div className="flex sm:flex-row flex-col sm:items-center gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {content}
      </div>
    </div>
  );
}
