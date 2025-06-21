import CaseDetailInfo from "./components/CaseDetail";
import { CaseDetail, Note } from "../types";
import Link from "next/link";
import CaseLogsWrapper from "./components/CaseLogsWrapper";
import OperatorNote from "./components/OperatorNote";

async function getCaseDetail(caseId: string): Promise<CaseDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cases/${caseId}`,
      {
        cache: "no-store", // 항상 최신 데이터를 가져오도록 설정
      }
    );

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch case detail:", error);
    return null;
  }
}

async function getCaseNotes(caseId: string): Promise<Note[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cases/${caseId}/notes`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch case notes:", error);
    return null;
  }
}

export default async function CaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const caseDetail = await getCaseDetail(params.id);
  const caseNotes = await getCaseNotes(params.id);

  if (!caseDetail) {
    return (
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          케이스를 찾을 수 없습니다.
        </h1>
        <p className="text-gray-600 mb-6">
          요청하신 케이스 ID '{params.id}'에 해당하는 정보가 존재하지 않거나,
          데이터를 불러오는 데 실패했습니다.
        </p>
        <Link
          href="/cases"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">케이스 상세 정보</h1>
        <p className="mt-1 text-sm text-gray-600">
          케이스 ID: <span className="font-mono">{params.id}</span>
        </p>
      </div>
      <CaseDetailInfo caseDetail={caseDetail} />

      <div className="my-8 border-t border-gray-200"></div>

      <CaseLogsWrapper caseId={params.id} />

      {caseNotes && caseNotes.length > 0 && (
        <>
          <div className="my-8 border-t border-gray-200"></div>
          <OperatorNote note={caseNotes[0]} />
        </>
      )}
    </main>
  );
}
