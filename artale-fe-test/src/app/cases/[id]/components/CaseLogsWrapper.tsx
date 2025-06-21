"use client";

import { useState, useEffect } from "react";
import { LogApiResponse, LogEntry, Pagination } from "@/app/cases/types";
import CaseLogsTable from "./CaseLogsTable";

interface CaseLogsWrapperProps {
  caseId: string;
}

export default function CaseLogsWrapper({ caseId }: CaseLogsWrapperProps) {
  const [logData, setLogData] = useState<LogApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/cases/${caseId}/logs?page=${page}&pageSize=100`
        );
        if (!res.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }
        const data: LogApiResponse = await res.json();
        setLogData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [caseId, page]);

  if (isLoading) {
    return <div className="text-center p-8">로그를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">에러: {error}</div>;
  }

  if (!logData || logData.data.length === 0) {
    return <div className="text-center p-8">표시할 로그가 없습니다.</div>;
  }

  return (
    <CaseLogsTable
      logs={logData.data}
      pagination={logData.pagination}
      onPageChange={setPage}
    />
  );
}
