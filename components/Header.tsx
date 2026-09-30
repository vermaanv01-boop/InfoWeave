"use client";

import React, { useState } from "react";
import { Search, Bell, Share2, Shield, User } from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = "Good morning.",
  subtitle = "THURSDAY, SEPTEMBER 24, 2026",
}: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationCount, setNotificationCount] = useState(1);

  return (
    <header className="px-8 py-5 flex items-center justify-between border-b border-[#edf0f4] bg-white/70 backdrop-blur-xs sticky top-0 z-20">
      <div>
        <p className="text-[11px] font-semibold text-slate-400 tracking-[0.15em] uppercase">
          {subtitle}
        </p>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search toggle / input */}
        <div className="relative">
          {showSearch ? (
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search findings, telemetry, reports..."
                className="text-xs outline-hidden text-slate-700 w-56 bg-transparent"
                autoFocus
                onBlur={() => {
                  if (!searchTerm) setShowSearch(false);
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              aria-label="Search"
              className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => {
            alert("Security Alerts: 1 new critical alert contained (SNS-IR-2026-024).");
            setNotificationCount(0);
          }}
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-xs relative transition-colors"
        >
          <Bell className="w-4 h-4" />
          {notificationCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
          )}
        </button>

        {/* Export / Share */}
        <button
          type="button"
          onClick={() => {
            alert("Content Package exported as verified JSON & Markdown.");
          }}
          aria-label="Export or Share"
          className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-xs transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Profile pill */}
        <div className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full border border-slate-200/90 bg-white shadow-xs">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-slate-800">
            Security Analyst
          </span>
        </div>
      </div>
    </header>
  );
}
