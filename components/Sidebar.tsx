"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Layers,
  ShieldCheck,
  Activity,
  UserCheck,
  PackageCheck,
  History,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";

export function Sidebar() {
  const pathname = usePathname();
  const { llmMode, setLlmMode, loadSampleDocument } = useTransformation();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Source Content",
      href: "/source-content",
      icon: FileText,
      badge: "Input",
    },
    {
      name: "Transformation",
      href: "/transform",
      icon: Sparkles,
      badge: "AI",
    },
    {
      name: "Generated Outputs",
      href: "/outputs",
      icon: Layers,
      badge: "7 Types",
    },
    {
      name: "Verification",
      href: "/verification",
      icon: ShieldCheck,
      badge: "Grounding",
    },
    {
      name: "Consistency Check",
      href: "/consistency",
      icon: Activity,
      badge: null,
    },
    {
      name: "Human Review",
      href: "/review",
      icon: UserCheck,
      badge: "Audit",
    },
    {
      name: "Final Package",
      href: "/delivery",
      icon: PackageCheck,
      badge: "Export",
    },
    {
      name: "History",
      href: "/history",
      icon: History,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 min-w-[16rem] bg-white border-r border-[#e8ecf1] flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand header */}
        <div className="p-5 pb-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-indigo-400 shadow-sm flex-shrink-0 border border-slate-800">
            <svg
              className="w-5 h-5 text-indigo-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                INFOWEAVE
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                AI
              </span>
            </div>
            <p className="text-[9.5px] tracking-wider text-slate-400 font-semibold uppercase mt-0.5">
              Automated Content Transformation
            </p>
          </div>
        </div>

        {/* SIH Tagline Card */}
        <div className="px-4 py-2">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span>SIH 2026</span>
              <span className="text-indigo-600 font-mono">SIH26154</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-800 leading-snug">
              One Source → Multiple Formats
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="mt-2 px-3 flex-1">
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-[0.16em] uppercase">
            WORKFLOW STAGES
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/dashboard" && pathname === "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive
                          ? "text-indigo-400"
                          : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && !isActive && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span
                        aria-label="Current page indicator"
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer: AI Engine Status & Quick Preset */}
      <div className="p-3.5 border-t border-[#edf0f4] bg-slate-50/60 space-y-2.5">
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px] font-semibold text-slate-700">AI Engine:</span>
          </div>
          <button
            type="button"
            onClick={() => setLlmMode(llmMode === "ollama" ? "fallback" : "ollama")}
            title="Click to toggle Ollama / Neural Fallback mode"
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
              llmMode === "ollama"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-indigo-50 text-indigo-700 border-indigo-200"
            }`}
          >
            {llmMode === "ollama" ? "🟢 Ollama LLM" : "🟣 Neural Fallback"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            loadSampleDocument();
            alert("Loaded SIH Demo: CERT-IN-2026-0842 Incident Advisory report.");
          }}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-semibold shadow-2xs transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-indigo-600" />
          <span>Load SIH Demo Preset</span>
        </button>
      </div>
    </aside>
  );
}
