import { Case } from "../types";
import { useRouter } from "next/navigation";
import {
  formatDate,
  reasonMap,
  riskLevelMap,
  statusMap,
} from "./CaseTable.util";

interface CaseTableProps {
  cases: Case[];
}

export default function CaseTable({ cases }: CaseTableProps) {
  const router = useRouter();

  const handleRowClick = (caseId: string) => {
    router.push(`/cases/${caseId}`);
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left font-semibold text-gray-600">ID</th>
            <th className="p-4 text-left font-semibold text-gray-600">
              캐릭터명
            </th>
            <th className="p-4 text-left font-semibold text-gray-600">사유</th>
            <th className="p-4 text-left font-semibold text-gray-600">
              위험도
            </th>
            <th className="p-4 text-left font-semibold text-gray-600">상태</th>
            <th className="p-4 text-left font-semibold text-gray-600">
              생성 일시
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cases.map((caseItem) => (
            <tr
              key={caseItem.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(caseItem.id)}
            >
              <td className="p-4 font-mono text-gray-700">{caseItem.id}</td>
              <td className="p-4 font-medium text-gray-900">
                {caseItem.characterName}
              </td>
              <td className="p-4 text-gray-700">
                {reasonMap[caseItem.reason] ?? caseItem.reason}
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    riskLevelMap[caseItem.riskLevel].className
                  }`}
                >
                  {riskLevelMap[caseItem.riskLevel].text}
                </span>
              </td>
              <td className="p-4 text-gray-700">
                {statusMap[caseItem.status]}
              </td>
              <td className="p-4 text-gray-700">
                {formatDate(caseItem.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
