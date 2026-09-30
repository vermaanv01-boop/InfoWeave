"use client";

import React from "react";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { OutputCardsList } from "@/components/outputs/OutputCardsList";

export default function GeneratedOutputsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Multi-Format Generated Communications"
        subtitle="INFOWEAVE AI / STEP 5"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Pipeline Stepper */}
        <WorkflowPipeline currentStep="generate" />

        {/* Output Cards with specialized viewers */}
        <OutputCardsList />
      </main>
    </div>
  );
}
