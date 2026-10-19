"use client";

import React from "react";
import { Profile, ThemeSettings } from "@/lib/types";
import { getContrastRatio } from "@/lib/colorUtils";
import { Palette, Plus, Trash2, Eye, Sliders, Sparkles } from "lucide-react";

interface ColorPickerPanelProps {
  profile: Profile;
  onChange: (updated: Profile) => void;
}

export const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({ profile, onChange }) => {
  const { themeSettings } = profile;

  const color1 = themeSettings.color1 || themeSettings.accentColor || "#a37bf7";
  const color2 = themeSettings.color2 || themeSettings.secondaryAccent || "#1bdfcf";
  const additionalColors = themeSettings.additionalColors || [];

  const updateTheme = (patch: Partial<ThemeSettings>) => {
    onChange({
      ...profile,
      themeSettings: {
        ...themeSettings,
        ...patch,
      },
    });
  };

  const handleColor1Change = (val: string) => {
    updateTheme({
      color1: val,
      accentColor: val, // Keep in sync
    });
  };

  const handleColor2Change = (val: string) => {
    updateTheme({
      color2: val,
      secondaryAccent: val, // Keep in sync
    });
  };

  const handleAddColor = () => {
    const defaultPalette = ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981", "#3b82f6", "#ef4444"];
    const nextColor = defaultPalette[additionalColors.length % defaultPalette.length];
    const updated = [...additionalColors, nextColor];
    updateTheme({
      additionalColors: updated,
    });
  };

  const handleUpdateAdditionalColor = (index: number, val: string) => {
    const copy = [...additionalColors];
    copy[index] = val;
    updateTheme({
      additionalColors: copy,
    });
  };

  const handleRemoveAdditionalColor = (index: number) => {
    const filtered = additionalColors.filter((_, i) => i !== index);
    updateTheme({
      additionalColors: filtered,
    });
  };

  const contrast = getContrastRatio(themeSettings.textColor, themeSettings.bgPrimary);

  // All active brand colors
  const allBrandColors = [color1, color2, ...additionalColors];

  return (
    <div className="flex flex-col gap-6 text-slate-200">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" />
          <span>Brand Colors Studio</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Set your client&apos;s brand colors. Start with Color 1 &amp; Color 2, then add more colors as needed.
        </p>
      </div>

      {/* 1. Base Colors: Color 1 & Color 2 */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Core Brand Palette
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Color 1 */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Color 1 (Primary)</span>
              <span
                className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
                style={{ backgroundColor: color1 }}
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={color1}
                onChange={(e) => handleColor1Change(e.target.value)}
                className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => handleColor1Change(e.target.value)}
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Color 2 */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Color 2 (Secondary)</span>
              <span
                className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
                style={{ backgroundColor: color2 }}
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={color2}
                onChange={(e) => handleColor2Change(e.target.value)}
                className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => handleColor2Change(e.target.value)}
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Additional Colors (Color 3, Color 4...) */}
        {additionalColors.map((col, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 animate-fade-slide-up"
          >
            <div className="flex items-center gap-2.5 flex-1">
              <span className="text-xs font-bold text-slate-300 w-16">
                Color {idx + 3}
              </span>
              <input
                type="color"
                value={col}
                onChange={(e) => handleUpdateAdditionalColor(idx, e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={col}
                onChange={(e) => handleUpdateAdditionalColor(idx, e.target.value)}
                className="w-32 text-xs font-mono uppercase bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemoveAdditionalColor(idx)}
              className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
              title="Remove Color"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* "+ Add Color" Button */}
        <button
          type="button"
          onClick={handleAddColor}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 hover:bg-slate-900 hover:border-purple-500 text-xs font-bold text-slate-300 hover:text-white transition-all active:scale-[0.99] mt-1"
        >
          <Plus className="w-4 h-4 text-purple-400" />
          <span>Add Color (Color {allBrandColors.length + 1})</span>
        </button>

        {/* Color Palette Preview Ribbon */}
        <div className="flex items-center gap-2 mt-2 p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400">Palette:</span>
          <div className="flex items-center -space-x-1">
            {allBrandColors.map((c, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full border-2 border-slate-900 shadow-sm"
                style={{ backgroundColor: c }}
                title={`Color ${i + 1}: ${c}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-500 ml-auto font-mono">
            {allBrandColors.length} colors active
          </span>
        </div>
      </div>

      {/* 2. Background & Text Colors */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Surface &amp; Typography Tones
        </label>

        <div className="grid grid-cols-2 gap-3">
          {/* Background Primary */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-300">Background Tone</span>
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
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-300">Text &amp; Heading Color</span>
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
                className="w-full text-xs font-mono uppercase bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Readability Meter */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
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

      {/* 3. Background Style */}
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
            Ambient Glow
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
          <span>Card &amp; Button Geometry</span>
        </label>

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
