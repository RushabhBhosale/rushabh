import Link from "next/link";

type CtaProps = {
  page?: boolean;
};

const Cta = ({ page }: CtaProps) => {
  return (
    <aside className="article-cta">
      {!page && <p className="mono dim">Enjoyed this post?</p>}
      <p className="article-cta__text">
        Got a project or an idea you’d like help with? <span className="serif">I’m available for freelance work.</span>
      </p>
      <Link href="/contact" className="mono u-link">
        Let’s work together <span className="arrow">↗</span>
      </Link>
    </aside>
  );
};

export default Cta;
