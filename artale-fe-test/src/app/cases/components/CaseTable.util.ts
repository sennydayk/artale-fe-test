import { RiskLevel, CaseStatus } from "../types";

export const reasonMap: { [key: string]: string } = {
  REPETITIVE_LOOTING: "반복적 아이템 뺏기",
  IMPOSSIBLE_MOVEMENT: "비정상적 이동",
  CHEAT_INJECTION: "치트 주입",
  PROGRESS_BLOCKING: "성장 방해 행위",
  ECONOMY_DISRUPTION: "경제 교란 행위",
  TRADE_EXPLOITATION: "거래 시스템 악용",
};

export const riskLevelMap: {
  [key in RiskLevel]: { text: string; className: string };
} = {
  CRITICAL: { text: "심각", className: "bg-red-100 text-red-800" },
  HIGH: { text: "높음", className: "bg-orange-100 text-orange-800" },
  MEDIUM: { text: "중간", className: "bg-yellow-100 text-yellow-800" },
  LOW: { text: "낮음", className: "bg-green-100 text-green-800" },
};

export const statusMap: { [key in CaseStatus]: string } = {
  OPEN: "검토 전",
  UNDER_REVIEW: "검토 중",
  CLOSED: "조치 완료",
};

export const formatDate = (dateString: string) => {
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
