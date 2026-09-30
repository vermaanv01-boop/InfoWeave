"use client";

import React from "react";
import { Sliders, Users, MessageSquare, Globe, AlignLeft, Target, Palette } from "lucide-react";
import { useTransformation } from "@/lib/context/TransformationContext";
import {
  TargetAudience,
  Tone,
  Language,
  DetailLevel,
  CommunicationObjective,
  ContentStyle,
} from "@/lib/types/transformation";

export function ConfigurationPanel() {
  const { configuration, updateConfiguration } = useTransformation();

  const audienceOptions: TargetAudience[] = [
    "Executive",
    "Technical Team",
    "General Public",
    "Students",
    "Security Team",
    "Custom",
  ];

  const toneOptions: Tone[] = [
    "Professional",
    "Formal",
    "Informative",
    "Concise",
    "Persuasive",
    "Educational",
  ];

  const languageOptions: Language[] = [
    "English",
    "Hindi",
    "Hinglish",
    "Marathi",
  ];

  const detailOptions: DetailLevel[] = ["Brief", "Moderate", "Detailed"];

  const objectiveOptions: CommunicationObjective[] = [
    "Inform",
    "Summarize",
    "Educate",
    "Alert",
    "Persuade",
  ];

  const styleOptions: ContentStyle[] = [
    "Professional",
    "Technical",
    "Simple",
    "News-style",
    "Social Media",
  ];

  return (
    <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              TRANSFORMATION CONFIGURATION
            </h3>
            <p className="text-[11px] text-slate-400">
              Configure parameters to tailor tone, language, depth, and communication framing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Active in Prompt Engine</span>
        </div>
      </div>

      {/* 6 Dimension Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Target Audience */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Target Audience</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {audienceOptions.map((opt) => {
              const isSelected = configuration.audience === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateConfiguration({ audience: opt })}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                    isSelected
                      ? "bg-slate-900 text-white border-transparent shadow-xs"
                      : "bg-[#fafafc] text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Tone */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tone</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {toneOptions.map((opt) => {
              const isSelected = configuration.tone === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateConfiguration({ tone: opt })}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                    isSelected
                      ? "bg-slate-900 text-white border-transparent shadow-xs"
                      : "bg-[#fafafc] text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Language */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>Language</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {languageOptions.map((opt) => {
              const isSelected = configuration.language === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateConfiguration({ language: opt })}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                    isSelected
                      ? "bg-slate-900 text-white border-transparent shadow-xs"
                      : "bg-[#fafafc] text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Detail Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <AlignLeft className="w-3.5 h-3.5 text-indigo-600" />
            <span>Detail Level</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {detailOptions.map((opt) => {
              const isSelected = configuration.detailLevel === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateConfiguration({ detailLevel: opt })}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                    isSelected
                      ? "bg-slate-900 text-white border-transparent shadow-xs"
                      : "bg-[#fafafc] text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Communication Objective */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>Objective</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {objectiveOptions.map((opt) => {
              const isSelected = configuration.objective === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateConfiguration({ objective: opt })}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all border text-center truncate ${
                    isSelected
                      ? "bg-slate-900 text-white border-transparent shadow-xs"
                      : "bg-[#fafafc] text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Content Style */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            <span>Content Style</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {styleOptions.map((opt) => {
              const isSelected = configuration.contentStyle === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateConfiguration({ contentStyle: opt })}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                    isSelected
                      ? "bg-slate-900 text-white border-transparent shadow-xs"
                      : "bg-[#fafafc] text-slate-700 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
