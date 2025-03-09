const config = {
  theme: {
    extend: {
      colors: {
        base: {
          100: "oklch(97.788% 0.004 56.375)",
          200: "oklch(93.982% 0.007 61.449)",
          300: "oklch(91.586% 0.006 53.44)",
          content: "oklch(23.574% 0.066 313.189)",
        },
        primary: {
          DEFAULT: "oklch(70% 0.191 22.216)",
          content: "oklch(39% 0.141 25.723)",
        },
        secondary: {
          DEFAULT: "oklch(89% 0.061 343.231)",
          content: "oklch(45% 0.187 3.815)",
        },
        accent: {
          DEFAULT: "oklch(90% 0.076 70.697)",
          content: "oklch(47% 0.157 37.304)",
        },
        neutral: {
          DEFAULT: "oklch(27% 0.006 286.033)",
          content: "oklch(92% 0.004 286.32)",
        },
        info: {
          DEFAULT: "oklch(68% 0.169 237.323)",
          content: "oklch(29% 0.066 243.157)",
        },
        success: {
          DEFAULT: "oklch(69% 0.17 162.48)",
          content: "oklch(26% 0.051 172.552)",
        },
        warning: {
          DEFAULT: "oklch(79% 0.184 86.047)",
          content: "oklch(28% 0.066 53.813)",
        },
        error: {
          DEFAULT: "oklch(64% 0.246 16.439)",
          content: "oklch(27% 0.105 12.094)",
        },
      },
      borderRadius: {
        selector: "1rem",
        field: "0.5rem",
        box: "1rem",
      },
      spacing: {
        selector: "0.21875rem",
        field: "0.25rem",
      },
      borderWidth: {
        DEFAULT: "1.5px",
      },
      boxShadow: {
        depth: "var(--depth)",
      },
      backdropBlur: {
        noise: "var(--noise)",
      },
    },
  },
  plugins: [],
};

export default config;
