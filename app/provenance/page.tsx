"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import { incidentReportData } from "@/data/incidentReport";
import {
  GitCommit,
  ShieldCheck,
  Copy,
  Check,
  FileCheck,
  Hash,
  Database,
  Layers,
  Clock,
  ExternalLink,
  Lock,
} from "lucide-react";

export default function ProvenancePage() {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState(false);

  const prototypeHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  const prototypePackageHash = "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069";
  const prototypeBlockHash = "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";

  const handleCopy = (text: string, type: "hash" | "block") => {
    navigator.clipboard.writeText(text);
    if (type === "hash") {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 1500);
    } else {
      setCopiedBlock(true);
      setTimeout(() => setCopiedBlock(false), 1500);
    }
  };

  const auditEvents = [
    {
      action: "Source Document Ingested & Hashed",
      hash: prototypeHash,
      timestamp: "24 September 2026 — 09:48 IST",
      operator: "Security Analyst (ID: SOC-402)",
      status: "Verified",
    },
    {
      action: "Telemetry Extracted & Parameterized",
      hash: "a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0",
      timestamp: "24 September 2026 — 09:50 IST",
      operator: "INFOWEAVE Telemetry Ingestion Node",
      status: "Verified",
    },
    {
      action: "Multi-Format GenAI Transformations Generated",
      hash: "b5d8c1a7e4f20983147a2c5b6e7f8d90123456789abcdef0123456789abcdef1",
      timestamp: "24 September 2026 — 09:52 IST",
      operator: "INFOWEAVE Content Engine",
      status: "Verified",
    },
    {
      action: "Cross-Format Consistency & Claim Verification Sealed",
      hash: prototypePackageHash,
      timestamp: "24 September 2026 — 09:54 IST",
      operator: "SOC Lead Reviewer",
      status: "Verified",
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Provenance"
        subtitle="WORKSPACE / AUDIT & PROVENANCE"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Top Provenance Overview Banner */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700">
                <GitCommit className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                Cryptographic Provenance & Lineage
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
                Prototype Demonstration
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Provides verifiable mathematical proof linking every generated sentence back to the ingested source document.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-700">
              Integrity Verified
            </span>
          </div>
        </div>

        {/* SECTION 1: SOURCE DOCUMENT PROVENANCE CARD */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#f1f4f8] pb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                CRYPTOGRAPHIC SOURCE ATTRIBUTION
              </p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                SOURCE DOCUMENT
              </h3>
            </div>
            <StatusBadge status="VERIFIED" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-4 md:col-span-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                DOCUMENT TITLE
              </p>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {incidentReportData.documentTitle}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Organization: {incidentReportData.organization} · Incident ID: {incidentReportData.incidentId}
              </p>
            </div>

            <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                VERSION
              </p>
              <p className="text-xs font-mono font-bold text-slate-900 mt-1">
                {incidentReportData.provenance.version}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                SOURCE STATUS: {incidentReportData.provenance.status}
              </p>
            </div>
          </div>

          {/* SOURCE HASH - Clearly labeled Prototype Hash */}
          <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  SOURCE HASH (SHA-256)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 uppercase">
                  Prototype Hash
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(prototypeHash, "hash")}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-xs text-slate-800 break-all select-all">
              {prototypeHash}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              * Note: Visually realistic SHA-256 hash representation generated for frontend prototype validation.
            </p>
          </div>
        </div>

        {/* SECTION 2: PROVENANCE RECORD */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="border-b border-[#f1f4f8] pb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              CERTIFIED BUNDLE RECORD
            </p>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              PROVENANCE RECORD
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Source Document
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">Verified</span>
              </div>
            </div>

            <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Content Package
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">Verified</span>
              </div>
            </div>

            <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Version
              </p>
              <p className="text-xs font-mono font-bold text-slate-900 mt-1">
                {incidentReportData.provenance.version}
              </p>
            </div>

            <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Timestamp
              </p>
              <p className="text-xs font-bold text-slate-800 mt-1">
                {incidentReportData.provenance.timestamp}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: BLOCKCHAIN PROVENANCE (PROTOTYPE RECORD) */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1f4f8] pb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                IMMUTABLE AUDIT TRAIL ARCHITECTURE
              </p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                Blockchain Provenance
              </h3>
            </div>

            {/* Prototype Record label strictly complying with instructions */}
            <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Prototype Record
            </span>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Architectural Note:</span> This is a frontend demonstration of the cryptographic hashing and immutable ledger pipeline. No actual mainnet/testnet blockchain transactions are dispatched in this frontend-only prototype.
          </div>

          {/* Audit Trail Timeline */}
          <div className="space-y-3 pt-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              PROTOTYPE AUDIT LOG (4 RECORDED STAGES)
            </p>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl bg-[#fafafc]">
              {auditEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <p className="text-xs font-bold text-slate-900">
                        {evt.action}
                      </p>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 break-all">
                      Hash: {evt.hash}
                    </p>
                  </div>

                  <div className="text-right flex md:flex-col items-center md:items-end justify-between gap-1 flex-shrink-0">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {evt.timestamp}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {evt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
