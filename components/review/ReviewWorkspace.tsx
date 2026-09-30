"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserCheck,
  CheckCircle2,
  RefreshCw,
  XCircle,
  MessageSquare,
  FileText,
  Edit3,
  Check,
  PackageCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";
import { OutputFormatId, GeneratedOutput } from "@/lib/types/transformation";

export function ReviewWorkspace() {
  const {
    sourceText,
    sourceTitle,
    generatedOutputs,
    selectedOutputs,
    activeReviewFormat,
    setActiveReviewFormat,
    updateOutputContent,
    setReviewStatus,
    regenerateSingleOutput,
    isGenerating,
  } = useTransformation();

  const currentItem = generatedOutputs[activeReviewFormat];

  // Local editable text buffer
  const [editableJson, setEditableJson] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [saveFeedback, setSaveFeedback] = useState(false);

  useEffect(() => {
    if (currentItem) {
      setEditableJson(JSON.stringify(currentItem.sections, null, 2));
    }
  }, [activeReviewFormat, currentItem]);

  const handleSaveEdits = () => {
    try {
      const parsed = JSON.parse(editableJson);
      updateOutputContent(activeReviewFormat, parsed);
      setSaveFeedback(true);
      setTimeout(() => setSaveFeedback(false), 2000);
    } catch {
      alert("Invalid JSON format. Please ensure valid syntax before saving.");
    }
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setReviewStatus(activeReviewFormat, currentItem?.reviewStatus || "Under Review", commentInput);
    setCommentInput("");
  };

  if (!currentItem) {
    return (
      <div className="bg-white border border-[#e8ecf1] rounded-2xl p-12 text-center shadow-xs">
        <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-700">No Outputs Available for Review</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Generate target outputs from the Transformation page first.
        </p>
        <Link
          href="/transform"
          className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 rounded-xl bg-slate-900 text-white text-xs font-semibold"
        >
          <span>Go to Transformation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const reviewStatuses: GeneratedOutput["reviewStatus"][] = [
    "Draft",
    "Under Review",
    "Verified",
    "Approved",
  ];

  return (
    <div className="space-y-6">
      {/* Top Workflow Status & Deliver Button */}
      <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              Human Review & Editorial Sign-Off
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
              STATUS: {currentItem.reviewStatus}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Audit and manually refine outputs against original source telemetry before delivery
          </p>
        </div>

        <Link
          href="/delivery"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-semibold shadow-xs transition-colors self-start md:self-auto"
        >
          <PackageCheck className="w-3.5 h-3.5" />
          <span>Final Content Package</span>
        </Link>
      </div>

      {/* Output Format Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {selectedOutputs.map((fmtId) => {
          const item = generatedOutputs[fmtId];
          const isActive = activeReviewFormat === fmtId;

          return (
            <button
              key={fmtId}
              type="button"
              onClick={() => setActiveReviewFormat(fmtId)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-slate-900 text-white border-transparent shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{item?.formatType || fmtId}</span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-sm ${
                  item?.reviewStatus === "Approved"
                    ? "bg-emerald-500 text-white"
                    : isActive
                    ? "bg-slate-800 text-indigo-300"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item?.reviewStatus || "Draft"}
              </span>
            </button>
          );
        })}
      </div>

      {/* SPLIT WORKSPACE: LEFT (SOURCE) vs RIGHT (GENERATED OUTPUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: ORIGINAL SOURCE DOCUMENT */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs flex flex-col h-[700px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                ORIGINAL SOURCE DOCUMENT
              </h4>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              Read-Only Ground Truth
            </span>
          </div>

          <div className="text-xs font-bold text-slate-900 mb-2 truncate">
            {sourceTitle}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 font-mono text-[11px] text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 select-text">
            {sourceText.split("\n\n").map((chunk, idx) => (
              <p
                key={idx}
                className="p-2 rounded-lg hover:bg-indigo-50/50 transition-colors"
              >
                <span className="text-slate-400 font-bold mr-2 select-none">
                  [{idx + 1}]
                </span>
                {chunk}
              </p>
            ))}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Grounding reference active</span>
            <Link href="/verification" className="text-indigo-600 font-semibold hover:underline">
              Inspect 5 Claims →
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: GENERATED OUTPUT EDITOR & WORKFLOW ACTIONS */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs flex flex-col h-[700px] justify-between">
          <div>
            {/* Header & Status Stepper */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  GENERATED OUTPUT: {currentItem.formatType}
                </h4>
              </div>

              {/* Status workflow selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                {reviewStatuses.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setReviewStatus(activeReviewFormat, st)}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      currentItem.reviewStatus === st
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Editable Content Workspace */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Editable Content Payload (Structured JSON / Text)
                </label>
                {saveFeedback && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Saved to Active State!
                  </span>
                )}
              </div>

              <textarea
                value={editableJson}
                onChange={(e) => setEditableJson(e.target.value)}
                rows={14}
                className="w-full p-3.5 rounded-xl border border-slate-200 font-mono text-[11.5px] text-slate-800 leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-[#fafafc]"
              />
            </div>
          </div>

          {/* Reviewer Comments & Bottom Action Buttons */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            {/* Reviewer Comments List if any */}
            {currentItem.reviewerComments && currentItem.reviewerComments.length > 0 && (
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {currentItem.reviewerComments.map((c, i) => (
                  <div
                    key={i}
                    className="text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded-md border border-slate-200/80 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Comment input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add audit note or editorial feedback..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddComment}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Comment
              </button>
            </div>

            {/* Actions: Save Edits, Regenerate, Reject, Approve */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={handleSaveEdits}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs"
              >
                Save Edits
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => regenerateSingleOutput(activeReviewFormat)}
                  disabled={isGenerating}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin text-indigo-600" : "text-slate-400"}`} />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReviewStatus(activeReviewFormat, "Draft", "Revision requested by human reviewer.")}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReviewStatus(activeReviewFormat, "Approved", "Approved for final packaging and delivery.")}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve Output</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
