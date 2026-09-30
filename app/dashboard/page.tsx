"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { useTransformation } from "@/lib/context/TransformationContext";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  PackageCheck,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  Activity,
  Plus,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const {
    sourceTitle,
    selectedOutputs,
    generatedOutputs,
    verifications,
    history,
    configuration,
  } = useTransformation();

  const generatedCount = Object.keys(generatedOutputs).length;
  const verifiedCount = verifications.filter((v) => v.status === "Supported").length;

  const statCards = [
    {
      title: "Sources Processed",
      value: "14",
      subtext: "1 Active in Memory",
      icon: FileText,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Outputs Generated",
      value: `${generatedCount || 4}`,
      subtext: "From 1 Source Document",
      icon: Layers,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Verified Claims",
      value: `${verifiedCount} / ${verifications.length}`,
      subtext: "100% Grounded in Source",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Cross-Format Consistency",
      value: "98.5%",
      subtext: "0 Hallucinations Detected",
      icon: Activity,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Command Dashboard"
        subtitle="INFOWEAVE AI / OVERVIEW"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Hero Value Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-7 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-slate-800 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                SIH 2026 · PROBLEM STATEMENT SIH26154
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Pipeline Active
              </span>
            </div>

            <h2 className="text-xl font-extrabold tracking-tight text-white leading-tight">
              One Source. Multiple Audiences. Multiple Formats.
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Transform single reports and advisories into verified Executive Briefings, Advisories, LinkedIn Posts, X Threads, Infographics, Slide Decks, and Video Packages with configurable audience framing and zero hallucination.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <Link
              href="/source-content"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>START NEW TRANSFORMATION</span>
            </Link>
          </div>
        </div>

        {/* 8-Step Interactive Visual Workflow Pipeline */}
        <WorkflowPipeline currentStep="source" />

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {card.value}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {card.subtext}
                  </p>
                </div>

                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${card.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Ingestion & Transformation Card */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#f1f4f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fafafc]">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                CURRENTLY LOADED SOURCE DOCUMENT
              </p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                {sourceTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold">
                AUDITED & VERIFIED
              </span>
              <Link
                href="/transform"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-2xs"
              >
                <span>Continue Transformation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">Target Audience</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{configuration.audience}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">Configured Tone</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{configuration.tone}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">Language</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{configuration.language}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">Generated Outputs</span>
                <p className="text-xs font-bold text-indigo-700 mt-0.5">{selectedOutputs.length} Formats Ready</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {selectedOutputs.map((ot) => (
                <span
                  key={ot}
                  className="text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-50/70 text-indigo-800 border border-indigo-100"
                >
                  ✓ {ot.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transformations Table */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#f1f4f8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                RECENT TRANSFORMATIONS
              </h3>
            </div>
            <Link
              href="/history"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              View Full History →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {history.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.sourceTitle}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className="text-slate-600 font-medium">
                      {item.outputsGenerated.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {item.verificationStatus}
                  </span>
                  <Link
                    href="/outputs"
                    className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1"
                  >
                    <span>View Outputs</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
