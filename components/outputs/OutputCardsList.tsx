"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldAlert,
  Share2,
  Twitter,
  PieChart,
  Presentation,
  Video,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";
import { OutputFormatId, GeneratedOutput } from "@/lib/types/transformation";

export function OutputCardsList() {
  const { generatedOutputs, selectedOutputs, configuration, setActiveReviewFormat } = useTransformation();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>("executive-summary");

  // Presentation active slide index state
  const [activeSlide, setActiveSlide] = useState(0);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const getFormatIcon = (id: string) => {
    switch (id) {
      case "executive-summary":
        return FileText;
      case "advisory":
        return ShieldAlert;
      case "linkedin-post":
        return Share2;
      case "x-thread":
        return Twitter;
      case "infographic":
        return PieChart;
      case "presentation":
        return Presentation;
      case "video-package":
        return Video;
      default:
        return FileText;
    }
  };

  const activeOutputs = selectedOutputs
    .map((id) => generatedOutputs[id])
    .filter(Boolean);

  if (activeOutputs.length === 0) {
    return (
      <div className="bg-white border border-[#e8ecf1] rounded-2xl p-12 text-center shadow-xs">
        <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-700">No Outputs Generated Yet</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Select target formats and click &ldquo;GENERATE SELECTED OUTPUTS&rdquo; on the Transformation page.
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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              Generated Outputs ({activeOutputs.length} of {selectedOutputs.length})
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
              1 SOURCE → {activeOutputs.length} OUTPUTS
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Configured for {configuration.audience} · Tone: {configuration.tone} · Language: {configuration.language}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/verification"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verify Claims</span>
          </Link>

          <Link
            href="/review"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Human Review Workspace</span>
          </Link>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-5">
        {activeOutputs.map((item) => {
          const isExpanded = expandedCard === item.id;
          const Icon = getFormatIcon(item.id);

          return (
            <div
              key={item.id}
              className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header Bar */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#f1f4f8] bg-[#fafafc]">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 uppercase">
                        {item.formatType}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {item.reviewStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Audience: {item.targetAudience} · {item.readingTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Send to Human Review */}
                  <Link
                    href="/review"
                    onClick={() => setActiveReviewFormat(item.id as OutputFormatId)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Review / Edit</span>
                  </Link>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, JSON.stringify(item.sections, null, 2))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Expand / Collapse toggle */}
                  <button
                    type="button"
                    onClick={() => setExpandedCard(isExpanded ? null : item.id)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs"
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

              {/* Collapsed Preview Snippet */}
              {!isExpanded && (
                <div className="p-5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.sections.overview ||
                    item.sections.hook ||
                    item.sections.headline ||
                    (item.sections.tweets && item.sections.tweets[0]) ||
                    "Click 'Open' to inspect formatted content."}
                </div>
              )}

              {/* Expanded Rich Format Viewers */}
              {isExpanded && (
                <div className="p-6 bg-white space-y-6">
                  {/* 1. EXECUTIVE SUMMARY */}
                  {item.id === "executive-summary" && (
                    <div className="space-y-5">
                      <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-4">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Executive Overview
                        </h5>
                        <p className="text-xs text-slate-800 leading-relaxed font-medium">
                          {item.sections.overview}
                        </p>
                      </div>

                      {item.sections.findings && (
                        <div>
                          <h5 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                            Key Forensic Findings ({item.sections.findings.length})
                          </h5>
                          <ul className="space-y-2">
                            {item.sections.findings.map((f: string, i: number) => (
                              <li
                                key={i}
                                className="text-xs text-slate-700 flex items-start gap-2.5 font-medium bg-slate-50/60 p-2.5 rounded-lg border border-slate-100"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.sections.recommended_actions && (
                        <div>
                          <h5 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                            Recommended Actions
                          </h5>
                          <ul className="space-y-2">
                            {item.sections.recommended_actions.map((act: string, i: number) => (
                              <li
                                key={i}
                                className="text-xs text-slate-700 flex items-start gap-2.5 font-medium bg-indigo-50/40 p-2.5 rounded-lg border border-indigo-100/60"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. ADVISORY */}
                  {item.id === "advisory" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50/40 border border-amber-200/60 rounded-xl">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                          Overview & Urgency
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                          {item.sections.overview}
                        </p>
                      </div>

                      {item.sections.key_information && (
                        <div>
                          <h5 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                            Advisory Telemetry
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {item.sections.key_information.map((k: string, i: number) => (
                              <div
                                key={i}
                                className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono"
                              >
                                {k}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h5 className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-wider">
                          Impact Assessment
                        </h5>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {item.sections.impact}
                        </p>
                      </div>

                      {item.sections.recommended_actions && (
                        <div>
                          <h5 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                            Mandatory Remediation Steps
                          </h5>
                          <ul className="space-y-1.5">
                            {item.sections.recommended_actions.map((act: string, i: number) => (
                              <li
                                key={i}
                                className="text-xs text-slate-700 flex items-start gap-2 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. LINKEDIN POST */}
                  {item.id === "linkedin-post" && (
                    <div className="space-y-4 max-w-2xl mx-auto border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                          IW
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">InfoWeave AI Team</p>
                          <p className="text-[10px] text-slate-400">Automated Content Transformation</p>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                        <p className="font-semibold text-slate-900">{item.sections.hook}</p>
                        <p>{item.sections.main_content}</p>
                        <p className="font-medium text-indigo-700">{item.sections.call_to_action}</p>
                      </div>

                      {item.sections.hashtags && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                          {item.sections.hashtags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. X / TWITTER POST */}
                  {item.id === "x-thread" && (
                    <div className="space-y-3 max-w-xl mx-auto">
                      {item.sections.tweets?.map((tweet: string, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2 relative"
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                            <span className="text-indigo-600 font-mono">Tweet {idx + 1} of {item.sections.tweets.length}</span>
                            <span className="text-[10px]">{tweet.length}/280 chars</span>
                          </div>
                          <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                            {tweet}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 5. INFOGRAPHIC */}
                  {item.id === "infographic" && (
                    <div className="space-y-4 bg-slate-950 text-white rounded-2xl p-6 border border-slate-800">
                      <div className="text-center space-y-1 border-b border-slate-800 pb-4">
                        <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">
                          VISUAL INFOGRAPHIC BLUEPRINT
                        </span>
                        <h4 className="text-sm font-extrabold tracking-tight text-white">
                          {item.sections.headline}
                        </h4>
                        <p className="text-xs font-bold text-emerald-400 mt-1">
                          {item.sections.hero_metric}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
                        {item.sections.sections?.map((sec: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5"
                          >
                            <span className="text-[10px] font-bold text-indigo-400 uppercase">
                              {sec.name}
                            </span>
                            <p className="text-xs text-slate-300 leading-snug">
                              {sec.details}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                        <p className="font-semibold text-slate-300">
                          Layout Hierarchy: {item.sections.layout_recommendation}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          Color Scheme: {item.sections.recommended_visual_hierarchy}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 6. PRESENTATION */}
                  {item.id === "presentation" && item.sections.slides && (
                    <div className="space-y-4">
                      {/* Slide Canvas */}
                      <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 min-h-[260px] flex flex-col justify-between shadow-md">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-indigo-400 mb-3">
                            <span>SLIDE {activeSlide + 1} OF {item.sections.slides.length}</span>
                            <span className="uppercase text-slate-400">{configuration.audience} Presentation</span>
                          </div>
                          <h4 className="text-base font-bold text-white tracking-tight">
                            {item.sections.slides[activeSlide]?.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.sections.slides[activeSlide]?.subtitle}
                          </p>

                          <ul className="mt-4 space-y-2">
                            {item.sections.slides[activeSlide]?.bullets?.map((b: string, i: number) => (
                              <li key={i} className="text-xs text-slate-200 flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Speaker Notes Drawer */}
                        <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                          <span className="font-bold text-indigo-300">Speaker Notes: </span>
                          <span>{item.sections.slides[activeSlide]?.speakerNotes}</span>
                        </div>
                      </div>

                      {/* Slide Controls */}
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                          disabled={activeSlide === 0}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Previous Slide</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {item.sections.slides.map((_: any, idx: number) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveSlide(idx)}
                              className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                                activeSlide === idx
                                  ? "bg-slate-900 text-white"
                                  : "text-slate-400 hover:bg-slate-100"
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveSlide(Math.min(item.sections.slides.length - 1, activeSlide + 1))
                          }
                          disabled={activeSlide === item.sections.slides.length - 1}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                        >
                          <span>Next Slide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 7. VIDEO PACKAGE */}
                  {item.id === "video-package" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-100 pb-2">
                        <span>{item.sections.video_title}</span>
                        <span className="font-mono text-indigo-600">{item.sections.target_duration}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.sections.storyboard?.map((scene: any, sIdx: number) => (
                          <div
                            key={sIdx}
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="bg-slate-900 text-white px-2 py-0.5 rounded-md">
                                SCENE {scene.scene}
                              </span>
                              <span className="text-slate-400 font-mono">{scene.time}</span>
                            </div>

                            <p className="text-xs text-slate-700">
                              <strong className="text-slate-900">Visual: </strong>
                              {scene.visual}
                            </p>

                            <p className="text-xs text-slate-700">
                              <strong className="text-indigo-700">Voiceover: </strong>
                              &ldquo;{scene.narration}&rdquo;
                            </p>

                            <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-slate-200/80 text-slate-600">
                              <span className="font-bold">Subtitle: </span>
                              {scene.subtitles}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 font-medium">
                        <strong>Production Notes: </strong>
                        {item.sections.production_notes}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
