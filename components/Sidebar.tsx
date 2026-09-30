"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  FileText,
  Sparkles,
  CheckCircle2,
  GitCommit,
  ShieldCheck,
  LogOut,
  Sliders,
  HelpCircle,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Source Intelligence",
      href: "/source-intelligence",
      icon: FileText,
    },
    {
      name: "Transform",
      href: "/transform",
      icon: Sparkles,
    },
    {
      name: "Verification",
      href: "/verification",
      icon: CheckCircle2,
    },
    {
      name: "Provenance",
      href: "/provenance",
      icon: GitCommit,
    },
  ];

  return (
    <aside className="w-64 min-w-[16rem] bg-white border-r border-[#e8ecf1] flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      <div>
        {/* Brand header */}
        <div className="p-5 pb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#111827] flex items-center justify-center text-emerald-400 shadow-xs flex-shrink-0">
            {/* Waveform ECG pulse icon */}
            <svg
              className="w-5 h-5 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-wide leading-tight">
              INFOWEAVE
            </h1>
            <p className="text-[10px] tracking-[0.16em] text-slate-400 font-semibold uppercase">
              CYBER INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Workspace Card */}
        <div className="px-4 py-2">
          <div className="bg-white border border-[#edf0f4] rounded-2xl p-3 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-bold text-slate-800 truncate">
                Cyber Workspace
              </h2>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                INFOWEAVE
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="mt-4 px-3">
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase">
            WORKSPACE
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
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#111827] text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {isActive && (
                    <span
                      aria-label="Current page indicator"
                      className="w-2 h-2 rounded-full bg-[#10b981] flex-shrink-0"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[#edf0f4]">
        <div className="flex items-start gap-2.5 px-2 py-2 mb-2 text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Cyber workspace
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              Secure decision-support environment
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            alert("Signed out from INFOWEAVE secure session.");
          }}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-400" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
