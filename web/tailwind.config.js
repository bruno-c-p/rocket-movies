/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      pink: "#FF859B",
      white: "#ffffff",
      background: "#1C1B1E",
      "base-input": "#262529",
      "base-label": "#948F99",
      "base-title": "#F4EDE8",
      "base-text": "#CAC4CF",
      // "yellow-dark": "#c47f17",
      // "yellow-light": "#f1e9c9",
      // yellow: "#dbac2c",
      // "purple-dark": "#4b2995",
      // "purple-light": "#ebe5f9",
      // purple: "#8047f8",
      // "base-subtitle": "#403937",
      // "base-hover": "#d7d5d5",
      // "base-card": "#f3f2f2",
    },
    fontFamily: {
      sans: ["REM", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        auth: "url('src/assets/bg-auth.png')",
      },
      fontSize: {
        "title-xleb": ["3rem", { lineHeight: "130%", fontWeight: "700" }],
        "title-mm": ["1.5rem", { lineHeight: "130%", fontWeight: "500" }],
        "title-leb": ["2.25rem", { lineHeight: "130%", fontWeight: "700" }],
        sr: ["0.875rem", { lineHeight: "130%", fontWeight: "400" }],
        // tag: ["0.625rem", { lineHeight: "130%", fontWeight: "700" }],
        // "button-g": ["0.875rem", { lineHeight: "160%", fontWeight: "700" }],
        // "button-m": ["0.75rem", { lineHeight: "160%", fontWeight: "400" }],
        // xsb: ["0.75rem", { lineHeight: "130%", fontWeight: "700" }],
        // mr: ["1rem", { lineHeight: "130%", fontWeight: "400" }],
        // mb: ["1rem", { lineHeight: "130%", fontWeight: "700" }],
        // lr: ["1.25rem", { lineHeight: "130%", fontWeight: "400" }],
        // lb: ["1.25rem", { lineHeight: "130%", fontWeight: "700" }],
        // "title-xsb": ["1.125rem", { lineHeight: "130%", fontWeight: "700" }],
        // "title-sb": ["1.25rem", { lineHeight: "130%", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};