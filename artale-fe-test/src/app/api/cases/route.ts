import { getMockCases } from "../../../../lib/mock-data/cases";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const allCasesData = getMockCases();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  const totalCount = allCasesData.data.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = allCasesData.data.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedData,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
    },
  });
}
