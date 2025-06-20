interface Props {
  params: { id: string };
}

export default function CaseDetailPage({ params }: Props) {
  return <div>케이스 상세 페이지: {params.id}</div>;
}
