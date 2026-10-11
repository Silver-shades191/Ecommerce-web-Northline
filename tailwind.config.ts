import type { Config } from "tailwindcss";
const config: Config = { darkMode: "class", content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#17231f", moss: "#355447", sand: "#f4f2eb", clay: "#c76b4b" }, fontFamily: { sans: ["Arial", "sans-serif"] } } }, plugins: [] };
export default config;
