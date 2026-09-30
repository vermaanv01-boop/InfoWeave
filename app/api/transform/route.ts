import { NextResponse } from "next/server";
import { generateLocalFormat } from "@/lib/ai/transformEngine";
import { INITIAL_ANALYSIS } from "@/lib/data/sampleDocument";
import { OutputFormatId } from "@/lib/types/transformation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { source, sourceTitle, configuration, outputTypes } = body;

    // Try forwarding to Python AI service
    try {
      const pyRes = await fetch("http://localhost:8000/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: source || "",
          sourceTitle: sourceTitle || "Source Document",
          configuration: configuration || {},
          outputTypes: outputTypes || ["executive-summary"],
        }),
        signal: AbortSignal.timeout(6000),
      });

      if (pyRes.ok) {
        const data = await pyRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fallback
    }

    // Local deterministic multi-format generator
    const outputs: Record<string, any> = {};
    for (const fmt of outputTypes || ["executive-summary"]) {
      outputs[fmt] = generateLocalFormat(
        fmt as OutputFormatId,
        source || "",
        sourceTitle || "Source Document",
        configuration,
        INITIAL_ANALYSIS
      );
    }

    return NextResponse.json({
      sourceTitle: sourceTitle || "Source Document",
      configuration,
      generatedCount: Object.keys(outputs).length,
      outputs,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Transformation failed" },
      { status: 500 }
    );
  }
}
