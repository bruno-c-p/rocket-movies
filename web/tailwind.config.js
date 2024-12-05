/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      pink: "#FF859B",
      white: "#ffffff",
      background: "#1C1B1E",
      "dark-background": "#0D0C0F",
      "base-input": "#262529",
      "base-label": "#948F99",
      "base-title": "#F4EDE8",
      "base-text": "#CAC4CF",
      "base-border": "#3E3B47",
      "card-text": "#999591",
      "base-tag": "#312E38",
      "tag-name": "#E5E5E5",
    },
    fontFamily: {
      sans: ["REM", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        auth: "url('src/assets/bg-auth.png')",
      },
      fontSize: {
        "card-title": ["1.5rem", { lineHeight: "130%", fontWeight: "600" }],
        "title-mm": ["1.5rem", { lineHeight: "130%", fontWeight: "500" }],
        "title-xleb": ["3rem", { lineHeight: "130%", fontWeight: "700" }],
        "title-leb": ["2.25rem", { lineHeight: "130%", fontWeight: "700" }],
        "header-logo": ["1.25rem", { lineHeight: "130%", fontWeight: "700" }],
        "section-title": ["2rem", { lineHeight: "130%", fontWeight: "500" }],
        sr: ["0.875rem", { lineHeight: "160%", fontWeight: "400" }],
        mr: ["1rem", { lineHeight: "160%", fontWeight: "400" }],
        sb: ["0.875rem", { lineHeight: "160%", fontWeight: "700" }],
        tag: ["0.75rem", { lineHeight: "160%", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
