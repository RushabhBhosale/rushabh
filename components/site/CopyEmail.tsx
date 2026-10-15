"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/lib/site";

export default function CopyEmail({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(EMAIL);
      setState("copied");
    } catch {
      setState("error");
    }
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  const text = state === "copied" ? "Copied ✓" : state === "error" ? "Use the link" : "Copy";
  return (
    <button type="button" className={`copy-btn mono ${className}`} onClick={copy} aria-label={`Copy ${EMAIL}`}>
      <span className="roll">
        <span data-text={text}>{text}</span>
      </span>
      <span className="sr-only" role="status">
        {state === "copied" ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
