"use client";

import React from "react";
import Link from "next/link";
import {
  Brain,
  Target,
  FileCheck,
  Tag,
  Boxes,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";

export function ContentUnderstandingCard() {
  const { analysis, isAnalyzing } = useTransformation();

  if (!analysis) {
    return (
      <div className="bg-white border border-[#e8ecf1] rounded-2xl p-8 text-center shadow-xs">
        <Brain className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <p className="text-xs font-bold text-slate-700">No Content Analysis Yet</p>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Click &ldquo;Analyze Content&rdquo; above to extract context, intent, entities, and grounded claims from your source.
        </p>
      </div>
    );
  }

  return (
    <div
      id="understanding"
      className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                CONTENT UNDERSTANDING (AI ANALYSIS)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                Extracted
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Structured representation of source intent, entities, and verifiable claims
            </p>
          </div>
        </div>

        <Link
          href="/transform"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-98 self-start sm:self-auto"
        >
          <span>Configure & Transform</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid: Context & Intent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Context */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Context
            </h4>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {analysis.context}
          </p>
        </div>

        {/* Intent */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Intent
            </h4>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {analysis.intent}
          </p>
        </div>
      </div>

      {/* Key Information & Claims */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Information ({analysis.key_information.length})
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.key_information.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-700 flex items-start gap-2.5 font-medium bg-slate-50/60 p-2.5 rounded-lg border border-slate-100/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Claims */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Grounded Claims for Verification ({analysis.claims.length})
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.claims.map((claim, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-700 flex items-start gap-2.5 font-medium bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/60"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>{claim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Topics & Entities Pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Extracted Topics
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.topics.map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Boxes className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Identified Entities
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.entities.map((e) => (
              <span
                key={e}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
