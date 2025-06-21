import { CaseDetail, CaseStatus, RiskLevel } from "@/app/cases/types";

// 전역 객체에 caseDataStore 타입 선언 (서버 재시작 전까지 메모리 유지 목적)
declare global {
  var caseDataStore: CaseDetail[] | undefined;
}

// 시드 기반 난수 생성기 함수 (항상 동일한 seed 값을 제공하면 동일한 순서의 난수 반환)
const createSeededRandom = (seed: number) => {
  return () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
};

// 초기 더미 데이터 생성 함수
const generateInitialData = (): CaseDetail[] => {
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
  const movementPatterns = [
    "Repetitive_Vertical",
    "Circular_Pattern",
    "Teleport_Farming",
    "Irregular_High_Speed",
  ];

  const cases: CaseDetail[] = [];

  // mock 데이터 배열 생성 (153개)
  for (let i = 0; i < 153; i++) {
    const seededRandom = createSeededRandom(i + 1);
    const getRandomElement = <T>(arr: T[]): T =>
      arr[Math.floor(seededRandom() * arr.length)];

    //랜덤 ID 생성 (문자, 숫자 번갈아 8자리)
    const generateRandomIdPart = () => {
      const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");
      const NUMBERS = "0123456789".split("");
      let result = "";
      for (let j = 0; j < 4; j++) {
        result += ALPHABETS[Math.floor(seededRandom() * ALPHABETS.length)];
        result += NUMBERS[Math.floor(seededRandom() * NUMBERS.length)];
      }
      return result;
    };

    const now = new Date();

    const caseDetail: CaseDetail = {
      id: `case-${generateRandomIdPart()}`,
      characterName: `플레이어${String(i + 1).padStart(3, "0")}`,
      reason: getRandomElement(REASONS),
      riskLevel: getRandomElement(RISK_LEVELS),
      status: getRandomElement(STATUSES),
      // 최근 30일 중 랜덤하게 설정
      createdAt: new Date(
        now.getTime() - seededRandom() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      userId: 10000 + Math.floor(seededRandom() * 1000),
      summary: {
        lootsPerMinute: Math.floor(seededRandom() * 200),
        uniqueMonsterKills: Math.floor(seededRandom() * 10),
        movementPattern: getRandomElement(movementPatterns),
      },
    };
    cases.push(caseDetail);
  }
  return cases;
};

// 싱글톤 방식의 더미 데이터 저장소 생성
// 이미 저장된 데이터가 있으면 재사용하고, 없으면 새로 생성
const caseDataStore =
  global.caseDataStore ?? (global.caseDataStore = generateInitialData());
// -----------------------------

// 모든 케이스 반환 함수
export const getAllCases = () => {
  // Return a copy to prevent direct mutation of the store
  return [...caseDataStore];
};

// ID로 특정 케이스 반환
export const getCaseById = (id: string): CaseDetail | undefined => {
  return caseDataStore.find((c) => c.id === id);
};

// 특정 케이스의 상태(status) 업데이트
export const updateCaseStatus = (
  id: string,
  status: CaseStatus
): CaseDetail | undefined => {
  const caseIndex = caseDataStore.findIndex((c) => c.id === id);
  if (caseIndex === -1) {
    return undefined;
  }
  caseDataStore[caseIndex].status = status;
  return caseDataStore[caseIndex];
};
