"use client";

import React, { useState } from "react";
import { ShieldAlert, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { incidentReportData } from "@/data/incidentReport";

export function SourceDocumentHeader({
  onRefresh,
}: {
  onRefresh?: () => void;
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState("Just now");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed("Just now");
      if (onRefresh) onRefresh();
    }, 600);
  };

  return (
    <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 shadow-xs">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#f1f4f8]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                {incidentReportData.documentTitle}
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              {incidentReportData.incidentId} · {incidentReportData.organization}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="self-start sm:self-center flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 text-slate-500 ${
              isRefreshing ? "animate-spin text-emerald-600" : ""
            }`}
          />
          <span>{isRefreshing ? "Analyzing telemetry..." : "Refresh AI status"}</span>
        </button>
      </div>

      {/* 4 Metadata boxes (DOB, SEX, BLOOD TYPE, CONTACT style from screenshot) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            ORGANIZATION
          </p>
          <p className="text-xs font-bold text-slate-800 mt-1">
            {incidentReportData.organization}
          </p>
        </div>

        <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            DATE
          </p>
          <p className="text-xs font-bold text-slate-800 mt-1">
            {incidentReportData.reportDate}
          </p>
        </div>

        <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            SEVERITY
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-xs font-bold text-rose-600">
              {incidentReportData.initialSeverity.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            STATUS
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-emerald-700">
              {incidentReportData.currentStatus.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Alert Banner (ALLERGIES style from screenshot) */}
      <div className="mt-4 bg-red-50/70 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3">
        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-rose-600 tracking-wide">
            ATTACK VECTOR:
          </span>
          <span className="text-rose-700 font-medium">
            {incidentReportData.attackVector} — {incidentReportData.incidentType} on {incidentReportData.affectedSystem}
          </span>
        </div>
      </div>
    </div>
  );
}
