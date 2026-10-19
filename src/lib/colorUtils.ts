import { ColorPalette, ThemeSettings } from "./types";

export const BRAND_PALETTES: ColorPalette[] = [
  {
    id: "cyber-neon",
    name: "Cyber Pop / Neon Glow",
    category: "Entertainment & Music",
    bgPrimary: "#0a0814",
    bgSecondary: "#131024",
    accentColor: "#a37bf7",
    secondaryAccent: "#1bdfcf",
    textColor: "#f8fafc",
    cardBg: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.09)",
  },
  {
    id: "corporate-navy",
    name: "Corporate Enterprise",
    category: "Business & Executive",
    bgPrimary: "#0f172a",
    bgSecondary: "#1e293b",
    accentColor: "#0ea5e9",
    secondaryAccent: "#38bdf8",
    textColor: "#f8fafc",
    cardBg: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  {
    id: "luxury-gold",
    name: "Luxury Obsidian & Gold",
    category: "High-End & Real Estate",
    bgPrimary: "#121212",
    bgSecondary: "#1c1917",
    accentColor: "#d4af37",
    secondaryAccent: "#f5e6c8",
    textColor: "#fafaf9",
    cardBg: "rgba(212, 175, 55, 0.06)",
    borderColor: "rgba(212, 175, 55, 0.25)",
  },
  {
    id: "minimal-light",
    name: "Modern Clean White",
    category: "Tech & Minimalist",
    bgPrimary: "#f8fafc",
    bgSecondary: "#ffffff",
    accentColor: "#4f46e5",
    secondaryAccent: "#06b6d4",
    textColor: "#0f172a",
    cardBg: "rgba(255, 255, 255, 0.85)",
    borderColor: "rgba(226, 232, 240, 0.9)",
  },
  {
    id: "eco-forest",
    name: "Eco Forest & Mint",
    category: "Sustainability & Wellness",
    bgPrimary: "#0e1a17",
    bgSecondary: "#162823",
    accentColor: "#10b981",
    secondaryAccent: "#34d399",
    textColor: "#f0fdf4",
    cardBg: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(52, 211, 153, 0.2)",
  },
  {
    id: "artisan-warmth",
    name: "Warm Espresso & Terracotta",
    category: "Artisan & Café",
    bgPrimary: "#1c1411",
    bgSecondary: "#2b1c17",
    accentColor: "#ea580c",
    secondaryAccent: "#f97316",
    textColor: "#fff7ed",
    cardBg: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(234, 88, 12, 0.25)",
  },
  {
    id: "fintech-matrix",
    name: "Fintech Space & Lime",
    category: "Finance & Web3",
    bgPrimary: "#030712",
    bgSecondary: "#111827",
    accentColor: "#84cc16",
    secondaryAccent: "#14b8a6",
    textColor: "#f9fafb",
    cardBg: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(132, 204, 22, 0.25)",
  },
  {
    id: "beauty-rose",
    name: "Rose Velvet & Blush",
    category: "Fashion & Beauty",
    bgPrimary: "#180d15",
    bgSecondary: "#2a1524",
    accentColor: "#f472b6",
    secondaryAccent: "#c084fc",
    textColor: "#fdf2f8",
    cardBg: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(244, 114, 182, 0.25)",
  },
  {
    id: "crimson-pulse",
    name: "Crimson & Amber Glow",
    category: "Food & Entertainment",
    bgPrimary: "#1a0808",
    bgSecondary: "#2e0f0f",
    accentColor: "#ef4444",
    secondaryAccent: "#f59e0b",
    textColor: "#fef2f2",
    cardBg: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(239, 68, 68, 0.25)",
  },
];

export function applyPaletteToTheme(current: ThemeSettings, palette: ColorPalette): ThemeSettings {
  return {
    ...current,
    preset: palette.id,
    themeMode: palette.bgPrimary === "#f8fafc" ? "light" : "dark",
    bgPrimary: palette.bgPrimary,
    bgSecondary: palette.bgSecondary,
    accentColor: palette.accentColor,
    secondaryAccent: palette.secondaryAccent,
    textColor: palette.textColor,
    textSecondaryColor: palette.bgPrimary === "#f8fafc" ? "#475569" : "#c3c0db",
    cardBg: palette.cardBg,
    borderColor: palette.borderColor,
  };
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1) || { r: 0, g: 0, b: 0 };
  const rgb2 = hexToRgb(hex2) || { r: 255, g: 255, b: 255 };

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return parseFloat(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}
