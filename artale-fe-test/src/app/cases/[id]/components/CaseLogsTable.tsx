"use client";

import { LogEntry, Pagination } from "@/app/cases/types";
import { formatDate } from "@/app/cases/components/CaseTable.util";

interface CaseLogsTableProps {
  logs: LogEntry[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

const logDetailKeyMap: { [key: string]: string } = {
  from_x: "이전 X좌표",
  to_x: "현재 X좌표",
  from_y: "이전 Y좌표",
  to_y: "현재 Y좌표",
  skillId: "스킬 ID",
  damage: "데미지",
  itemId: "아이템 ID",
};

export default function CaseLogsTable({
  logs,
  pagination,
  onPageChange,
}: CaseLogsTableProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">원본 로그</h2>
      <div className="rounded-lg border overflow-hidden">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-600">
                Log ID
              </th>
              <th className="p-3 text-left font-semibold text-gray-600">
                Timestamp
              </th>
              <th className="p-3 text-left font-semibold text-gray-600">
                Action Type
              </th>
              <th className="p-3 text-left font-semibold text-gray-600">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.logId} className="hover:bg-gray-50">
                <td className="p-3 font-mono text-gray-700">{log.logId}</td>
                <td className="p-3 text-gray-700">
                  {formatDate(log.timestamp)}
                </td>
                <td className="p-3 text-gray-700">{log.actionType}</td>
                <td className="p-3 text-gray-700">
                  <div className="flex flex-col space-y-1 text-xs">
                    {Object.entries(log.details).map(([key, value]) => (
                      <div key={key} className="font-mono">
                        <span className="font-sans font-semibold text-gray-500">
                          {logDetailKeyMap[key] ?? key}:
                        </span>{" "}
                        {String(value)}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4"></div>
    </div>
  );
}
