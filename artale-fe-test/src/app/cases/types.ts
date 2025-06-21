export type RiskLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type CaseStatus = "OPEN" | "UNDER_REVIEW" | "CLOSED";

export interface Case {
  id: string;
  characterName: string;
  reason: string;
  riskLevel: RiskLevel;
  status: CaseStatus;
  createdAt: string;
}

export interface CaseDetail extends Case {
  userId: number;
  summary: {
    [key: string]: string | number;
  };
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CaseApiResponse {
  data: Case[];
  pagination: Pagination;
}
