import React from "react";

export interface StatusBadgeProps {
  status: "LOW" | "NORMAL" | "HIGH" | "CONTAINED" | "VERIFIED" | "AI SUMMARY READY" | "PROCESSING COMPLETE" | "SECURE" | "COMPROMISED" | "ANOMALOUS" | "RESOLVED" | "NEEDS REVIEW" | string;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, size = "sm", className = "" }: StatusBadgeProps) {
  const upper = status.toUpperCase();

  const isRed = ["LOW", "HIGH", "ALERT", "COMPROMISED", "ANOMALOUS", "NEEDS REVIEW"].includes(upper);
  const isGreen = ["NORMAL", "CONTAINED", "VERIFIED", "AI SUMMARY READY", "PROCESSING COMPLETE", "SECURE", "RESOLVED", "CONSISTENT"].includes(upper);

  const baseClasses = size === "sm" 
    ? "px-2.5 py-0.5 text-[10px] font-bold rounded-md tracking-wider inline-flex items-center gap-1.5"
    : "px-3 py-1 text-xs font-semibold rounded-lg tracking-wider inline-flex items-center gap-1.5";

  if (isRed) {
    return (
      <span className={`${baseClasses} bg-red-50 text-red-600 border border-red-100/80 ${className}`}>
        {upper}
      </span>
    );
  }

  if (isGreen) {
    return (
      <span className={`${baseClasses} bg-[#e8f8f0] text-[#059669] border border-emerald-100 ${className}`}>
        {upper === "AI SUMMARY READY" && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        )}
        {upper === "PROCESSING COMPLETE" && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        )}
        {upper}
      </span>
    );
  }

  return (
    <span className={`${baseClasses} bg-slate-100 text-slate-600 border border-slate-200/60 ${className}`}>
      {upper}
    </span>
  );
}
