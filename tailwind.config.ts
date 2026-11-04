import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#14201F", paper: "#F4F7F6", brand: { DEFAULT: "#0E4D4A", dark: "#093634", soft: "#DCEBE9" }, saffron: { DEFAULT: "#E8A317", soft: "#FCEFCB" }, line: "#D5DFDD" },
    fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"], serif: ["var(--font-serif)", "Georgia", "serif"] }
  } },
  plugins: []
} satisfies Config;
