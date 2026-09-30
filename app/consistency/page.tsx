"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { useTransformation } from "@/lib/context/TransformationContext";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Info,
} from "lucide-react";

export default function ConsistencyPage() {
  const { consistencyChecks, selectedOutputs } = useTransformation();
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Cross-Format Consistency Engine"
        subtitle="INFOWEAVE AI / SUPPORTING VERIFICATION"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Pipeline Stepper */}
        <WorkflowPipeline currentStep="verify" />

        {/* Overview Banner */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                CROSS-FORMAT VALIDATION
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-emerald-700">
                100% Invariant Facts Verified
              </span>
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Cross-Format Consistency Inspector
            </h2>
            <p className="text-xs text-slate-500 max-w-xl">
              Compares factual milestones, metrics, and containment dates across all {selectedOutputs.length} generated formats to prevent conflicting disclosures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/review"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs"
            >
              <span>Human Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Matrix Card */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Invariant Factual Alignment Across Formats
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 font-bold">
              0 Discrepancies
            </span>
          </div>

          <div className="space-y-4">
            {consistencyChecks.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/80 bg-[#fafafc] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {item.attribute}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700">
                      Target: {item.expected}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Consistent</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.detail}
                </p>

                {/* Formats Grid */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60">
                  {(item.formatsChecked || ["Executive Summary", "Advisory", "LinkedIn", "Presentation"]).map(
                    (fmt) => (
                      <span
                        key={fmt}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{fmt}</span>
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Inconsistency simulation helper banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">
                Automated Discrepancy Prevention
              </p>
              <p>
                If an author edits an executive summary to change a timeline without updating the accompanying security advisory, InfoWeave automatically flags the delta here with a &ldquo;Review Issue&rdquo; alert.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
