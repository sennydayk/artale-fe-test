import CaseTable from "./components/CaseTable";
import { CaseApiResponse } from "./types";

async function getCases(): Promise<CaseApiResponse> {
  // API를 호출 로직 필요

  // mock 데이터
  return {
    data: [
      {
        id: "case-a1b2c3d4",
        characterName: "자동사냥꾼1",
        reason: "REPETITIVE_LOOTING",
        riskLevel: "CRITICAL",
        status: "OPEN",
        createdAt: "2025-06-18T14:30:00Z",
      },
      {
        id: "case-e5f6g7h8",
        characterName: "스피드스터",
        reason: "IMPOSSIBLE_MOVEMENT",
        riskLevel: "CRITICAL",
        status: "UNDER_REVIEW",
        createdAt: "2025-06-18T12:15:00Z",
      },
      {
        id: "case-i9j0k1l2",
        characterName: "골드파머",
        reason: "REPETITIVE_LOOTING",
        riskLevel: "HIGH",
        status: "CLOSED",
        createdAt: "2025-06-17T09:00:00Z",
      },
    ],
    pagination: { page: 1, pageSize: 20, totalCount: 153, totalPages: 8 },
  };
}

export default async function CaseListPage() {
  const { data: cases, pagination } = await getCases();

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">케이스 목록</h1>
        <p className="mt-1 text-sm text-gray-600">
          총 {pagination.totalCount}개의 케이스가 있습니다.
        </p>
      </div>
      <CaseTable cases={cases} />
      {/* 페이지네이션 구현 필요 */}
    </main>
  );
}
