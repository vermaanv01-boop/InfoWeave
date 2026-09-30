import { NextResponse } from "next/server";

export async function GET() {
  // Check if Ollama is available
  let ollamaOnline = false;
  try {
    const res = await fetch("http://localhost:11434/api/tags", {
      signal: AbortSignal.timeout(1000),
    });
    ollamaOnline = res.ok;
  } catch {
    ollamaOnline = false;
  }

  // Check if Python FastAPI service is available
  let pythonOnline = false;
  try {
    const res = await fetch("http://localhost:8000/health", {
      signal: AbortSignal.timeout(1000),
    });
    pythonOnline = res.ok;
  } catch {
    pythonOnline = false;
  }

  return NextResponse.json({
    platform: "InfoWeave AI Platform (SIH26154)",
    ollamaAvailable: ollamaOnline,
    pythonServiceAvailable: pythonOnline,
    activeMode: ollamaOnline ? "Ollama Local LLM" : "Intelligent Fallback Engine",
    timestamp: new Date().toISOString(),
  });
}
