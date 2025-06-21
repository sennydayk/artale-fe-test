import { getMockCaseDetail } from "lib/mock-data/case-details";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const { caseId } = params;
  const caseDetail = getMockCaseDetail(caseId);

  if (!caseDetail) {
    return NextResponse.json({ message: "Case not found" }, { status: 404 });
  }

  return NextResponse.json(caseDetail);
}
