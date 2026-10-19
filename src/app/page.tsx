"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Zap,
  QrCode,
  ShieldCheck,
  Palette,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  ChevronRight,
  Wifi,
  Radio,
  Share2,
} from "lucide-react";

export default function HomePage() {
  const [selectedDemo, setSelectedDemo] = useState<"kaia" | "juan" | "acme">("kaia");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Navigation Bar */}
      <nav className="h-20 px-6 sm:px-12 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-purple-600/30">
            T
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white">TMaker</span>
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block -mt-1">
              NFC Digital Profiles
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-purple-400 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-purple-400 transition-colors">
            How It Works
          </a>
          <a href="#templates" className="hover:text-purple-400 transition-colors">
            Templates
          </a>
          <a href="#inquiry" className="hover:text-purple-400 transition-colors">
            Order NFC Cards
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors hidden sm:block"
          >
            Admin Dashboard
          </Link>
          <Link
            href="/editor/new"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>Create Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
        {/* Ambient Top Glow Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Left Hero Copy */}
        <div className="flex-1 flex flex-col items-start text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold mb-6">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Smart Contactless Profile System</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            One Tap. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-400">
              Your Entire Digital Presence.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-normal mt-5 max-w-xl leading-relaxed">
            Create, brand, and publish stunning responsive digital profile hubs for your customers. Link them to physical NFC business cards for instant contact sharing and engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8 w-full sm:w-auto">
            <Link
              href="/editor/new"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Create a Digital Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kaia"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>View KAIA Live Demo</span>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-slate-800/80 w-full max-w-md text-left">
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">0.2s</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Instant NFC Tap</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">100%</p>
              <p className="text-[11px] text-slate-400 mt-0.5">No App Required</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">1-Click</p>
              <p className="text-[11px] text-slate-400 mt-0.5">vCard Contact Save</p>
            </div>
          </div>
        </div>

        {/* Right Hero Interactive Phone Mockup */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center z-10">
          <div className="relative w-[340px] h-[640px] rounded-[44px] border-[8px] border-slate-900 bg-slate-950 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.35)] overflow-hidden flex flex-col">
            {/* Top Phone Notch */}
            <div className="h-6 w-full bg-slate-950 flex items-center justify-center">
              <div className="w-20 h-4 bg-slate-900 rounded-full" />
            </div>

            {/* Embedded Live Demo Iframe / Preview */}
            <iframe
              src="/kaia"
              title="KAIA Profile Live Demo"
              className="w-full flex-1 border-0 rounded-b-[36px]"
            />

            {/* Float Overlay Tap Badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/90 border border-purple-500/40 backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs font-bold text-purple-300 animate-bounce-slow">
              <Wifi className="w-3.5 h-3.5 text-cyan-400 rotate-90" />
              <span>Simulated NFC Tap</span>
            </div>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 sm:px-12 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Frictionless NFC Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            From Digital Studio to Real Physical Card
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-3">
            TMaker handles the entire lifecycle: create the profile, customize the client’s brand colors, and program the unique link into any standard NFC card.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full text-left">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-extrabold text-base mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white">Create & Brand Profile</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Choose from 3 layouts (Cyber Glow, Modern Bio, Executive Card). Pick or create custom corporate color combinations with real-time preview.
                </p>
              </div>
              <span className="text-[11px] font-mono text-purple-400 mt-4 block">
                &bull; Live 2-panel preview
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-base mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white">Publish Unique NFC URL</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Publish to a clean link like <code className="text-purple-300 font-mono">tmaker.com/company</code>. Generate high-res vector QR codes ready for printing.
                </p>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 mt-4 block">
                &bull; Instant QR SVG export
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-base mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white">Write & Tap Anywhere</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Write the URL to any NTAG213/215/216 NFC card with any smartphone. When a client taps your card, their profile opens instantly.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 mt-4 block">
                &bull; Compatible with iPhone & Android
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery Section */}
      <section id="templates" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Engineered Presets
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            3 Ready-to-Publish Layouts
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mt-3">
            Every template is fully dynamic and dynamically adapts to your customer’s corporate color scheme.
          </p>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 mt-6 p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedDemo("kaia")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDemo === "kaia"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Cyber Glow (KAIA)
            </button>
            <button
              onClick={() => setSelectedDemo("juan")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDemo === "juan"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Executive Card (Juan)
            </button>
            <button
              onClick={() => setSelectedDemo("acme")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDemo === "acme"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Modern Bio (Acme)
            </button>
          </div>
        </div>

        {/* Live Interactive Preview Container */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-2 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-xs">
              <span className="font-mono text-purple-300">
                tmaker.com/{selectedDemo}
              </span>
              <Link
                href={`/${selectedDemo}`}
                target="_blank"
                className="flex items-center gap-1 text-slate-400 hover:text-white"
              >
                <span>Full Screen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
            <iframe
              key={selectedDemo}
              src={`/${selectedDemo}`}
              title="Template Demo"
              className="w-full h-[580px] rounded-2xl border-0 bg-black"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 sm:px-12 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Features
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Everything Needed for a Commercial NFC Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Palette,
                title: "Theme Color Studio",
                desc: "Interactive hex color pickers, multi-stop gradient builders, and 9 industry brand combinations.",
              },
              {
                icon: Layers,
                title: "Two-Panel Live Editor",
                desc: "Instant zero-lag reactive smartphone preview updating immediately as you edit links and titles.",
              },
              {
                icon: Smartphone,
                title: "1-Tap vCard Downloads",
                desc: "Allow contacts to tap Save Contact and automatically import their details into phone contacts.",
              },
              {
                icon: QrCode,
                title: "Vector QR Generators",
                desc: "Download high-resolution SVG & PNG QR codes ready for high-end physical card printing.",
              },
              {
                icon: Zap,
                title: "Native App Deep-Links",
                desc: "Direct intent launches for Spotify, YouTube, and Instagram for faster smartphone interaction.",
              },
              {
                icon: ShieldCheck,
                title: "Draft & Reserved Route Protection",
                desc: "Guards against private drafts being viewed publicly, with strict reservation on dashboard routes.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800/80 shadow-lg flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section id="inquiry" className="py-20 px-6 sm:px-12 max-w-5xl mx-auto w-full text-center">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Build Your Client Profiles?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mt-3 leading-relaxed">
            Log in to the TMaker admin dashboard to start creating, editing, and publishing digital profile pages.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
            >
              <span>Open Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/editor/new"
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
            >
              Create New Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-20 px-6 sm:px-12 border-t border-slate-800/80 bg-slate-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} TMaker — NFC Digital Profile Studio. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0 font-medium">
          <Link href="/dashboard" className="hover:text-slate-300">
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-slate-300">
            Admin Login
          </Link>
          <Link href="/kaia" className="hover:text-slate-300">
            Demo Profile
          </Link>
        </div>
      </footer>
    </div>
  );
}
