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
import { LetterAvatar } from "@/components/ui/LetterAvatar";
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
  Shield,
  Users,
  ChevronDown,
  ChevronUp,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [loading, setLoading] = useState(true);
  const [activeQrProfile, setActiveQrProfile] = useState<Profile | null>(null);
  // Admin: which user's profiles to view ("all" or specific userId)
  const [adminUserFilter, setAdminUserFilter] = useState<string>("all");
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, authLoading, router]);

  const loadProfiles = async () => {
    if (!user) return;
    setLoading(true);
    const list = await getProfiles(user.uid, isAdmin);
    setProfiles(list);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadProfiles();
    }
  }, [user]);

  const handleDuplicate = async (id: string) => {
    const dup = await duplicateProfile(id, user?.uid);
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

  // Get unique users from profiles (admin only)
  const uniqueUsers = React.useMemo(() => {
    if (!isAdmin) return [];
    const userMap = new Map<string, { userId: string; email?: string; count: number }>();
    profiles.forEach((p) => {
      if (p.userId) {
        const existing = userMap.get(p.userId);
        if (existing) {
          existing.count++;
        } else {
          userMap.set(p.userId, { userId: p.userId, count: 1 });
        }
      }
    });
    return Array.from(userMap.values());
  }, [profiles, isAdmin]);

  // Filter profiles based on search, status, and admin user filter
  const filtered = profiles.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ? true : p.status === filterStatus;
    const matchesUser =
      !isAdmin || adminUserFilter === "all" ? true : p.userId === adminUserFilter;
    return matchesSearch && matchesStatus && matchesUser;
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
            {isAdmin && (
              <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" />
                Super Admin
              </span>
            )}
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

          {/* User Status & Sign Out */}
          {user && (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-mono text-slate-400">
                  {user.displayName || user.email}
                </span>
                {user.displayName && user.email && (
                  <span className="text-[10px] text-slate-500">{user.email}</span>
                )}
              </div>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-slate-700"
                />
              ) : null}
              <button
                onClick={async () => {
                  await signOut();
                  router.push("/login");
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                title="Sign Out of Studio"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col gap-8">
        {/* Admin Users Panel */}
        {isAdmin && (
          <div className="rounded-3xl bg-gradient-to-r from-amber-500/5 to-purple-500/5 border border-amber-500/20 p-5">
            <button
              onClick={() => setShowUserList(!showUserList)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-white">User Accounts</h3>
                  <p className="text-[11px] text-slate-400">
                    {uniqueUsers.length} registered user{uniqueUsers.length !== 1 ? "s" : ""} • {totalProfiles} total profile{totalProfiles !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              {showUserList ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showUserList && (
              <div className="mt-4 space-y-2">
                {/* All Users filter */}
                <button
                  onClick={() => setAdminUserFilter("all")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-left ${
                    adminUserFilter === "all"
                      ? "bg-purple-600/10 border-purple-500/30 text-white"
                      : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold">All Users</span>
                    <p className="text-[10px] text-slate-500">{totalProfiles} profiles</p>
                  </div>
                </button>

                {/* Individual user filters */}
                {uniqueUsers.map((u) => (
                  <button
                    key={u.userId}
                    onClick={() => setAdminUserFilter(u.userId)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-left ${
                      adminUserFilter === u.userId
                        ? "bg-purple-600/10 border-purple-500/30 text-white"
                        : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold truncate block">
                        {u.userId.substring(0, 12)}...
                      </span>
                      <p className="text-[10px] text-slate-500">{u.count} profile{u.count !== 1 ? "s" : ""}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {isAdmin ? "Total Profiles (All Users)" : "My Profiles"}
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
            Loading profiles...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/30">
            <Smartphone className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Profiles Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              {isAdmin && adminUserFilter !== "all"
                ? "This user has no profiles yet."
                : "Try adjusting your search criteria or create a brand new profile."}
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
                  {/* Admin: Owner badge */}
                  {isAdmin && item.userId && (
                    <div className="flex items-center gap-1.5 mb-3 text-[10px] text-slate-500">
                      <UserIcon className="w-3 h-3" />
                      <span className="font-mono">Owner: {item.userId.substring(0, 12)}...</span>
                    </div>
                  )}

                  {/* Top Bar with Avatar & Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <LetterAvatar
                        name={item.name}
                        avatarUrl={item.avatarUrl}
                        className="w-12 h-12 text-sm"
                        shapeClass="rounded-2xl"
                        accentColor={item.themeSettings?.accentColor || "#8b5cf6"}
                        secondaryAccent={item.themeSettings?.secondaryAccent || "#06b6d4"}
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
