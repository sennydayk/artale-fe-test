import {
  reasonMap,
  riskLevelMap,
  statusMap,
  formatDate,
} from "../../components/CaseTable.util";
import { CaseDetail } from "../../types";
import CaseStatusUpdater from "./CaseStatusUpdater";

interface CaseDetailProps {
  caseDetail: CaseDetail;
}

const summaryKeyMap: { [key: string]: string } = {
  lootsPerMinute: "분당 아이템 획득 수",
  uniqueMonsterKills: "고유 몬스터 처치 수",
  movementPattern: "이동 패턴",
};

export default function CaseDetailInfo({ caseDetail }: CaseDetailProps) {
  const renderDetailRow = (label: string, value: React.ReactNode) => (
    <tr>
      <td className="w-1/3 p-3 font-semibold text-gray-600 bg-gray-50 border-b">
        {label}
      </td>
      <td className="w-2/3 p-3 text-gray-800 border-b">{value}</td>
    </tr>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">케이스 정보</h2>
        <div className="rounded-lg border">
          <table className="min-w-full bg-white text-sm">
            <tbody>
              {renderDetailRow(
                "ID",
                <span className="font-mono">{caseDetail.id}</span>
              )}
              {renderDetailRow("캐릭터명", caseDetail.characterName)}
              {renderDetailRow("사용자 ID", caseDetail.userId)}
              {renderDetailRow(
                "사유",
                reasonMap[caseDetail.reason] ?? caseDetail.reason
              )}
              {renderDetailRow(
                "위험도",
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    riskLevelMap[caseDetail.riskLevel].className
                  }`}
                >
                  {riskLevelMap[caseDetail.riskLevel].text}
                </span>
              )}
              {renderDetailRow(
                "상태",
                <CaseStatusUpdater
                  caseId={caseDetail.id}
                  currentStatus={caseDetail.status}
                />
              )}
              {renderDetailRow("생성 일시", formatDate(caseDetail.createdAt))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">요약 정보</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="min-w-full bg-white text-sm">
            <tbody>
              {Object.entries(caseDetail.summary).map(([key, value]) => (
                <tr key={key}>
                  <td className="w-1/3 p-3 font-semibold text-gray-600 bg-gray-50 border-b">
                    {summaryKeyMap[key] ?? key}
                  </td>
                  <td className="w-2/3 p-3 text-gray-800 border-b">
                    {String(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
