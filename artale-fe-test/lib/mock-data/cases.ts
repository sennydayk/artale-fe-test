import {
  Case,
  CaseStatus,
  RiskLevel,
  CaseApiResponse,
} from "@/app/cases/types";

const REASONS = [
  "REPETITIVE_LOOTING",
  "IMPOSSIBLE_MOVEMENT",
  "CHEAT_INJECTION",
  "PROGRESS_BLOCKING",
  "ECONOMY_DISRUPTION",
  "TRADE_EXPLOITATION",
];

const RISK_LEVELS: RiskLevel[] = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
const STATUSES: CaseStatus[] = ["OPEN", "UNDER_REVIEW", "CLOSED"];

// 랜덤 ID 생성 문자열 배열
const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");
const NUMBERS = "0123456789".split("");

// 각 배열에서 랜덤 요소를 뽑는 함수
const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// 단일 목데이터 생성 함수
const generateMockCase = (index: number): Case => {
  // 랜덤 ID 생성 (문자, 숫자 번갈아 8자리)
  const generateRandomIdPart = () => {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += getRandomElement(ALPHABETS);
      result += getRandomElement(NUMBERS);
    }
    return result;
  };
  const id = `case-${generateRandomIdPart()}`;
  // 캐릭터 이름 지정
  const characterName = `플레이어${String(index + 1).padStart(3, "0")}`;

  const now = new Date();
  // 최근 30일 중 랜덤하게 설정
  const randomPastDate = new Date(
    now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
  );

  // 객체로 리턴
  return {
    id,
    characterName,
    reason: getRandomElement(REASONS),
    riskLevel: getRandomElement(RISK_LEVELS),
    status: getRandomElement(STATUSES),
    createdAt: randomPastDate.toISOString(),
  };
};

// mock 데이터 배열 생성 (153개)
// 개발 서버가 재시작되거나 코드 수정 시에만 mock 데이터가 새로 생성됨
const mockCases: Case[] = Array.from({ length: 153 }, (_, i) =>
  generateMockCase(i)
);

// API 응답 형태로 데이터 제공
export const getMockCases = (): CaseApiResponse => {
  return {
    data: mockCases,
    pagination: {
      page: 1,
      pageSize: 20,
      totalCount: 153,
      totalPages: 8,
    },
  };
};
