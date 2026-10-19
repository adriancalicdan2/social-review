"use client";

import React, { useState } from "react";
import { Profile, ProfileLink, PlatformType } from "@/lib/types";
import { IconMapper } from "@/components/ui/IconMapper";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Edit2,
  Check,
  X,
} from "lucide-react";

interface LinksManagerPanelProps {
  profile: Profile;
  onChange: (updated: Profile) => void;
}

const PLATFORMS: { id: PlatformType; name: string; defaultCategory: ProfileLink["category"] }[] = [
  { id: "spotify", name: "Spotify", defaultCategory: "music" },
  { id: "youtube", name: "YouTube", defaultCategory: "music" },
  { id: "applemusic", name: "Apple Music", defaultCategory: "music" },
  { id: "instagram", name: "Instagram", defaultCategory: "social" },
  { id: "tiktok", name: "TikTok", defaultCategory: "social" },
  { id: "twitter", name: "X / Twitter", defaultCategory: "social" },
  { id: "facebook", name: "Facebook", defaultCategory: "social" },
  { id: "linkedin", name: "LinkedIn", defaultCategory: "social" },
  { id: "whatsapp", name: "WhatsApp", defaultCategory: "contact" },
  { id: "telegram", name: "Telegram", defaultCategory: "contact" },
  { id: "messenger", name: "Messenger", defaultCategory: "contact" },
  { id: "shopee", name: "Shopee Store", defaultCategory: "products" },
  { id: "lazada", name: "Lazada Store", defaultCategory: "products" },
  { id: "phone", name: "Phone / vCard", defaultCategory: "contact" },
  { id: "email", name: "Email Address", defaultCategory: "contact" },
  { id: "website", name: "Custom Website", defaultCategory: "featured" },
];

export const LinksManagerPanel: React.FC<LinksManagerPanelProps> = ({ profile, onChange }) => {
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [newPlatform, setNewPlatform] = useState<PlatformType>("website");

  const updateLinks = (links: ProfileLink[]) => {
    onChange({
      ...profile,
      links,
    });
  };

  const handleAddLink = () => {
    const platInfo = PLATFORMS.find((p) => p.id === newPlatform) || PLATFORMS[0];
    const newLink: ProfileLink = {
      id: `link-${Date.now()}`,
      title: `${platInfo.name} Link`,
      url: newPlatform === "email" ? "mailto:" : newPlatform === "phone" ? "tel:" : "https://",
      platform: newPlatform,
      category: platInfo.defaultCategory,
      badge: null,
      isActive: true,
      isHighlighted: false,
      sortOrder: profile.links.length,
    };

    const updated = [...profile.links, newLink];
    updateLinks(updated);
    setEditingLinkId(newLink.id);
  };

  const handleDeleteLink = (id: string) => {
    updateLinks(profile.links.filter((l) => l.id !== id));
  };

  const handleToggleActive = (id: string) => {
    updateLinks(
      profile.links.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l))
    );
  };

  const handleToggleHighlight = (id: string) => {
    updateLinks(
      profile.links.map((l) => (l.id === id ? { ...l, isHighlighted: !l.isHighlighted } : l))
    );
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= profile.links.length) return;

    const copy = [...profile.links];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    updateLinks(copy);
  };

  const handleUpdateItem = (id: string, patch: Partial<ProfileLink>) => {
    updateLinks(profile.links.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  return (
    <div className="flex flex-col gap-6 text-slate-200">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-purple-400" />
          <span>Links, Music & Social Channels</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Add, reorder, categorize, and highlight customer links.
        </p>
      </div>

      {/* Add New Link Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <IconMapper platform={newPlatform} className="w-6 h-6 flex-shrink-0" />
          <select
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
            className="w-full text-xs font-semibold bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleAddLink}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Channel</span>
        </button>
      </div>

      {/* Links List */}
      <div className="flex flex-col gap-2.5">
        {profile.links.length === 0 ? (
          <div className="text-center py-10 px-4 border border-dashed border-slate-800 rounded-2xl">
            <LinkIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-medium">No links added yet.</p>
            <p className="text-[11px] text-slate-500">Choose a platform above to get started.</p>
          </div>
        ) : (
          profile.links.map((link, idx) => {
            const isEditing = editingLinkId === link.id;

            return (
              <div
                key={link.id}
                className={`flex flex-col rounded-2xl border transition-all ${
                  isEditing
                    ? "border-purple-500 bg-slate-900/90 p-4 shadow-xl"
                    : link.isActive
                    ? "border-slate-800 bg-slate-900/60 p-3 hover:border-slate-700"
                    : "border-slate-900 bg-slate-950/60 p-3 opacity-60"
                }`}
              >
                {/* Header Row (View Mode) */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <IconMapper platform={link.platform} className="w-6 h-6 flex-shrink-0" />

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">
                          {link.title}
                        </span>
                        {link.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {link.badge}
                          </span>
                        )}
                        {link.isHighlighted && (
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono truncate">
                        {link.url}
                      </span>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleHighlight(link.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        link.isHighlighted
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                      title="Toggle Glow Highlight"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(link.id)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                      title={link.isActive ? "Hide Link" : "Show Link"}
                    >
                      {link.isActive ? (
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingLinkId(isEditing ? null : link.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isEditing
                          ? "bg-purple-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                      title="Edit Link Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1.5 text-slate-500 hover:text-slate-300 disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === profile.links.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1.5 text-slate-500 hover:text-slate-300 disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-1.5 text-red-400/70 hover:text-red-400 rounded-lg transition-colors"
                      title="Delete Link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Edit Form */}
                {isEditing && (
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-800 animate-fade-slide-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Display Label
                        </label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            handleUpdateItem(link.id, { title: e.target.value })
                          }
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Optional Badge (e.g. ★ LATEST MUSIC)
                        </label>
                        <input
                          type="text"
                          value={link.badge || ""}
                          onChange={(e) =>
                            handleUpdateItem(link.id, { badge: e.target.value || null })
                          }
                          placeholder="e.g. 50% OFF or NEW MV"
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Destination Target URL
                      </label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                          handleUpdateItem(link.id, { url: e.target.value })
                        }
                        className="w-full text-xs font-mono bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-purple-300 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Category Group
                        </label>
                        <select
                          value={link.category}
                          onChange={(e) =>
                            handleUpdateItem(link.id, {
                              category: e.target.value as ProfileLink["category"],
                            })
                          }
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="music">Music & Streaming</option>
                          <option value="social">Official Social Media</option>
                          <option value="contact">Contact & Community</option>
                          <option value="featured">Featured Links</option>
                          <option value="products">Products & Merch</option>
                          <option value="other">Other Links</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Platform Icon
                        </label>
                        <select
                          value={link.platform}
                          onChange={(e) =>
                            handleUpdateItem(link.id, {
                              platform: e.target.value as PlatformType,
                            })
                          }
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                        >
                          {PLATFORMS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingLinkId(null)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Done Editing</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
