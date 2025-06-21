import { generateMockNotes } from "../../../../../../lib/mock-data/notes";
import { NextRequest, NextResponse } from "next/server";

const allNotes = generateMockNotes();

export async function GET(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const { caseId } = params;

  // caseId를 기반으로 노트를 선택
  const seed = caseId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const note = allNotes[seed % allNotes.length];

  if (!note) {
    return NextResponse.json({ message: "Note not found" }, { status: 404 });
  }

  // 요구사항에 맞게 배열 형태로 반환
  return NextResponse.json([note]);
}
