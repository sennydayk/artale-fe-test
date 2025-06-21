import { getMockLogs } from "../../../../../../lib/mock-data/logs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const { caseId } = params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "100", 10);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const logData = getMockLogs(caseId, page, pageSize);

  return NextResponse.json(logData);
}
