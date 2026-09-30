"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import { incidentReportData } from "@/data/incidentReport";
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  GitCommit,
  ArrowRight,
  ShieldAlert,
  Server,
  Calendar,
  Layers,
  Activity,
  FileCheck,
  Check,
} from "lucide-react";

export default function DashboardPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const workflowCards = [
    {
      title: "Source Intelligence",
      description: "Incident telemetry, entities, timeline & key findings",
      status: "Extracted",
      statusType: "CONTAINED",
      meta: "10 Parameters · 6 Key Findings",
      href: "/source-intelligence",
      icon: FileText,
    },
    {
      title: "Transform",
      description: "GenAI multi-format communications transformer",
      status: "7 Formats",
      statusType: "AI SUMMARY READY",
      meta: "Executive, Technical & Public formats",
      href: "/transform",
      icon: Sparkles,
    },
    {
      title: "Verification",
      description: "Claim grounding & cross-format consistency engine",
      status: "100% Consistent",
      statusType: "VERIFIED",
      meta: "8 Claims Checked · 0 Hallucinations",
      href: "/verification",
      icon: CheckCircle2,
    },
    {
      title: "Provenance",
      description: "Cryptographic hash audit trail & version tracking",
      status: "Verified Hash",
      statusType: "NORMAL",
      meta: "Prototype SHA-256 Ledger Record",
      href: "/provenance",
      icon: GitCommit,
    },
  ];

  const workflowPipeline = [
    { name: "SOURCE DOCUMENT", active: true },
    { name: "SOURCE INTELLIGENCE", active: true },
    { name: "TRANSFORMATION", active: true },
    { name: "GENERATED OUTPUTS", active: true },
    { name: "VERIFICATION", active: true },
    { name: "PROVENANCE", active: true },
  ];

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Dashboard"
        subtitle="WORKSPACE / CYBER INTELLIGENCE"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Workspace Ingestion & Processing Status Banner */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                INFOWEAVE
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                · Source-Processing Workspace
              </span>
              <StatusBadge status="PROCESSING COMPLETE" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              Currently loaded document:{" "}
              <strong className="text-slate-800 font-semibold">
                {incidentReportData.documentTitle}
              </strong>
              . Extracted telemetry and grounded claims are active in memory.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111827] text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Source Document</span>
            </button>

            <Link
              href="/source-intelligence"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <span>View Source Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Linear Workflow Visual Pipeline (Inspired by Image 1 & 2 design) */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              END-TO-END INTELLIGENCE PIPELINE
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Pipeline Online
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {workflowPipeline.map((step, idx) => (
              <React.Fragment key={step.name}>
                <div
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider whitespace-nowrap transition-colors ${
                    idx === 0 || idx === 1
                      ? "bg-[#111827] text-white shadow-xs"
                      : "bg-[#f8fafc] text-slate-700 border border-slate-200/80"
                  }`}
                >
                  {step.name}
                </div>
                {idx < workflowPipeline.length - 1 && (
                  <span className="text-slate-300 font-bold px-1 select-none">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4 Useful Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-white border border-[#e8ecf1] hover:border-slate-300 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <StatusBadge status={card.status} />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">
                    {card.meta}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Currently Loaded Document Detail Section */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#f1f4f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                ACTIVE WORKSPACE DOCUMENT
              </p>
              <h2 className="text-sm font-bold text-slate-900 mt-0.5">
                {incidentReportData.documentTitle}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">
                Incident ID:
              </span>
              <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-md text-slate-800">
                {incidentReportData.incidentId}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Target System
                </p>
                <p className="text-xs font-bold text-slate-800 mt-1">
                  {incidentReportData.affectedSystem}
                </p>
              </div>
              <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Account
                </p>
                <p className="text-xs font-bold text-slate-800 mt-1">
                  {incidentReportData.affectedAccount}
                </p>
              </div>
              <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Initial Severity
                </p>
                <p className="text-xs font-bold text-rose-600 mt-1">
                  {incidentReportData.initialSeverity}
                </p>
              </div>
              <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Containment
                </p>
                <p className="text-xs font-bold text-emerald-700 mt-1">
                  {incidentReportData.currentStatus}
                </p>
              </div>
            </div>

            {/* Quick telemetry highlight */}
            <div>
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                Key Incident Findings (6)
              </h4>
              <ul className="space-y-2">
                {incidentReportData.keyFindings.map((finding, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-600 flex items-start gap-2.5 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-6 py-4 bg-[#fafafc] border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Evidence Audited: Authentication Logs, Application Logs, Monitoring Alerts & Investigation Notes.
            </span>
            <Link
              href="/transform"
              className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 transition-colors"
            >
              <span>Transform to 7 Formats</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Upload Source Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">
              Upload Source Document
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select or drop an incident report (PDF, Markdown, or JSON) to ingest into INFOWEAVE.
            </p>

            <div className="mt-4 border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl p-6 text-center cursor-pointer transition-colors relative">
              <input
                type="file"
                onChange={handleUploadSimulate}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Click to browse or drag file here
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Currently loaded: {incidentReportData.documentTitle}
              </p>
            </div>

            {uploadSuccess && (
              <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Document ingested and telemetry parsed successfully!</span>
              </div>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
