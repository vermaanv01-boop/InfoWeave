"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import { generatedFormatsData, GeneratedFormat } from "@/data/generatedContent";
import { incidentReportData } from "@/data/incidentReport";
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Share2,
  ArrowRight,
  RefreshCw,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function TransformPage() {
  // Configuration State
  const [selectedAudience, setSelectedAudience] = useState("Security Team");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedDetail, setSelectedDetail] = useState("Standard");
  const [selectedObjective, setSelectedObjective] = useState("Inform");

  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    "executive-summary",
    "security-advisory",
    "linkedin-post",
    "x-thread",
    "presentation",
    "infographic",
    "video-script",
  ]);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Content generated successfully.");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>("executive-summary");

  const audienceOptions = ["Security Team", "Executive", "General Public"];
  const toneOptions = ["Professional", "Technical", "Awareness"];
  const languageOptions = ["English", "Hindi"];
  const detailOptions = ["Concise", "Standard", "Detailed"];
  const objectiveOptions = ["Inform", "Alert", "Educate"];

  const formatList = [
    { id: "executive-summary", name: "Executive Summary" },
    { id: "security-advisory", name: "Security Advisory" },
    { id: "linkedin-post", name: "LinkedIn Post" },
    { id: "x-thread", name: "X Thread" },
    { id: "presentation", name: "Presentation" },
    { id: "infographic", name: "Infographic" },
    { id: "video-script", name: "Video Script" },
  ];

  const toggleFormat = (id: string) => {
    if (selectedFormats.includes(id)) {
      if (selectedFormats.length > 1) {
        setSelectedFormats(selectedFormats.filter((f) => f !== id));
      }
    } else {
      setSelectedFormats([...selectedFormats, id]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setStatusMessage("Generating content...");
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setStatusMessage("Content generated successfully.");
    }, 900);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Transform"
        subtitle="WORKSPACE / CONTENT TRANSFORMATION"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Source Context Bar */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900">
                  Target Source: {incidentReportData.documentTitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {incidentReportData.incidentId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Grounded strictly in incident facts · Zero external hallucinations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Selected Formats:
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
              {selectedFormats.length} of {formatList.length}
            </span>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#f1f4f8] pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                TRANSFORMATION CONFIGURATION
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              Configure parameters to tailor output generation
            </span>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* AUDIENCE */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                AUDIENCE
              </label>
              <div className="space-y-1.5">
                {audienceOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedAudience(opt)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      selectedAudience === opt
                        ? "bg-[#111827] text-white border-transparent shadow-xs"
                        : "bg-[#fafafc] text-slate-600 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* TONE */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                TONE
              </label>
              <div className="space-y-1.5">
                {toneOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedTone(opt)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      selectedTone === opt
                        ? "bg-[#111827] text-white border-transparent shadow-xs"
                        : "bg-[#fafafc] text-slate-600 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* LANGUAGE */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                LANGUAGE
              </label>
              <div className="space-y-1.5">
                {languageOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedLanguage(opt)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      selectedLanguage === opt
                        ? "bg-[#111827] text-white border-transparent shadow-xs"
                        : "bg-[#fafafc] text-slate-600 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* DETAIL LEVEL */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                DETAIL LEVEL
              </label>
              <div className="space-y-1.5">
                {detailOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedDetail(opt)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      selectedDetail === opt
                        ? "bg-[#111827] text-white border-transparent shadow-xs"
                        : "bg-[#fafafc] text-slate-600 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* OBJECTIVE */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                OBJECTIVE
              </label>
              <div className="space-y-1.5">
                {objectiveOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedObjective(opt)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      selectedObjective === opt
                        ? "bg-[#111827] text-white border-transparent shadow-xs"
                        : "bg-[#fafafc] text-slate-600 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* OUTPUT FORMATS SELECTOR */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                OUTPUT FORMATS (SELECT FORMATS TO GENERATE)
              </label>
              <button
                type="button"
                onClick={() =>
                  setSelectedFormats(
                    selectedFormats.length === formatList.length
                      ? ["executive-summary"]
                      : formatList.map((f) => f.id)
                  )
                }
                className="text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                {selectedFormats.length === formatList.length
                  ? "Deselect All"
                  : "Select All Formats"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {formatList.map((fmt) => {
                const isSelected = selectedFormats.includes(fmt.id);
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => toggleFormat(fmt.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between gap-1.5 border text-left ${
                      isSelected
                        ? "bg-[#111827] text-white border-transparent shadow-xs"
                        : "bg-[#fafafc] text-slate-600 border-slate-200/70 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{fmt.name}</span>
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isSelected ? "bg-emerald-400" : "bg-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTION BUTTON & STATE */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {isGenerating ? (
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Generating content...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#111827] text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Generate Content</span>
            </button>
          </div>
        </div>

        {/* GENERATED OUTPUT CARDS */}
        {hasGenerated && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                GENERATED CONTENT OUTPUTS ({selectedFormats.length})
              </h3>
              <Link
                href="/verification"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Verify Consistency & Claims</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {selectedFormats.map((formatId) => {
                const item = generatedFormatsData[formatId];
                if (!item) return null;
                const isExpanded = expandedCard === formatId;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden transition-all"
                  >
                    {/* Header */}
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#f1f4f8] bg-[#fafafc]">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900">
                              {item.title}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 uppercase">
                              {item.formatType}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                              {selectedTone}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Audience: {selectedAudience} · Language: {selectedLanguage} · Detail: {selectedDetail} · {item.readingTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const allText = `${item.title}\n\n${item.summary}\n\n${item.sections
                              .map(
                                (s) =>
                                  `${s.heading}\n${
                                    Array.isArray(s.content)
                                      ? s.content.join("\n")
                                      : s.content
                                  }`
                              )
                              .join("\n\n")}`;
                            handleCopy(item.id, allText);
                          }}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-xs"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedCard(isExpanded ? null : formatId)
                          }
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-xs"
                        >
                          <span>{isExpanded ? "Collapse" : "Open"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Summary snippet */}
                    <div className="p-5 border-b border-slate-100">
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    {/* Expanded Body */}
                    {isExpanded && (
                      <div className="p-6 space-y-5 bg-white">
                        {item.sections.map((section, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-[#fafafc] border border-slate-100 rounded-xl p-4"
                          >
                            <h5 className="text-xs font-bold text-slate-900 mb-2">
                              {section.heading}
                            </h5>
                            {Array.isArray(section.content) ? (
                              <ul className="space-y-1.5">
                                {section.content.map((point, pIdx) => (
                                  <li
                                    key={pIdx}
                                    className="text-xs text-slate-600 flex items-start gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                                {section.content}
                              </p>
                            )}
                          </div>
                        ))}

                        <div className="flex items-center gap-2 pt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            TAGS:
                          </span>
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
