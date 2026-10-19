"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/lib/types";
import {
  getProfiles,
  saveProfile,
  deleteProfile,
  duplicateProfile,
} from "@/lib/storage";
import { QRCodeModal } from "@/components/editor/QRCodeModal";
import {
  Plus,
  Search,
  Globe,
  Edit,
  Copy,
  Trash2,
  QrCode,
  ExternalLink,
  CheckCircle,
  Eye,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  ArrowUpRight,
  LogOut,
  FolderLock,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [loading, setLoading] = useState(true);
  const [activeQrProfile, setActiveQrProfile] = useState<Profile | null>(null);

  const loadProfiles = async () => {
    setLoading(true);
    const list = await getProfiles();
    setProfiles(list);
    setLoading(false);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const handleDuplicate = async (id: string) => {
    const dup = await duplicateProfile(id);
    if (dup) {
      await loadProfiles();
      router.push(`/editor/${dup.id}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete profile "${name}"? This cannot be undone.`)) {
      await deleteProfile(id);
      await loadProfiles();
    }
  };

  const handleTogglePublish = async (profile: Profile) => {
    const newStatus = profile.status === "published" ? "draft" : "published";
    await saveProfile({
      ...profile,
      status: newStatus,
    });
    await loadProfiles();
  };

  const filtered = profiles.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ? true : p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalProfiles = profiles.length;
  const publishedCount = profiles.filter((p) => p.status === "published").length;
  const draftCount = profiles.filter((p) => p.status === "draft").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Dashboard Top Header */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-base shadow-lg shadow-purple-600/30">
            T
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white">
              TMaker Studio
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              NFC Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Visit Landing Page
          </a>

          <button
            onClick={() => router.push("/editor/new")}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Profile</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col gap-8">
        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Customer Profiles
              </p>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {totalProfiles}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Smartphone className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Active Published NFC URLs
              </p>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {publishedCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Globe className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Drafts in Customization
              </p>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {draftCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FolderLock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name or slug..."
              className="w-full text-xs bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900 border border-slate-800 p-1 rounded-2xl">
            {(["all", "published", "draft"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filterStatus === st
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Profiles Table / Cards */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm">
            Loading customer profiles...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/30">
            <Smartphone className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Profiles Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search criteria or create a brand new client profile.
            </p>
            <button
              onClick={() => router.push("/editor/new")}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Profile</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 shadow-xl transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div>
                  {/* Top Bar with Avatar & Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatarUrl || "/aura-logo.svg"}
                        alt={item.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-700 bg-slate-950"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/aura-logo.svg";
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-white truncate">
                            {item.name}
                          </h3>
                          {item.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs font-mono text-purple-400 truncate">
                          /{item.slug}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        item.status === "published"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Subtitle / Bio Preview */}
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {item.bio || item.subtitle || "No description configured."}
                  </p>

                  {/* Template & Links Pill Stats */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400 mb-4">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800">
                      Layout: {item.templateId}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800">
                      {item.links.length} active channels
                    </span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    {/* Visual Editor Button */}
                    <button
                      onClick={() => router.push(`/editor/${item.id}`)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Design</span>
                    </button>

                    {/* QR Code / NFC Link */}
                    <button
                      onClick={() => setActiveQrProfile(item)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      title="NFC URL & QR Code"
                    >
                      <QrCode className="w-4 h-4 text-purple-400" />
                    </button>

                    {/* Open in Live Tab */}
                    <a
                      href={`/${item.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      title="Open Profile Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Duplicate & Delete Dropdown Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(item.id)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      title="Duplicate Profile"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      title="Delete Profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* QR Code Modal for Selected Profile */}
      {activeQrProfile && (
        <QRCodeModal
          profile={activeQrProfile}
          isOpen={Boolean(activeQrProfile)}
          onClose={() => setActiveQrProfile(null)}
        />
      )}
    </div>
  );
}
