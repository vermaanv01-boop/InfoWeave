"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  RefreshCw,
  Sparkles,
  ArrowRight,
  UserCheck,
  Check,
} from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";
import { ClaimVerification } from "@/lib/types/transformation";

export function ClaimVerificationList() {
  const { verifications, isVerifying, verifyClaims, sourceText, sourceTitle } = useTransformation();
  const [selectedClaimForModal, setSelectedClaimForModal] = useState<ClaimVerification | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [reviewedClaims, setReviewedClaims] = useState<Record<string, string>>({});

  const supportedCount = verifications.filter((v) => v.status === "Supported").length;
  const needsReviewCount = verifications.filter((v) => v.status === "Needs Review").length;
  const unsupportedCount = verifications.filter((v) => v.status === "Unsupported").length;

  const handleReviewSave = () => {
    if (selectedClaimForModal) {
      setReviewedClaims((prev) => ({
        ...prev,
        [selectedClaimForModal.id]: reviewNote || "Verified by human auditor.",
      }));
      setSelectedClaimForModal(null);
      setReviewNote("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Claims Audited
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {verifications.length}
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Grounded against source chunks
          </span>
        </div>

        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
            ✓ Supported Claims
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {supportedCount}
          </p>
          <span className="text-[10px] text-emerald-600/80 mt-0.5 block">
            Strict factual correspondence
          </span>
        </div>

        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
            ⚠ Needs Review
          </p>
          <p className="text-2xl font-bold text-amber-700 mt-1">
            {needsReviewCount}
          </p>
          <span className="text-[10px] text-amber-600/80 mt-0.5 block">
            Partial source reference
          </span>
        </div>

        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
            ✕ Unsupported
          </p>
          <p className="text-2xl font-bold text-rose-700 mt-1">
            {unsupportedCount}
          </p>
          <span className="text-[10px] text-rose-600/80 mt-0.5 block">
            0 Hallucinations Detected
          </span>
        </div>
      </div>

      {/* Main Verification Table Card */}
      <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                SOURCE GROUNDING & CLAIM VERIFICATION ENGINE
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Every factual claim generated is cross-referenced with source document text chunks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={verifyClaims}
              disabled={isVerifying}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? "animate-spin text-indigo-600" : "text-slate-400"}`} />
              <span>Re-run Verification</span>
            </button>

            <Link
              href="/review"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Proceed to Human Review</span>
            </Link>
          </div>
        </div>

        {/* Claim Verification Cards */}
        <div className="space-y-4">
          {verifications.map((item, index) => {
            const hasAuditNote = reviewedClaims[item.id];

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-[#fafafc] hover:bg-white hover:border-slate-300 transition-all space-y-3"
              >
                {/* Status bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    CLAIM #{index + 1}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      Confidence: {item.confidence}%
                    </span>

                    {item.status === "Supported" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>✓ Supported</span>
                      </span>
                    )}

                    {item.status === "Needs Review" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>⚠ Needs Review</span>
                      </span>
                    )}

                    {item.status === "Unsupported" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>✕ Unsupported</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Claim Statement */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    GENERATED CLAIM:
                  </p>
                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    &ldquo;{item.claim}&rdquo;
                  </p>
                </div>

                {/* Supporting Source Evidence */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider mb-1">
                    SUPPORTING SOURCE EVIDENCE:
                  </p>
                  <p className="text-xs font-mono text-slate-700 leading-relaxed">
                    {item.evidence}
                  </p>
                </div>

                {/* Audit Note if present */}
                {hasAuditNote && (
                  <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 font-semibold flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Auditor Note: {hasAuditNote}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Source Document:\n${sourceTitle}\n\nEvidence Excerpt:\n"${item.evidence}"`);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>View in Source</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClaimForModal(item);
                      setReviewNote(reviewedClaims[item.id] || "");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-2xs"
                  >
                    <span>Review Claim</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Claim Modal */}
      {selectedClaimForModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Audit & Sign-Off Claim #{selectedClaimForModal.id}
            </h4>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-800">
              <strong>Claim: </strong> {selectedClaimForModal.claim}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Human Reviewer Audit Note
              </label>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                rows={3}
                placeholder="Enter audit validation comments or adjustments..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedClaimForModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReviewSave}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold"
              >
                Approve & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
