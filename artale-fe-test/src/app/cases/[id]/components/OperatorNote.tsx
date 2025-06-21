import { Note } from "@/app/cases/types";
import { formatDate } from "@/app/cases/components/CaseTable.util";

interface OperatorNoteProps {
  note: Note;
}

export default function OperatorNote({ note }: OperatorNoteProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">운영자 노트</h2>
      <div className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-900">{note.author}</span>
          <span className="text-xs text-gray-500">
            {formatDate(note.createdAt)}
          </span>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
      </div>
    </div>
  );
}
