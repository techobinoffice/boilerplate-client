/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "2xsm": "375px",
      },
      colors: {
        primary: "#00aeef",
        body: "#64748B",
        bodydark: "#AEB7C0",
        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        stroke: "#E2E8F0",
        strokedark: "#2E3A47",
        boxdark: "#24303F",
        "meta-4": "#313D4A",
      },
      spacing: {
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        72.5: "18.125rem",
        125: "31.25rem",
      },
      zIndex: {
        1: "1",
        999: "999",
        99999: "99999",
      },
      transitionDelay: {
        400: "400ms",
      },
      boxShadow: {
        default: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
        2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
        "theme-xs": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      dropShadow: {
        1: "0px 1px 0px #E2E8F0",
      },
    },
  },
  plugins: [],
};
