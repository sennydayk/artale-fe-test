import { CaseDetail } from "@/app/cases/types";
import { getMockCases } from "./cases";

const movementPatterns = [
  "Repetitive_Vertical",
  "Circular_Pattern",
  "Teleport_Farming",
  "Irregular_High_Speed",
];
const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const allCases = getMockCases().data;

export const mockCaseDetails: CaseDetail[] = allCases.map((c) => ({
  ...c,
  userId: 10000 + Math.floor(Math.random() * 1000),
  summary: {
    lootsPerMinute: Math.floor(Math.random() * 200),
    uniqueMonsterKills: Math.floor(Math.random() * 10),
    movementPattern: getRandomElement(movementPatterns),
  },
}));

export const getMockCaseDetail = (id: string): CaseDetail | undefined => {
  return mockCaseDetails.find((c) => c.id === id);
};
