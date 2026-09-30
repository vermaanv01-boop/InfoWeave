"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { ConfigurationPanel } from "@/components/configuration/ConfigurationPanel";
import { OutputSelector } from "@/components/transformation/OutputSelector";
import { OutputCardsList } from "@/components/outputs/OutputCardsList";
import { useTransformation } from "@/lib/context/TransformationContext";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function TransformPage() {
  const router = useRouter();
  const { sourceTitle, hasGenerated, selectedOutputs } = useTransformation();

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Transformation Configuration & Generation"
        subtitle="INFOWEAVE AI / STEP 3, 4 & 5"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Pipeline Stepper */}
        <WorkflowPipeline currentStep="configure" />

        {/* Source Context Bar */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900">
                  Target Source: {sourceTitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold">
                  Ingested & Grounded
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Parameters below will strictly govern the framing, tone, and depth of all outputs.
              </p>
            </div>
          </div>

          <Link
            href="/source-content"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start md:self-auto"
          >
            <span>Change Source</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Configuration Panel */}
        <ConfigurationPanel />

        {/* Output Selector with GENERATE SELECTED OUTPUTS button */}
        <OutputSelector onGenerateComplete={() => router.push("/outputs")} />

        {/* Preview Generated Outputs Section if already generated */}
        {hasGenerated && (
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                GENERATED OUTPUTS PREVIEW
              </h3>
              <Link
                href="/outputs"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Full Screen Output Inspector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <OutputCardsList />
          </div>
        )}
      </main>
    </div>
  );
}
