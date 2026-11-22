"use client";

import Link from "next/link";
import { useState } from "react";
import { EXTRA_PAGE, inr, products } from "@/utils/pricing";

const types = products.filter((p) => !p.perMonth);
const addons = [
  { id: "payments", label: "Online payments (Razorpay)", price: 2999, only: ["business-website", "landing-page", "web-app", "mobile-app"] },
  { id: "admin", label: "Admin panel to manage content or records", price: 7999, only: ["business-website", "landing-page"] },
  { id: "blog", label: "Blog or CMS you can edit yourself", price: 1999, only: ["business-website", "landing-page"] },
  { id: "ai", label: "AI feature (chatbot, summaries, generation)", price: 4999, only: ["business-website", "web-app", "mobile-app"] },
];

/* A rough estimate only; the written quote is what counts. Numbers come from utils/pricing.ts. */
export default function CostCalculator() {
  const [type, setType] = useState("business-website");
  const [extraPages, setExtraPages] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const base = types.find((t) => t.id === type)!;
  const available = addons.filter((a) => a.only.includes(type));
  const chosen = available.filter((a) => picked.includes(a.id));
  const total =
    base.from +
    chosen.reduce((n, a) => n + a.price, 0) +
    (type === "business-website" ? Math.max(0, extraPages) * EXTRA_PAGE : 0);

  return (
    <div className="calc" aria-live="polite">
      <fieldset>
        <legend>What do you want built?</legend>
        {types.map((t) => (
          <label key={t.id}>
            <input type="radio" name="type" checked={type === t.id} onChange={() => setType(t.id)} />
            {t.name} <span className="dim">(from {inr(t.from)})</span>
          </label>
        ))}
      </fieldset>
      {type === "business-website" && (
        <label>
          Extra pages beyond 5 ({inr(EXTRA_PAGE)} each)
          <input
            type="number"
            min={0}
            max={50}
            value={extraPages}
            onChange={(e) => setExtraPages(Number(e.target.value) || 0)}
          />
        </label>
      )}
      {available.length > 0 && (
        <fieldset>
          <legend>Add-ons</legend>
          {available.map((a) => (
            <label key={a.id}>
              <input
                type="checkbox"
                checked={picked.includes(a.id)}
                onChange={(e) => setPicked((p) => (e.target.checked ? [...p, a.id] : p.filter((x) => x !== a.id)))}
              />
              {a.label} <span className="dim">(+{inr(a.price)})</span>
            </label>
          ))}
        </fieldset>
      )}
      <div>
        <div className="dim">Estimated starting price</div>
        <div className="calc__total">{inr(total)}</div>
        <p className="dim" style={{ marginTop: 8 }}>
          A rough guide, not a quote. Domain and third-party fees are extra. <Link href="/contact" className="u-link">Get a written quote</Link>.
        </p>
      </div>
    </div>
  );
}
