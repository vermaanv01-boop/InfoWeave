"use client";

import React from "react";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { ReviewWorkspace } from "@/components/review/ReviewWorkspace";

export default function HumanReviewPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Human Review & Editorial Sign-Off Workspace"
        subtitle="INFOWEAVE AI / STEP 7"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Pipeline Stepper */}
        <WorkflowPipeline currentStep="review" />

        {/* Split Review Workspace */}
        <ReviewWorkspace />
      </main>
    </div>
  );
}
