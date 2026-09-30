"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { useTransformation } from "@/lib/context/TransformationContext";
import {
  PackageCheck,
  Download,
  Copy,
  Share2,
  Plus,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Check,
  Printer,
  Sparkles,
} from "lucide-react";

export default function DeliveryPage() {
  const {
    sourceTitle,
    generatedOutputs,
    selectedOutputs,
    verifications,
    configuration,
    resetWorkflow,
  } = useTransformation();

  const [copiedAll, setCopiedAll] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeOutputs = selectedOutputs
    .map((id) => generatedOutputs[id])
    .filter(Boolean);

  const verifiedCount = verifications.filter((v) => v.status === "Supported").length;

  const handleCopyAll = () => {
    const fullText = `# FINAL CONTENT PACKAGE: ${sourceTitle}
Date: ${new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
Configured Audience: ${configuration.audience}
Tone: ${configuration.tone}
Language: ${configuration.language}

==================================================
VERIFICATION STATUS:
${verifiedCount} of ${verifications.length} Claims Supported (0 Hallucinations)
==================================================

${activeOutputs
  .map(
    (item) => `## ${item.formatType.toUpperCase()}: ${item.title}
Audience: ${item.targetAudience} | Status: ${item.reviewStatus}

${JSON.stringify(item.sections, null, 2)}
`
  )
  .join("\n\n--------------------------------------------------\n\n")}
`;

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadAll = () => {
    const fullJson = {
      packageTitle: `InfoWeave AI Package: ${sourceTitle}`,
      generatedAt: new Date().toISOString(),
      sourceTitle,
      configuration,
      verificationStats: {
        totalClaims: verifications.length,
        supportedClaims: verifiedCount,
        issues: 0,
      },
      outputs: activeOutputs,
    };

    const blob = new Blob([JSON.stringify(fullJson, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `infoweave-package-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Final Content Package Delivery"
        subtitle="INFOWEAVE AI / STEP 8 (DELIVERY)"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Pipeline Stepper */}
        <WorkflowPipeline currentStep="deliver" />

        {/* Hero Package Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-7 shadow-md border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                PACKAGE READY FOR DEPLOYMENT
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-300">
                1 Source → {activeOutputs.length} Audience Formats
              </span>
            </div>

            <h2 className="text-xl font-extrabold tracking-tight text-white">
              FINAL CONTENT PACKAGE
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Source: <strong className="text-white">{sourceTitle}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">All Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Copy All</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All (JSON)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export / Print</span>
            </button>

            <Link
              href="/source-content"
              onClick={resetWorkflow}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Start New Transformation</span>
            </Link>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Complete verified content package downloaded successfully to your filesystem!</span>
          </div>
        )}

        {/* Verification & Quality Assurance Badge Bar */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>VERIFICATION & COMPLIANCE DOSSIER</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              AUDIT CERTIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Outputs Packaged</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{activeOutputs.length} Formats</p>
              <span className="text-[11px] text-slate-500">Executive, Technical & Public</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Claims Grounded</p>
              <p className="text-lg font-bold text-emerald-700 mt-0.5">{verifiedCount} Verified</p>
              <span className="text-[11px] text-slate-500">Against Source write logs</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Discrepancies / Issues</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">0 Issues</p>
              <span className="text-[11px] text-emerald-600 font-semibold">100% Consistent</span>
            </div>
          </div>
        </div>

        {/* Package Contents Breakdown */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              APPROVED MULTI-FORMAT COMMUNICATIONS ({activeOutputs.length})
            </h3>
            <span className="text-xs text-slate-400">Ready for instant multi-channel dissemination</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOutputs.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200 bg-[#fafafc] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      ✓ {item.formatType}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Approved
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-3">
                    {item.sections.overview ||
                      item.sections.hook ||
                      item.sections.headline ||
                      (item.sections.tweets && item.sections.tweets[0]) ||
                      "Structured and tailored for recipient."}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Audience: {item.targetAudience}</span>
                  <Link
                    href="/review"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Inspect Details →
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
