"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TemplateId, Profile } from "@/lib/types";
import { BRAND_PALETTES, applyPaletteToTheme } from "@/lib/colorUtils";
import { saveProfile, isSlugAvailable } from "@/lib/storage";
import { ArrowLeft, Sparkles, Check, ChevronRight, AlertCircle, Layout } from "lucide-react";

export default function NewProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [templateId, setTemplateId] = useState<TemplateId>("cyber-glow");
  const [selectedPaletteId, setSelectedPaletteId] = useState("cyber-neon");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 24)
      );
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
    if (!name.trim()) {
      setError("Please provide a business or customer name.");
      return;
    }
    if (!cleanSlug) {
      setError("Please enter a valid URL slug.");
      return;
    }

    setIsSubmitting(true);
    const available = await isSlugAvailable(cleanSlug);
    if (!available) {
      setError(`The slug "${cleanSlug}" is already taken or reserved. Please choose another.`);
      setIsSubmitting(false);
      return;
    }

    const palette = BRAND_PALETTES.find((p) => p.id === selectedPaletteId) || BRAND_PALETTES[0];
    const newId = `profile-${Date.now()}`;

    const newProfile: Profile = {
      id: newId,
      slug: cleanSlug,
      name: name.trim(),
      subtitle: "Official Digital Hub",
      bio: "Welcome to my official digital profile. Tap any link below to connect.",
      avatarUrl: "/image.png",
      templateId: templateId,
      status: "draft",
      verified: true,
      themeSettings: {
        preset: palette.id,
        themeMode: palette.bgPrimary === "#f8fafc" ? "light" : "dark",
        bgType: "mesh",
        bgPrimary: palette.bgPrimary,
        bgSecondary: palette.bgSecondary,
        bgGradientAngle: 135,
        accentColor: palette.accentColor,
        secondaryAccent: palette.secondaryAccent,
        textColor: palette.textColor,
        textSecondaryColor: palette.bgPrimary === "#f8fafc" ? "#475569" : "#c3c0db",
        cardBg: palette.cardBg,
        cardOpacity: 10,
        borderColor: palette.borderColor,
        buttonRadius: "rounded",
        buttonStyle: "glass",
        enableGlow: true,
        enableRipples: true,
        enableMeshTexture: true,
        fontFamily: "Space Grotesk",
      },
      layoutSettings: {
        avatarShape: "circle",
        showSubtitlePill: true,
        showVerificationBadge: true,
        showFooterBranding: true,
        footerText: "Powered by TMaker • NFC Digital Profile",
        sectionSpacing: "normal",
      },
      contactInfo: {
        email: "contact@" + cleanSlug + ".com",
      },
      sections: [
        { id: "s-1", title: "Featured Links", sectionKey: "featured", isVisible: true, sortOrder: 0 },
        { id: "s-2", title: "Socials", sectionKey: "social", isVisible: true, sortOrder: 1 },
      ],
      links: [
        {
          id: `link-${Date.now()}-1`,
          title: "Official Website",
          url: "https://tmaker.com",
          platform: "website",
          category: "featured",
          badge: "FEATURED",
          isActive: true,
          isHighlighted: true,
          sortOrder: 0,
        },
        {
          id: `link-${Date.now()}-2`,
          title: "Instagram",
          url: "https://instagram.com",
          platform: "instagram",
          category: "social",
          badge: null,
          isActive: true,
          isHighlighted: false,
          sortOrder: 1,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = await saveProfile(newProfile);
    router.push(`/editor/${saved.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-white">Create New Customer Profile</h1>
          <p className="text-xs text-slate-400 mt-1">
            Set up the client name, unique NFC URL slug, and starting theme preset.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="flex flex-col gap-5">
          {/* Client Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Customer or Business Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Acme Studio or Maria Santos"
              className="w-full text-sm bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Unique URL Slug *
            </label>
            <div className="flex items-center rounded-xl bg-slate-950 border border-slate-700 overflow-hidden focus-within:border-purple-500">
              <span className="px-3.5 text-xs text-slate-500 font-mono select-none">
                tmaker.com/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                }
                placeholder="acme"
                className="w-full text-sm bg-transparent py-3 pr-3 text-purple-300 font-mono focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              This slug will be written directly to the customer&apos;s physical NFC card.
            </p>
          </div>

          {/* Template Style */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Starting Template Layout:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: "cyber-glow", name: "Cyber Glow Studio", desc: "Ambient glow & dark aesthetic" },
                { id: "modern-bio", name: "Modern Bio", desc: "Clean & social-first" },
                { id: "executive-card", name: "Executive Card", desc: "vCard & corporate layout" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplateId(t.id as TemplateId)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    templateId === t.id
                      ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/40 text-white"
                      : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="text-xs font-bold block text-white">{t.name}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Initial Color Palette */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Choose Brand Color Combination:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BRAND_PALETTES.slice(0, 6).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPaletteId(p.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedPaletteId === p.id
                      ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/40"
                      : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-200 truncate">{p.name}</span>
                    {selectedPaletteId === p.id && <Check className="w-3 h-3 text-purple-400" />}
                  </div>
                  <div className="flex -space-x-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-900" style={{ backgroundColor: p.bgPrimary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-900" style={{ backgroundColor: p.accentColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-900" style={{ backgroundColor: p.secondaryAccent }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Launch Visual Editor</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
