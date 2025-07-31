"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export function CodeBlock({
  children,
  language = "plaintext",
  filename,
  showLineNumbers = false,
}: {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const lines = children.split("\n");

  return (
    <div className="my-6 group rounded-lg overflow-hidden border border-neutral-800">
      <div className="bg-black px-4 py-3 flex items-center justify-between border-b border-neutral-800 relative">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        {filename && (
          <div className="absolute left-1/2 -translate-x-1/2 text-sm text-neutral-300 font-mono">
            {filename}
          </div>
        )}
        <button
          onClick={copyToClipboard}
          className="text-neutral-400 hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="text-sm text-white font-mono">
          {showLineNumbers ? (
            <div className="flex">
              <div className="text-neutral-600 pr-4 text-right select-none border-r border-neutral-700 mr-4">
                {lines.map((_, i) => (
                  <div key={i} className="leading-6">
                    {(i + 1).toString().padStart(2, " ")}
                  </div>
                ))}
              </div>
              <code className={`language-${language}`}>{children}</code>
            </div>
          ) : (
            <code className={`language-${language}`}>{children}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
