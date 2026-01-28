import LinkButton from '@/components/common/LinkButton';

export default function LinkButtonPreview() {
  return (
    <div style={{ padding: 40 }}>
      <h1>LinkButton Preview</h1>

      {/* Outline */}
      <section
        style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}
      >
        <LinkButton size="sizeMd" variant="variantOutlinePrimary" to="/profile">
          내부 라우트 이동
        </LinkButton>

        <LinkButton
          size="sizeMd"
          variant="variantOutlinePrimary"
          href="https://www.codeit.kr"
          target="_blank"
        >
          외부 링크 이동
        </LinkButton>
      </section>

      {/* Primary */}
      <section
        style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}
      >
        <LinkButton size="sizeBig" variant="variantPrimary" to="/profile">
          내부 라우트 이동
        </LinkButton>

        <LinkButton
          size="sizeBig"
          variant="variantPrimary"
          href="https://www.codeit.kr"
          target="_blank"
        >
          외부링크 이동
        </LinkButton>
      </section>

      {/* Gray */}
      <section
        style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}
      >
        <LinkButton size="sizeLg" variant="variantGray" to="/profile">
          내부 라우트 이동
        </LinkButton>

        <LinkButton
          size="sizeLg"
          variant="variantGray"
          href="https://www.codeit.kr"
          target="_blank"
        >
          외부 링크 이동
        </LinkButton>
      </section>

      {/* 텍스트만 있는 버튼 */}
      <section style={{ marginTop: 24 }}>
        <LinkButton size="sizeLg" variant="variantMiddleText" to="/profile">
          + 내부 라우트 이동
        </LinkButton>

        <LinkButton
          variant="variantMiddleText"
          href="https://www.codeit.kr"
          target="_blank"
        >
          + 외부 링크 이동
        </LinkButton>
      </section>
    </div>
  );
}
