"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, Plus, FileText, CheckCircle2 } from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = "Dashboard",
  subtitle = "INFOWEAVE AI / WORKSPACE",
}: HeaderProps) {
  const { sourceTitle, llmMode, setLlmMode } = useTransformation();

  return (
    <header className="px-8 py-4 flex items-center justify-between border-b border-[#edf0f4] bg-white/80 backdrop-blur-md sticky top-0 z-20">
      <div>
        <p className="text-[10px] font-bold text-slate-400 tracking-[0.16em] uppercase">
          {subtitle}
        </p>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Active Source indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 max-w-sm truncate text-xs text-slate-600">
          <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate font-medium">{sourceTitle}</span>
        </div>

        {/* Engine status indicator */}
        <button
          type="button"
          onClick={() => setLlmMode(llmMode === "ollama" ? "fallback" : "ollama")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition-all ${
            llmMode === "ollama"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-indigo-50 text-indigo-700 border-indigo-200"
          }`}
          title="Click to toggle Ollama / Neural Fallback mode"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>{llmMode === "ollama" ? "Ollama Local LLM" : "Neural Fallback Engine"}</span>
        </button>

        {/* Start New Transformation CTA */}
        <Link
          href="/source-content"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-indigo-400" />
          <span>New Transformation</span>
        </Link>
      </div>
    </header>
  );
}
