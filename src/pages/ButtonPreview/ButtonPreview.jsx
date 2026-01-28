import { useState } from 'react';

import Button from '@/components/common/Button';
import SegmentToggle from '@/components/common/SegmentToggle';
import {
  DeletedIcon,
  EditIcon,
  ShareIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@/assets/icons';

function PlusIcon() {
  return (
    <svg
      width={56}
      height={56}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ButtonPreview() {
  const [tab, setTab] = useState('image'); // 기본 선택

  return (
    <div style={{ padding: 40 }}>
      <h1>Button Preview</h1>

      {/* 만들기 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button size="sizeMd" variant="variantOutlinePrimary">
          롤링페이퍼 만들기
        </Button>
        <Button size="sizeMd" variant="variantOutlinePrimary" to="/profile">
          내부 라우트 이동
        </Button>
        <Button
          size="sizeMd"
          variant="variantOutlinePrimary"
          href="https://www.codeit.kr"
          target="_blank"
        >
          외부 링크 이동
        </Button>
      </section>

      {/* Primary 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button size="sizeBig" variant="variantPrimary">
          일반 버튼
        </Button>
        <Button size="sizeBig" variant="variantPrimary" to="/profile">
          내부 라우트 이동 버튼
        </Button>
        <Button
          size="sizeBig"
          variant="variantPrimary"
          href="https://www.codeit.kr"
          target="_blank"
        >
          외부링크 이동 버튼
        </Button>
      </section>
      <section style={{ marginTop: 24 }}>
        <Button size="sizeLg" variant="variantPrimary">
          SizeLg
        </Button>
      </section>
      <section style={{ marginTop: 24 }}>
        <Button size="sizeMd" variant="variantPrimary">
          SizeMd
        </Button>
      </section>
      <section style={{ marginTop: 24 }}>
        <Button size="sizeSm" variant="variantPrimary">
          SizeSm
        </Button>
      </section>

      {/* 더보기 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button size="sizeLg" variant="variantGray">
          더보기
        </Button>
        <Button size="sizeLg" variant="variantGray" to="/profile">
          내부 라우트 이동
        </Button>
        <Button
          size="sizeLg"
          variant="variantGray"
          href="https://www.codeit.kr"
          target="_blank"
        >
          외부 링크 이동
        </Button>
      </section>

      {/* 작은글씨 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button leftIcon={<DeletedIcon />} variant="variantSmallText">
          롤링페이퍼 삭제하기
        </Button>
        <Button leftIcon={<ShareIcon />} variant="variantSmallText">
          공유하기
        </Button>
        <Button leftIcon={<EditIcon />} variant="variantSmallText">
          편집하기
        </Button>
      </section>

      {/* 텍스트만 있는 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button variant="variantMiddleText">+ 롤링 페이퍼 만들기</Button>
      </section>

      {/* 확인/아니오 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button size="sizeSm" variant="variantPrimary">
          확인
        </Button>
        <Button size="sizeSm" variant="variantGhost">
          아니오
        </Button>
      </section>

      {/* 저장 버튼 */}
      <section style={{ marginTop: 24 }}>
        <form>
          <Button type="submit" size="sizeMd" variant="variantPrimary">
            submit
          </Button>
        </form>
      </section>

      {/* 플러스 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button variant="variantCircle" leftIcon={<PlusIcon />}>
          메시지 추가하기
        </Button>
      </section>

      {/* 화살표 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button
          variant="variantArrow"
          leftIcon={<ArrowLeftIcon width={20} height={20} />}
          aria-label="이전"
          onClick={() => {}}
        />
        <Button
          variant="variantArrow"
          leftIcon={<ArrowRightIcon width={20} height={20} />}
          aria-label="다음"
          onClick={() => {}}
        />
      </section>

      {/* 토글 버튼 */}
      <div style={{ padding: 20 }}>
        <SegmentToggle value={tab} onChange={setTab} />
      </div>
    </div>
  );
}
