"use client";

import React, { useState } from "react";
import {
  FileText,
  Upload,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  FileCode,
  FileSpreadsheet,
  Image as ImageIcon,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";

export function SourceInputSection() {
  const {
    sourceText,
    setSourceText,
    sourceTitle,
    setSourceTitle,
    fileType,
    setFileType,
    wordCount,
    detectedLanguage,
    processingStatus,
    analyzeSource,
    isAnalyzing,
    loadSampleDocument,
  } = useTransformation();

  const [activeTab, setActiveTab] = useState<"text" | "upload">("text");
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    setFileType(file.type || "Uploaded Document");
    setSourceTitle(file.name.replace(/\.[^/.]+$/, ""));

    // If it's a text-based file, read content
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setSourceText(content);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-6">
      {/* Title & Metadata Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              STEP 1: SOURCE INGESTION
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-500">
              Ingest 1 Source for Multi-Format Output Generation
            </span>
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            Source Document & Ingestion Workbench
          </h2>
        </div>

        {/* Load Realistic Sample Preset Button */}
        <button
          type="button"
          onClick={loadSampleDocument}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-800 text-xs font-semibold shadow-2xs transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
          <span>Load Sample Incident Advisory</span>
        </button>
      </div>

      {/* Source Title Input */}
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Source Document Title
        </label>
        <input
          type="text"
          value={sourceTitle}
          onChange={(e) => setSourceTitle(e.target.value)}
          placeholder="e.g. CERT-IN Advisory 2026-0842: Incident Report on Unauthorized Access"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/40"
        />
      </div>

      {/* Tabs: Direct Text vs Upload Document */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("text")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "text"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Paste / Edit Source Text</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "upload"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Document (PDF, DOCX, TXT, Image)</span>
        </button>
      </div>

      {/* Tab 1: Large Text Editor */}
      {activeTab === "text" && (
        <div className="space-y-2">
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={14}
            placeholder="Paste your source document content here (incident reports, whitepapers, advisories, briefs, policy directives)..."
            className="w-full p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-[#fafafc]"
          />
        </div>
      )}

      {/* Tab 2: Upload Dropzone */}
      {activeTab === "upload" && (
        <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-8 text-center transition-colors relative bg-slate-50/50">
          <input
            type="file"
            accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-800">
            Click to browse or drag & drop document
          </p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
            Supports PDF, DOCX, TXT, and Image OCR. InfoWeave parses and extracts text into active memory.
          </p>

          <div className="flex items-center justify-center gap-4 mt-4 text-[10px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <FileCheck className="w-3 h-3 text-emerald-600" /> PDF Parsing
            </span>
            <span className="flex items-center gap-1">
              <FileCode className="w-3 h-3 text-emerald-600" /> DOCX Extraction
            </span>
            <span className="flex items-center gap-1">
              <ImageIcon className="w-3 h-3 text-emerald-600" /> OCR Vision
            </span>
          </div>

          {uploadFileName && (
            <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl inline-flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Loaded: {uploadFileName}</span>
            </div>
          )}
        </div>
      )}

      {/* Telemetry & Metadata Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400">File Type</p>
          <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{fileType}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400">Word Count</p>
          <p className="text-xs font-bold text-slate-800 mt-0.5">{wordCount} words</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400">Detected Language</p>
          <p className="text-xs font-bold text-slate-800 mt-0.5">{detectedLanguage}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400">Processing Status</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-bold text-emerald-700 capitalize">{processingStatus}</p>
          </div>
        </div>
      </div>

      {/* Ingestion & Analysis Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-slate-400">
          Ready to extract semantic context, intent, entities, and verifiable claims.
        </p>

        <button
          type="button"
          onClick={analyzeSource}
          disabled={isAnalyzing || !sourceText.trim()}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-all active:scale-98 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Analyzing Content...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Analyze Content</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
