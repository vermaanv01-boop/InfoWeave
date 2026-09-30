"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { useTransformation } from "@/lib/context/TransformationContext";
import {
  History as HistoryIcon,
  FileText,
  ArrowRight,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  Filter,
} from "lucide-react";

export default function HistoryPage() {
  const { history, setSourceTitle, updateConfiguration } = useTransformation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter((item) =>
    item.sourceTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Transformation History & Audit Ledger"
        subtitle="INFOWEAVE AI / AUDIT LOG"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <HistoryIcon className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                TRANSFORMATION RUNS ({history.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical record of all multi-format transformations generated and verified
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by source document title..."
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 w-64 bg-white"
            />
          </div>
        </div>

        {/* History Table Card */}
        <div className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredHistory.map((rec) => (
              <div
                key={rec.id}
                className="p-6 hover:bg-slate-50/60 transition-colors space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs font-bold text-slate-900">
                        {rec.sourceTitle}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {rec.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {rec.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <Layers className="w-3 h-3 text-indigo-500" />{" "}
                        {rec.outputsGenerated.length} Formats
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{rec.verificationStatus}</span>
                    </span>

                    {/* Actions: View, Continue, Export */}
                    <Link
                      href="/outputs"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>View</span>
                    </Link>

                    <Link
                      href="/transform"
                      onClick={() => {
                        setSourceTitle(rec.sourceTitle);
                        updateConfiguration(rec.configuration);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-2xs flex items-center gap-1"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(rec, null, 2)], {
                          type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${rec.id}-export.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500"
                      title="Export Run Data"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Configuration snapshot pills */}
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                    Audience: <strong>{rec.configuration.audience}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                    Tone: <strong>{rec.configuration.tone}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                    Language: <strong>{rec.configuration.language}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                    Outputs: <strong>{rec.outputsGenerated.join(", ")}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
