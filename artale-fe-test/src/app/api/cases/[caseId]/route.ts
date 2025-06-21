import {
  getCaseById,
  updateCaseStatus,
} from "../../../../../lib/mock-data/store";
import { NextRequest, NextResponse } from "next/server";
import { CaseStatus } from "@/app/cases/types";

// GET /api/cases/{caseId}
export async function GET(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const { caseId } = params;
  const caseDetail = getCaseById(caseId);

  if (!caseDetail) {
    return NextResponse.json({ message: "Case not found" }, { status: 404 });
  }

  return NextResponse.json(caseDetail);
}

// PATCH /api/cases/{caseId}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const { caseId } = params;
  const body = await request.json();
  const status: CaseStatus = body.status;

  if (!status) {
    return NextResponse.json(
      { message: "Status is required" },
      { status: 400 }
    );
  }

  const updatedCase = updateCaseStatus(caseId, status);

  if (!updatedCase) {
    return NextResponse.json({ message: "Case not found" }, { status: 404 });
  }

  return NextResponse.json(updatedCase);
}
