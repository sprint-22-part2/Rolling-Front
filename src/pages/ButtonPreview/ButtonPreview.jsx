import { useState } from 'react';
import styles from '@/components/common/Button/index.module.css';

import Button from '@/components/common/Button';
import DeletedIcon from '@/assets/icons/ic-deleted.svg?react';
import EditIcon from '@/assets/icons/ic-edit.svg?react';
import ShareIcon from '@/assets/icons/ic-share.svg?react';
import ArrowRightIcon from '@/assets/icons/ic-arrow-right.svg?react';
import ArrowLeftIcon from '@/assets/icons/ic-arrow-left.svg?react';
import SegmentToggle from '@/components/common/SegmentToggle';

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
        <Button className={`${styles.sizeMd} ${styles.variantOutlinePrimary}`}>
          롤링페이퍼 만들기
        </Button>
      </section>

      {/* Primary 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button className={`${styles.sizeBig} ${styles.variantPrimary}`}>
          구경해보기
        </Button>
      </section>
      <section style={{ marginTop: 24 }}>
        <Button className={`${styles.sizeLg} ${styles.variantPrimary}`}>
          SizeLg
        </Button>
      </section>
      <section style={{ marginTop: 24 }}>
        <Button className={`${styles.sizeMd} ${styles.variantPrimary}`}>
          SizeMd
        </Button>
      </section>
      <section style={{ marginTop: 24 }}>
        <Button className={`${styles.sizeSm} ${styles.variantPrimary}`}>
          SizeSm
        </Button>
      </section>

      {/* 더보기 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button className={`${styles.sizeLg} ${styles.variantGray}`}>
          더보기
        </Button>
      </section>

      {/* 작은글씨 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button
          className={`${styles.smallTxtButton}`}
          leftIcon={<DeletedIcon />}
        >
          롤링페이퍼 삭제하기
        </Button>
        <Button leftIcon={<ShareIcon />} className={`${styles.smallTxtButton}`}>
          공유하기
        </Button>
        <Button leftIcon={<EditIcon />} className={`${styles.smallTxtButton}`}>
          편집하기
        </Button>
      </section>

      {/* 확인/아니오 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button className={`${styles.sizeSm} ${styles.variantPrimary}`}>
          확인
        </Button>
        <Button className={`${styles.notConfirmButton}`}>아니오</Button>
      </section>

      {/* 저장 버튼 */}
      <section style={{ marginTop: 24 }}>
        <form>
          <Button
            type="submit"
            className={`${styles.sizeMd} ${styles.variantPrimary}`}
          >
            submit
          </Button>
        </form>
      </section>

      {/* 플러스 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button className={`${styles.circleIcon}`} leftIcon={<PlusIcon />} />
      </section>

      {/* 화살표 버튼 */}
      <section style={{ marginTop: 24 }}>
        <Button
          className={`${styles.arrowButton}`}
          leftIcon={<ArrowLeftIcon width={20} height={20} />}
          aria-label="이전"
          onClick={() => {}}
        />
        <Button
          className={`${styles.arrowButton}`}
          leftIcon={<ArrowRightIcon width={20} height={20} />}
          aria-label="다음"
          onClick={() => {}}
        />
      </section>

      {/* 토글 버튼 */}
      <div style={{ padding: 20 }}>
        <SegmentToggle value={tab} onChange={setTab} />
        <div style={{ marginTop: 16 }}>현재 선택: {tab}</div>
      </div>
    </div>
  );
}
