import { getMockCases } from "../../../../lib/mock-data/cases";
import { NextResponse } from "next/server";

export async function GET() {
  const mockCases = getMockCases();
  return NextResponse.json(mockCases);
}
