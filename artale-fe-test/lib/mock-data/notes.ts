export const generateMockNotes = (count = 153) => {
  const authors = ["GM늘보", "GM단호박", "GM고구마", "GM사이다"];
  const contents = [
    "슬리피우드 '저주받은 신전' 지역에서 동일 패턴 반복 확인됨.",
    "이동 패턴이 좌우 3타일 반복으로 비정상적으로 단순함.",
    "채널 변경 주기가 3초 이하로 매우 짧음.",
    "사용한 스킬이 동일 ID로 100회 이상 반복됨.",
    "몬스터 리젠 타이밍과 정확히 일치하는 공격 패턴이 관측됨.",
    "핵심 지역에서 동일 동선이 20분간 지속됨.",
    "조사 필요 - 보스 리젠 시간에 맞춰 반복 진입.",
  ];

  const now = new Date();
  const notes = Array.from({ length: count }, (_, i) => {
    const createdAt = new Date(now.getTime() - i * 1000 * 60); // 1분 간격
    return {
      noteId: i + 1,
      author: authors[i % authors.length],
      content: contents[i % contents.length],
      createdAt: createdAt.toISOString(),
    };
  });

  return notes;
};
