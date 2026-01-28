import ReactionBar from '@/components/reaction/ReactionBar';

export default function ReactionPreview() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Reaction Preview</h1>

      <section style={{ marginTop: 24 }}>
        <h3>기본(리액션 없음)</h3>
        <ReactionBar initialReactions={{}} />
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>리액션 있음</h3>
        <ReactionBar
          initialReactions={{ '👍': 20, '🙏': 12, '😍': 12, '🥺': 7 }}
        />
      </section>
    </div>
  );
}
