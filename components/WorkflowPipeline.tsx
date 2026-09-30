"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

export interface PipelineStep {
  id: string;
  name: string;
  href: string;
}

export const WORKFLOW_STEPS: PipelineStep[] = [
  { id: "source", name: "1. Source", href: "/source-content" },
  { id: "analyze", name: "2. Analyze", href: "/source-content#understanding" },
  { id: "configure", name: "3. Configure", href: "/transform" },
  { id: "select", name: "4. Select Formats", href: "/transform#select-outputs" },
  { id: "generate", name: "5. Generate", href: "/outputs" },
  { id: "verify", name: "6. Verify", href: "/verification" },
  { id: "review", name: "7. Review", href: "/review" },
  { id: "deliver", name: "8. Deliver", href: "/delivery" },
];

export function WorkflowPipeline({ currentStep }: { currentStep?: string }) {
  const pathname = usePathname();

  return (
    <div className="bg-white border border-[#e8ecf1] rounded-2xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            ONE SOURCE → MULTIPLE OUTPUTS WORKFLOW PIPELINE
          </p>
        </div>
        <span className="text-[11px] text-indigo-700 font-semibold">
          SIH26154 Automated Transformation
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isActive = pathname === step.href || currentStep === step.id;
          const isPast = WORKFLOW_STEPS.findIndex((s) => s.href === pathname) > idx;

          return (
            <React.Fragment key={step.id}>
              <Link
                href={step.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs scale-102"
                    : isPast
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                    : "bg-[#f8fafc] text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                {isPast ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                <span>{step.name}</span>
              </Link>

              {idx < WORKFLOW_STEPS.length - 1 && (
                <span className="text-slate-300 font-bold select-none text-xs px-0.5">
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
