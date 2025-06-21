import { LogApiResponse, LogEntry } from "@/app/cases/types";

const ACTION_TYPES = ["MOVE", "ATTACK", "ITEM_LOOT", "SKILL_CAST"];
const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// 각 액션 타입에 대한 상세 로그 생성 함수
const generateLogDetails = (
  actionType: string
): { [key: string]: string | number } => {
  switch (actionType) {
    case "MOVE":
      const x1 = Math.floor(Math.random() * 500);
      const y1 = Math.floor(Math.random() * 500);
      return {
        from_x: x1,
        to_x: x1 + Math.floor(Math.random() * 20 - 10),
        from_y: y1,
        to_y: y1 + Math.floor(Math.random() * 20 - 10),
      };
    case "ATTACK":
      return {
        skillId: 1000 + Math.floor(Math.random() * 10),
        damage: Math.floor(Math.random() * 10000),
      };
    case "ITEM_LOOT":
      return { itemId: 400000 + Math.floor(Math.random() * 100) };
    case "SKILL_CAST":
      return {
        skillId: 2000 + Math.floor(Math.random() * 10),
        manaCost: Math.floor(Math.random() * 100),
      };
    default:
      return {};
  }
};

// 특정 caseId에 대한 대용량 로그 목데이터 생성
// caseId를 기반으로 랜덤 시드를 사용하여 항상 동일한 데이터를 생성하도록 함
const generateAllMockLogs = (caseId: string): LogEntry[] => {
  // caseId를 간단한 숫자로 변환하여 시드로 사용
  const seed = caseId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const totalCount = 8000 + (seed % 1000); // 8000 ~ 8999개의 로그 생성

  const logs: LogEntry[] = [];
  const startTime = new Date("2025-06-18T14:30:00Z").getTime();

  for (let i = 0; i < totalCount; i++) {
    const actionType = getRandomElement(ACTION_TYPES);
    logs.push({
      logId: 10000 + i,
      timestamp: new Date(startTime + i * 200).toISOString(),
      actionType: actionType,
      details: generateLogDetails(actionType),
    });
  }
  return logs;
};

export const getMockLogs = (
  caseId: string,
  page: number,
  pageSize: number
): LogApiResponse => {
  const allLogs = generateAllMockLogs(caseId);
  const totalCount = allLogs.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const startIndex = (page - 1) * pageSize;
  const paginatedData = allLogs.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
    },
  };
};
