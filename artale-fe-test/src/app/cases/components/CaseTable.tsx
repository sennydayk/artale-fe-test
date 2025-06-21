import { Case, CaseStatus, RiskLevel } from "../types";
import { useRouter } from "next/navigation";

interface CaseTableProps {
  cases: Case[];
}

const reasonMap: { [key: string]: string } = {
  REPETITIVE_LOOTING: "반복적 아이템 뺏기",
  IMPOSSIBLE_MOVEMENT: "비정상적 이동",
  CHEAT_INJECTION: "치트 주입",
  PROGRESS_BLOCKING: "성장 방해 행위",
  ECONOMY_DISRUPTION: "경제 교란 행위",
  TRADE_EXPLOITATION: "거래 시스템 악용",
};

const riskLevelMap: {
  [key in RiskLevel]: { text: string; className: string };
} = {
  CRITICAL: { text: "심각", className: "bg-red-100 text-red-800" },
  HIGH: { text: "높음", className: "bg-orange-100 text-orange-800" },
  MEDIUM: { text: "중간", className: "bg-yellow-100 text-yellow-800" },
  LOW: { text: "낮음", className: "bg-green-100 text-green-800" },
};

const statusMap: { [key in CaseStatus]: string } = {
  OPEN: "처리 전",
  UNDER_REVIEW: "처리 중",
  CLOSED: "처리 완료",
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(dateString));
};

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
