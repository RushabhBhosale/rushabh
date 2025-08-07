"use client";

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            try {
              const theme = localStorage.getItem("theme");
              if (
                theme === "dark" ||
                (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ) {
                document.documentElement.classList.add("dark");
              }
            } catch (_) {}
          })();
        `,
      }}
    />
  );
}
