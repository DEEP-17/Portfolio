import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Skills page shadow colors
    'hover:border-purple-500/50', 'hover:shadow-purple-500/20', 'text-purple-400',
    'hover:border-cyan-500/50', 'hover:shadow-cyan-500/20', 'text-cyan-400',
    'hover:border-green-500/50', 'hover:shadow-green-500/20', 'text-green-400',
    'hover:border-amber-500/50', 'hover:shadow-amber-500/20', 'text-amber-400',
    'hover:border-blue-500/50', 'hover:shadow-blue-500/20', 'text-blue-400',
    'hover:border-rose-500/50', 'hover:shadow-rose-500/20', 'text-rose-400',
    // Projects + Achievements gradient colors
    'hover:border-violet-500/50', 'hover:shadow-violet-500/20', 'text-violet-400',
    'hover:border-sky-500/50', 'hover:shadow-sky-500/20', 'text-sky-400',
    // Tag hover states (skills)
    'group-hover:border-purple-500/30', 'group-hover:text-purple-400',
    'group-hover:border-cyan-500/30', 'group-hover:text-cyan-400',
    'group-hover:border-green-500/30', 'group-hover:text-green-400',
    'group-hover:border-amber-500/30', 'group-hover:text-amber-400',
    'group-hover:border-blue-500/30', 'group-hover:text-blue-400',
    'group-hover:border-rose-500/30', 'group-hover:text-rose-400',
    // Tag hover states (projects)
    'group-hover:border-violet-500/30', 'group-hover:text-violet-400',
    'group-hover:border-sky-500/30', 'group-hover:text-sky-400',
    'group-hover:!text-cyan-400', 'group-hover:!text-green-400',
    'group-hover:!text-purple-400', 'group-hover:!text-amber-400',
    'group-hover:!text-violet-400', 'group-hover:!text-blue-400',
    'group-hover:!text-sky-400',
    'dark:group-hover:!text-cyan-400', 'dark:group-hover:!text-green-400',
    'dark:group-hover:!text-purple-400', 'dark:group-hover:!text-amber-400',
    'dark:group-hover:!text-violet-400', 'dark:group-hover:!text-blue-400',
    'dark:group-hover:!text-sky-400',
    // Shadow utilities
    'shadow-purple-500/20', 'shadow-cyan-500/20', 'shadow-green-500/20',
    'shadow-amber-500/20', 'shadow-blue-500/20', 'shadow-rose-500/20',
    'shadow-violet-500/20', 'shadow-sky-500/20',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
      },
    },
  },
  plugins: [],
};
export default config;
