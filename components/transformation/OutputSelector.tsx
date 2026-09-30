"use client";

import React from "react";
import {
  FileText,
  ShieldAlert,
  Share2,
  Twitter,
  PieChart,
  Presentation,
  Video,
  Check,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";
import { OutputFormatId } from "@/lib/types/transformation";

interface FormatItem {
  id: OutputFormatId;
  name: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

export const OUTPUT_FORMAT_SPECS: FormatItem[] = [
  {
    id: "executive-summary",
    name: "Executive Summary",
    description: "Concise briefing for decision-makers with key findings and strategic actions.",
    icon: FileText,
    badge: "Leadership",
  },
  {
    id: "advisory",
    name: "Advisory",
    description: "Structured communication with technical telemetry, impact, and remediation steps.",
    icon: ShieldAlert,
    badge: "Operational",
  },
  {
    id: "linkedin-post",
    name: "LinkedIn Post",
    description: "Professional publication-ready social content with hook, key points, and hashtags.",
    icon: Share2,
    badge: "Social Media",
  },
  {
    id: "x-thread",
    name: "X / Twitter Post",
    description: "Optimized tweet or thread with 280-character counts and numbering.",
    icon: Twitter,
    badge: "Public Comms",
  },
  {
    id: "infographic",
    name: "Infographic",
    description: "Key messages, recommended visual structure, icons, and layout hierarchy.",
    icon: PieChart,
    badge: "Visual Blueprint",
  },
  {
    id: "presentation",
    name: "Presentation",
    description: "Executive slide deck with slide titles, structured bullet points, and speaker notes.",
    icon: Presentation,
    badge: "Slide Deck",
  },
  {
    id: "video-package",
    name: "Video Package",
    description: "Script, scene-by-scene storyboard, narration, subtitles, and visual cues.",
    icon: Video,
    badge: "Multimedia",
  },
];

export function OutputSelector({ onGenerateComplete }: { onGenerateComplete?: () => void }) {
  const {
    selectedOutputs,
    toggleOutputFormat,
    selectAllFormats,
    deselectAllFormats,
    generateSelectedOutputs,
    isGenerating,
  } = useTransformation();

  const handleGenerate = async () => {
    await generateSelectedOutputs();
    if (onGenerateComplete) {
      onGenerateComplete();
    }
  };

  return (
    <div id="select-outputs" className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-6">
      {/* Header and bulk controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              STEP 4: OUTPUT SELECTION
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-600">
              Select target communication formats to generate
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mt-1">
            Multi-Format Output Generators ({selectedOutputs.length} of {OUTPUT_FORMAT_SPECS.length} selected)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={selectAllFormats}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Select All (7)
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={deselectAllFormats}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 7 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {OUTPUT_FORMAT_SPECS.map((fmt) => {
          const isSelected = selectedOutputs.includes(fmt.id);
          const Icon = fmt.icon;

          return (
            <div
              key={fmt.id}
              onClick={() => toggleOutputFormat(fmt.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-800 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "bg-slate-800 text-indigo-300 border border-slate-700"
                        : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Checkbox button */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold truncate">{fmt.name}</h4>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-sm uppercase ${
                      isSelected
                        ? "bg-slate-800 text-indigo-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {fmt.badge}
                  </span>
                </div>

                <p
                  className={`text-[11px] mt-1.5 line-clamp-3 leading-relaxed ${
                    isSelected ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {fmt.description}
                </p>
              </div>

              <div
                className={`mt-4 pt-2.5 border-t text-[10px] font-semibold flex items-center justify-between ${
                  isSelected ? "border-slate-800 text-indigo-300" : "border-slate-100 text-slate-400"
                }`}
              >
                <span>{isSelected ? "Selected for generation" : "Click to include"}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Big Action CTA: GENERATE SELECTED OUTPUTS */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          Ready to run AI transformation engine across{" "}
          <strong className="text-slate-800">{selectedOutputs.length} formats</strong> from 1 source.
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || selectedOutputs.length === 0}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-98 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              <span>GENERATING SELECTED OUTPUTS...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>GENERATE SELECTED OUTPUTS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
