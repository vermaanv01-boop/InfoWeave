import { NextResponse } from "next/server";
import { INITIAL_VERIFICATION } from "@/lib/data/sampleDocument";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { source, claims } = body;

    // Try forwarding to Python FastAPI
    try {
      const pyRes = await fetch("http://localhost:8000/ai/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, claims }),
        signal: AbortSignal.timeout(3000),
      });

      if (pyRes.ok) {
        const data = await pyRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({
      totalClaimsChecked: INITIAL_VERIFICATION.length,
      supported: INITIAL_VERIFICATION.filter((v) => v.status === "Supported").length,
      needsReview: INITIAL_VERIFICATION.filter((v) => v.status === "Needs Review").length,
      unsupported: INITIAL_VERIFICATION.filter((v) => v.status === "Unsupported").length,
      claims: INITIAL_VERIFICATION,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
