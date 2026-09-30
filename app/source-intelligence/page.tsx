"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { SourceDocumentHeader } from "@/components/SourceDocumentHeader";
import { SourceDocumentDetails } from "@/components/SourceDocumentDetails";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SourceIntelligencePage() {
  const [lastRefreshed, setLastRefreshed] = useState("24 September 2026, 09:50 IST");

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Source Intelligence"
        subtitle="WORKSPACE / SOURCE INTELLIGENCE"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Top Intelligence Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#e8ecf1] rounded-2xl px-5 py-3.5 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                STATUS:
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md tracking-wider">
                PROCESSING COMPLETE
              </span>
            </div>
            <span className="hidden md:inline text-xs text-slate-400">
              · Source ingested and telemetry extracted with 100% provenance
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/transform"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#111827] text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Proceed to Transform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Top Incident Document Card (matches screenshot Priya Patel card) */}
        <SourceDocumentHeader
          onRefresh={() => setLastRefreshed("Just now")}
        />

        {/* Lower Intelligence Breakdown & Telemetry Table (matches screenshot Priya Blood Report) */}
        <SourceDocumentDetails />
      </main>
    </div>
  );
}
