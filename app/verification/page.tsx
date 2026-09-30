"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import {
  verificationClaimsData,
  formatConsistenciesData,
  VerificationClaim,
} from "@/data/generatedContent";
import { incidentReportData } from "@/data/incidentReport";
import {
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Check,
  AlertCircle,
  Eye,
  ArrowRight,
  Lock,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function VerificationPage() {
  const [claims, setClaims] = useState<VerificationClaim[]>(verificationClaimsData);
  const [isApproved, setIsApproved] = useState(false);
  const [reviewModalClaim, setReviewModalClaim] = useState<VerificationClaim | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const categories = ["ALL", "Timeline", "Key Findings", "Impact & Records", "Remediation"];

  const filteredClaims = filterCategory === "ALL"
    ? claims
    : claims.filter((c) => c.category === filterCategory);

  const handleApproveAll = () => {
    setIsApproved(true);
  };

  const handleToggleClaimStatus = (id: string) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "VERIFIED" ? "NEEDS_REVIEW" : "VERIFIED";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Verification & Consistency"
        subtitle="WORKSPACE / VERIFICATION"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Verification Status Banner */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                Grounding & Cross-Format Verification
              </h2>
              {isApproved ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#111827] text-white flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  APPROVED & LOCKED
                </span>
              ) : (
                <StatusBadge status="VERIFIED" />
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every synthesized claim is verified against logged telemetry and forensic assessment.
              Zero hallucinations detected across all 7 generated formats.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setReviewModalClaim(claims[0])}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
            >
              Review Content
            </button>

            <button
              type="button"
              onClick={handleApproveAll}
              disabled={isApproved}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all ${
                isApproved
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-[#111827] text-white hover:bg-slate-800 active:scale-95"
              }`}
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isApproved ? "Content Approved" : "Approve Content"}</span>
            </button>

            {isApproved && (
              <Link
                href="/provenance"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                <span>View Provenance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Section 1: CONTENT VERIFICATION (Claims compared against source) */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#f1f4f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                GROUND TRUTH CHECK
              </p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                CONTENT VERIFICATION
              </h3>
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterCategory === cat
                      ? "bg-[#111827] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-[#fafafc]">
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CLAIM EXTRACTED FROM OUTPUT
                  </th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SOURCE INTELLIGENCE REFERENCE
                  </th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                    CONFIDENCE
                  </th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {filteredClaims.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    <td className="py-3.5 px-6 max-w-md">
                      <p className="text-xs font-semibold text-slate-900 leading-snug">
                        "{item.claim}"
                      </p>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 inline-block">
                        Scope: {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium">{item.source}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.confidence}%
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setReviewModalClaim(item)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: CROSS-FORMAT CONSISTENCY */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#f1f4f8] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                CROSS-CHANNEL ALIGNMENT
              </p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                CROSS-FORMAT CONSISTENCY
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All 7 formats aligned with zero conflicting claims
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {formatConsistenciesData.map((item) => (
                <div
                  key={item.format}
                  className="bg-[#fafafc] border border-slate-100 hover:border-slate-200 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {item.format}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        0 Discrepancies
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#e8f8f0] text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                    ✓ CONSISTENT
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {reviewModalClaim && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                Claim Evidence Audit
              </h4>
              <StatusBadge status={reviewModalClaim.status} />
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Generated Claim
                </p>
                <p className="text-xs font-semibold text-slate-900 mt-1 bg-[#fafafc] p-3 rounded-xl border border-slate-100">
                  "{reviewModalClaim.claim}"
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Incident Ground Truth Source
                </p>
                <p className="text-xs text-slate-700 mt-1 font-medium">
                  {reviewModalClaim.source}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Grounding Assessment
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Verified against {incidentReportData.organization} primary incident log telemetry.
                  No contradictory statements detected across any communication formats.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  handleToggleClaimStatus(reviewModalClaim.id);
                  setReviewModalClaim(null);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Toggle Status
              </button>

              <button
                type="button"
                onClick={() => setReviewModalClaim(null)}
                className="px-4 py-1.5 rounded-xl bg-[#111827] text-white text-xs font-semibold hover:bg-slate-800"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
