"use client";

import CaseTable from "./components/CaseTable";
import { CaseApiResponse } from "./types";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "@/app/components/Pagination";

// 특정 페이지의 케이스 데이터를 API로부터 fetch하는 함수
const fetchCases = async (page: number): Promise<CaseApiResponse> => {
  // 페이지 번호와 페이지 사이즈에 따라 서버에서 데이터 요청
  const res = await fetch(`/api/cases?page=${page}&pageSize=20`);
  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
  return res.json();
};

// 케이스 목록 페이지
export default function CaseListPage() {
  const [page, setPage] = useState(1); // 현재 페이지 번호(기본값 1)

  // React Query로 데이터 패칭
  const { data, isLoading, isError, error, isFetching } = useQuery<
    CaseApiResponse,
    Error
  >({
    queryKey: ["cases", page],
    queryFn: () => fetchCases(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <p>데이터를 불러오는 중입니다...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 text-center text-red-600">
        <p>에러 발생: {error.message}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <p>데이터가 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">케이스 목록</h1>
          <p className="mt-1 text-sm text-gray-600">
            총 {data.pagination.totalCount}개의 케이스 중 {data.data.length}개
            표시 (페이지 {page}/{data.pagination.totalPages})
          </p>
        </div>
        {isFetching && (
          <div className="text-sm text-blue-600">업데이트 중...</div>
        )}
      </div>
      <CaseTable cases={data.data} />
      <Pagination
        currentPage={page}
        totalPages={data.pagination.totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}
