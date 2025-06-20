"use client";

import CaseTable from "./components/CaseTable";
import { CaseApiResponse } from "./types";
import { useEffect, useState } from "react";

export default function CaseListPage() {
  const [data, setData] = useState<CaseApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 케이스 목록 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cases");
        if (!res.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }
        const result: CaseApiResponse = await res.json();
        setData(result);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <p>데이터를 불러오는 중입니다...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 text-center text-red-600">
        <p>에러 발생: {error.message}</p>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  const { data: cases, pagination } = data;

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
