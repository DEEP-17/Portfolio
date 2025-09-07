import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'hover:border-blue-500/50',
    'hover:shadow-blue-500/20',
    'text-blue-400',
    'hover:border-green-500/50',
    'hover:shadow-green-500/20',
    'text-green-400',
    'hover:border-purple-500/50',
    'hover:shadow-purple-500/20',
    'text-purple-400',
    'hover:border-yellow-500/50',
    'hover:shadow-yellow-500/20',
    'text-yellow-400',
    'hover:border-pink-500/50',
    'hover:shadow-pink-500/20',
    'text-pink-400',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
