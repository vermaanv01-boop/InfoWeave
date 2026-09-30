"use client";

import React, { useState } from "react";
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Server,
  UserX,
  FileCheck,
  Check,
  AlertCircle,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { incidentReportData } from "@/data/incidentReport";

export function SourceDocumentDetails() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"telemetry" | "findings" | "timeline" | "remediation" | "evidence">("telemetry");

  const telemetryParameters = [
    {
      parameter: "AUTH_ATTEMPTS",
      label: "Authentication Attempts",
      value: "Multiple failed attempts recorded prior to login",
      reference: "Baseline: 0-1 failed attempts",
      status: "HIGH",
    },
    {
      parameter: "SOURCE_IP",
      label: "Origin IP Address",
      value: "Unfamiliar IP (not previously associated with account)",
      reference: "Expected: Verified Support Subnet",
      status: "HIGH",
    },
    {
      parameter: "SYSTEM_ACCESS",
      label: "Functionality Invocation",
      value: "Customer-management functionality accessed",
      reference: "Application audit trace",
      status: "HIGH",
    },
    {
      parameter: "DB_DELETION",
      label: "Database Integrity",
      value: "No evidence of database deletion identified",
      reference: "0 deletion queries in log trail",
      status: "NORMAL",
    },
    {
      parameter: "RECORD_MOD",
      label: "Customer Record Integrity",
      value: "No unauthorized modification of customer records",
      reference: "Audit log reconciliation verified",
      status: "NORMAL",
    },
    {
      parameter: "SESSION_KILL",
      label: "Active Session Invalidation",
      value: "Active sessions invalidated after detection",
      reference: "Executed at 09:48 IST",
      status: "NORMAL",
    },
    {
      parameter: "ACCT_DISABLE",
      label: "Account State",
      value: "Affected customer support account disabled",
      reference: "Executed at 09:42 IST",
      status: "NORMAL",
    },
    {
      parameter: "TARGET_SYSTEM",
      label: "Affected System Entity",
      value: "Customer Management Web Application",
      reference: "SNS Web Application Tier",
      status: "HIGH",
    },
    {
      parameter: "TARGET_ACCOUNT",
      label: "Affected User Account",
      value: "Customer Support Account",
      reference: "Access Control Directory",
      status: "HIGH",
    },
    {
      parameter: "CONTAINMENT",
      label: "Overall Containment Status",
      value: "Contained (Account disabled, sessions revoked)",
      reference: "Security Incident Response SLA",
      status: "NORMAL",
    },
  ];

  return (
    <div className="mt-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          SOURCE DOCUMENT INTELLIGENCE (1)
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-semibold text-slate-500">
            Telemetry synchronized with incident log
          </span>
        </div>
      </div>

      {/* Main Document Card (Matches Priya Blood Report card from screenshot) */}
      <div className="bg-white border border-[#e8ecf1] rounded-2xl shadow-xs overflow-hidden">
        {/* Document Header Bar */}
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f1f4f8]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#e8f7ee] border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900">
                  {incidentReportData.documentTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                  INCIDENT REPORT
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f8f0] text-emerald-700 border border-emerald-100 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  AI SUMMARY READY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {incidentReportData.reportDate} · Organization: {incidentReportData.organization} · Incident ID: {incidentReportData.incidentId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="self-start md:self-center px-4 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>{isCollapsed ? "Expand" : "Collapse"}</span>
            {isCollapsed ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Content Body */}
        {!isCollapsed && (
          <div>
            {/* View Switcher Tabs */}
            <div className="px-5 pt-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto bg-[#fcfdfd]">
              <button
                type="button"
                onClick={() => setActiveTab("telemetry")}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === "telemetry"
                    ? "border-emerald-600 text-slate-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Telemetry Parameters</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  {telemetryParameters.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("findings")}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === "findings"
                    ? "border-emerald-600 text-slate-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Key Findings</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  6
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("timeline")}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === "timeline"
                    ? "border-emerald-600 text-slate-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Incident Timeline</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  7
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("remediation")}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === "remediation"
                    ? "border-emerald-600 text-slate-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Recommended Actions</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  7
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("evidence")}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === "evidence"
                    ? "border-emerald-600 text-slate-900 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Evidence References</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  4
                </span>
              </button>
            </div>

            {/* TAB 1: TELEMETRY PARAMETERS TABLE (EXACT VISUAL COPY OF SCREENSHOT TABLE) */}
            {activeTab === "telemetry" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#fafafc]">
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        PARAMETER
                      </th>
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        VALUE
                      </th>
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        REFERENCE RANGE
                      </th>
                      <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    {telemetryParameters.map((row) => (
                      <tr
                        key={row.parameter}
                        className="hover:bg-slate-50/70 transition-colors group"
                      >
                        <td className="py-3 px-6">
                          <span className="text-xs font-bold text-slate-800 tracking-wide font-mono">
                            {row.parameter}
                          </span>
                          <span className="block text-[11px] text-slate-400 font-sans font-normal mt-0.5">
                            {row.label}
                          </span>
                        </td>
                        <td className="py-3 px-6">
                          <span className="text-xs font-semibold text-slate-900">
                            {row.value}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-xs text-slate-500">
                          {row.reference}
                        </td>
                        <td className="py-3 px-6">
                          <StatusBadge status={row.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: KEY FINDINGS */}
            {activeTab === "findings" && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {incidentReportData.keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="bg-[#fafafc] border border-slate-100 rounded-xl p-4 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {finding}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Entities & Impact Card */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    ENTITIES & IMPACT
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          AFFECTED SYSTEM
                        </p>
                        <p className="text-xs font-bold text-slate-900 mt-0.5">
                          {incidentReportData.affectedSystem}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                        <UserX className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          AFFECTED ACCOUNT
                        </p>
                        <p className="text-xs font-bold text-slate-900 mt-0.5">
                          {incidentReportData.affectedAccount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: INCIDENT TIMELINE */}
            {activeTab === "timeline" && (
              <div className="p-6">
                <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
                  {incidentReportData.timeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500" />
                      <div className="bg-[#fafafc] border border-slate-100 rounded-xl p-3.5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs font-bold text-slate-800">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: RECOMMENDED ACTIONS */}
            {activeTab === "remediation" && (
              <div className="p-6">
                <div className="space-y-2.5">
                  {incidentReportData.recommendedActions.map((action, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 bg-[#fafafc] border border-slate-100 rounded-xl hover:bg-white hover:border-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs font-semibold text-slate-800">
                          {action}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                        ACTIONABLE
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: EVIDENCE REFERENCES */}
            {activeTab === "evidence" && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {incidentReportData.evidence.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#fafafc] border border-slate-100 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Period: {item.date}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        AUDITED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
