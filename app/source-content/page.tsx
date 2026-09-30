"use client";

import React from "react";
import { Header } from "@/components/Header";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { SourceInputSection } from "@/components/source/SourceInputSection";
import { ContentUnderstandingCard } from "@/components/source/ContentUnderstandingCard";

export default function SourceContentPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Source Content Ingestion & AI Understanding"
        subtitle="INFOWEAVE AI / STEP 1 & 2"
      />

      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Pipeline Stepper */}
        <WorkflowPipeline currentStep="source" />

        {/* Source Input Workbench */}
        <SourceInputSection />

        {/* Content Understanding Card */}
        <ContentUnderstandingCard />
      </main>
    </div>
  );
}
