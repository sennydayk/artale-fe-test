"use client";

import { CaseStatus } from "@/app/cases/types";
import { useRouter } from "next/navigation";
import { useState, useTransition, useRef, useEffect } from "react";

interface CaseStatusUpdaterProps {
  caseId: string;
  currentStatus: CaseStatus;
}

const STATUS_OPTIONS: CaseStatus[] = ["OPEN", "UNDER_REVIEW", "CLOSED"];
const STATUS_KOREAN: { [key in CaseStatus]: string } = {
  OPEN: "검토 전",
  UNDER_REVIEW: "검토 중",
  CLOSED: "조치 완료",
};

export default function CaseStatusUpdater({
  caseId,
  currentStatus,
}: CaseStatusUpdaterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (newStatus: CaseStatus) => {
    setIsDropdownOpen(false);
    setError(null);
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("상태 변경에 실패했습니다.");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">현재 상태:</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            {
              OPEN: "bg-gray-200 text-gray-800",
              UNDER_REVIEW: "bg-blue-100 text-blue-800",
              CLOSED: "bg-green-100 text-green-800",
            }[currentStatus]
          }`}
        >
          {STATUS_KOREAN[currentStatus]}
        </span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isPending}
          className="px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-800 disabled:bg-gray-400 flex items-center gap-1"
        >
          상태 변경
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-32 bg-white rounded-md shadow-lg border">
            {STATUS_OPTIONS.filter((status) => status !== currentStatus).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {STATUS_KOREAN[status]}
                </button>
              )
            )}
          </div>
        )}
      </div>
      {isPending && <p className="text-xs text-gray-500">변경 중...</p>}
      {error && <p className="text-xs text-red-500 ml-2">{error}</p>}
    </div>
  );
}
