"use client";

import React from "react";
import { Profile, ThemeSettings } from "@/lib/types";
import { BRAND_PALETTES, applyPaletteToTheme, getContrastRatio } from "@/lib/colorUtils";
import { Palette, Sparkles, Check, Sliders, Eye } from "lucide-react";

interface ColorPickerPanelProps {
  profile: Profile;
  onChange: (updated: Profile) => void;
}

export const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({ profile, onChange }) => {
  const { themeSettings } = profile;

  const updateTheme = (patch: Partial<ThemeSettings>) => {
    onChange({
      ...profile,
      themeSettings: {
        ...themeSettings,
        ...patch,
      },
    });
  };

  const handleApplyPalette = (palette: (typeof BRAND_PALETTES)[0]) => {
    const updated = applyPaletteToTheme(themeSettings, palette);
    updateTheme(updated);
  };

  const contrast = getContrastRatio(themeSettings.textColor, themeSettings.bgPrimary);

  return (
    <div className="flex flex-col gap-6 text-slate-200">
      {/* Section Header */}
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" />
          <span>Brand Theme & Color Studio</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Customize colors to perfectly match your client or company brand identity.
        </p>
      </div>

      {/* 1. Quick Industry Brand Palettes */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>1-Click Brand Combinations</span>
          <span className="text-[10px] text-purple-400 font-normal">9 Curated Presets</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {BRAND_PALETTES.map((p) => {
            const isSelected = themeSettings.preset === p.id;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPalette(p)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left group ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/10 shadow-md ring-1 ring-purple-500/40"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-slate-200 truncate group-hover:text-white">
                    {p.name}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">{p.category}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Color Swatch Dots */}
                  <div className="flex -space-x-1">
                    <span
                      className="w-4 h-4 rounded-full border border-slate-900 shadow-sm"
                      style={{ backgroundColor: p.bgPrimary }}
                      title="Background"
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-slate-900 shadow-sm"
                      style={{ backgroundColor: p.accentColor }}
                      title="Primary Brand Accent"
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-slate-900 shadow-sm"
                      style={{ backgroundColor: p.secondaryAccent }}
                      title="Secondary Accent"
                    />
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 ml-1" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Granular Color Pickers */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Fine-Tune Brand Colors</span>
          <span className="text-[10px] text-slate-400">Hex / Eyedropper</span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          {/* Primary Accent */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-300">Primary Brand Color</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={themeSettings.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={themeSettings.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Secondary Accent */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-300">Secondary Accent</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={themeSettings.secondaryAccent}
                onChange={(e) => updateTheme({ secondaryAccent: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={themeSettings.secondaryAccent}
                onChange={(e) => updateTheme({ secondaryAccent: e.target.value })}
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Background Primary */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-300">Background Color</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={themeSettings.bgPrimary}
                onChange={(e) => updateTheme({ bgPrimary: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={themeSettings.bgPrimary}
                onChange={(e) => updateTheme({ bgPrimary: e.target.value })}
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-300">Heading & Text Color</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={themeSettings.textColor}
                onChange={(e) => updateTheme({ textColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={themeSettings.textColor}
                onChange={(e) => updateTheme({ textColor: e.target.value })}
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Contrast Ratio Meter */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Eye className="w-4 h-4 text-slate-400" />
            <span>Readability Contrast:</span>
            <span className="font-mono font-bold text-white">{contrast}:1</span>
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              contrast >= 7
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : contrast >= 4.5
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            }`}
          >
            {contrast >= 7 ? "AAA High Readability" : contrast >= 4.5 ? "AA Compliant" : "Low Contrast"}
          </span>
        </div>
      </div>

      {/* 3. Background Style & Atmosphere */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Background Atmosphere
        </label>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => updateTheme({ bgType: "mesh", enableGlow: true })}
            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
              themeSettings.bgType === "mesh"
                ? "border-purple-500 bg-purple-500/20 text-white font-bold"
                : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
            }`}
          >
            Cyber Glow Mesh
          </button>
          <button
            type="button"
            onClick={() => updateTheme({ bgType: "gradient", enableGlow: false })}
            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
              themeSettings.bgType === "gradient"
                ? "border-purple-500 bg-purple-500/20 text-white font-bold"
                : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
            }`}
          >
            Smooth Gradient
          </button>
          <button
            type="button"
            onClick={() => updateTheme({ bgType: "solid", enableGlow: false })}
            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
              themeSettings.bgType === "solid"
                ? "border-purple-500 bg-purple-500/20 text-white font-bold"
                : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
            }`}
          >
            Solid Clean
          </button>
        </div>
      </div>

      {/* 4. Button & Shape Geometry */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-purple-400" />
          <span>Card & Button Geometry</span>
        </label>

        {/* Button Corner Radius */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-slate-400">Button Corner Curvature:</span>
          <div className="grid grid-cols-3 gap-2">
            {(["sharp", "rounded", "pill"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => updateTheme({ buttonRadius: r })}
                className={`py-2 px-3 rounded-xl border text-xs capitalize transition-all ${
                  themeSettings.buttonRadius === r
                    ? "border-purple-500 bg-purple-500/20 text-white font-bold"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Effects Toggles */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300">Click Ripple FX</span>
            <input
              type="checkbox"
              checked={themeSettings.enableRipples}
              onChange={(e) => updateTheme({ enableRipples: e.target.checked })}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300">Mesh Pattern Grid</span>
            <input
              type="checkbox"
              checked={themeSettings.enableMeshTexture}
              onChange={(e) => updateTheme({ enableMeshTexture: e.target.checked })}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
