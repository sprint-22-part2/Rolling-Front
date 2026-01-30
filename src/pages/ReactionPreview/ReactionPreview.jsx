import ReactionBar from '@/components/reaction/ReactionBar/index';

export default function ReactionPreview() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Reaction Preview</h1>

      <section style={{ marginTop: 24 }}>
        <h3>기본(리액션 없음)</h3>
        <ReactionBar initialReactions={{}} />
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Blue</h3>
        <ReactionBar
          theme="blue"
          initialReactions={{ '👍': 20, '🙏': 12, '🥺': 7 }}
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Green</h3>
        <ReactionBar
          theme="mint"
          initialReactions={{ '👍': 20, '🙏': 12, '😍': 12, '🥺': 7 }}
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Purple</h3>
        <ReactionBar theme="purple" initialReactions={{ '👍': 20, '🥺': 7 }} />
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Yellow</h3>
        <ReactionBar
          theme="sand"
          initialReactions={{ '👍': 20, '🙏': 12, '😍': 12 }}
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Image</h3>
        <ReactionBar theme="trans" initialReactions={{ '👍': 20, '🙏': 12 }} />
      </section>
    </div>
  );
}
