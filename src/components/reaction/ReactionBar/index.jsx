import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

import ReactionBadge from '@/components/reaction/ReactionBadge/index';
import ReactionPanel from '@/components/reaction/ReactionPanel/index';
import AddReactionButton from '@/components/reaction/AddReactionButton/index';
import { ArrowDownIcon } from '@/assets/icons';

const THEMES = ['blue', 'green', 'purple', 'beige', 'trans'];
// -> ㅇ 베이지, 퍼플, 블루, 그린으로 수정
// -> ㅇ 내림차순으로 정렬되는 코드 빼기~~ 백엔드에서 알아서 줍니다
// -> ㅇ 리액션바 css 컬러칩 헥사값 -> 변수값으로 변경하기
// -> ㅇ 컬러들 다 컬러칩 사용해서 변경
// -> ㅇ 이모티콘 추가버튼 currentColor 사용해서 변경해야함.. 테마별로 아이콘 색이 다름 ㅠㅠ
// -> 라우터부분 충돌 해결하기 (머지방법 노션 참고)
// -> 이모티콘 모듈 별도 외부에서 불러오는거 먼저 하기 (별도의 이슈,브랜치로 파기)

/**
 * 기본으로 제공할 이모지 목록
 */
const DEFAULT_EMOJIS = ['👍', '🙏', '🥺', '😍', '😂', '🎉'];

export default function ReactionBar({
  initialReactions,
  availableEmojis,
  theme,
}) {
  /**
   * reactions
   * - { [emoji]: count } 형태의 리액션 상태
   * - 실제 서비스에서는 서버 상태로 대체 가능
   */
  const [reactions, setReactions] = useState(initialReactions || {});
  /** 리액션 패널 열림 여부 */
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  /** 이모지 피커 열림 여부 */
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  /**
   * rootRef
   * - 바깥 클릭 감지를 위한 컨테이너 참조
   */
  const rootRef = useRef(null);

  // 상단 요약 바는 서버에서 내려준 순서를 그대로 사용
  const entries = useMemo(() => {
    return Object.entries(reactions);
  }, [reactions]);
  /** 리액션이 하나라도 있는지 여부 */
  const hasReactions = entries.length > 0;
  /** 사용할 이모지 목록 (props 우선, 없으면 기본값) */
  const emojis = availableEmojis?.length ? availableEmojis : DEFAULT_EMOJIS;

  const safeTheme = THEMES.includes(theme) ? theme : 'blue';

  /**
   * 모든 레이어를 닫는 공통 함수
   * - 바깥 클릭 / ESC 키 처리에서 재사용
   */
  const closeAll = () => {
    setIsPanelOpen(false);
    setIsPickerOpen(false);
  };

  // 바깥 클릭하면 닫기
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(e.target)) {
        closeAll();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAll();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  /**
   * 상단 요약 뱃지 클릭 시 해당 이모지 카운트 증가
   */
  const handleBadgeClick = (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
  };
  /**
   * ⌄ 버튼 클릭 시 상세 패널 토글
   */
  const handleTogglePanel = () => {
    setIsPanelOpen((v) => !v);
    setIsPickerOpen(false);
  };

  const handleAddClick = () => {
    // 클릭하면 이모지 피커 토글
    setIsPickerOpen((v) => !v);
    setIsPanelOpen(false);
  };
  /**
   * 이모지 피커에서 이모지 선택 시
   * - 리액션 카운트 증가
   * - 피커 닫기
   */
  const handlePickEmoji = (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
    setIsPickerOpen(false);
  };

  return (
    <div
      className={`${styles.container} ${styles[`theme_${safeTheme}`]}`}
      ref={rootRef}
    >
      {/* 상단 요약 바 */}
      <div className={styles.bar}>
        {hasReactions &&
          entries.map(([emoji, count]) => (
            <ReactionBadge
              key={emoji}
              emoji={emoji}
              count={count}
              onClick={() => handleBadgeClick(emoji)}
            />
          ))}

        {/* 리액션이 있을 때만 펼치기 버튼 노출 */}
        {hasReactions && (
          <button
            type="button"
            className={styles.expandButton}
            onClick={handleTogglePanel}
            aria-expanded={isPanelOpen}
            aria-label="리액션 목록 펼치기"
          >
            <ArrowDownIcon
              className={`${styles.expandIcon} ${isPanelOpen ? styles.open : ''}`}
              aria-hidden="true"
            />
          </button>
        )}
        {/* 리액션 추가 버튼 */}
        <AddReactionButton onClick={handleAddClick} />
      </div>

      {/* 상세 리액션 패널 */}
      {hasReactions && isPanelOpen && (
        <ReactionPanel reactions={reactions} onItemClick={handleBadgeClick} />
      )}

      {/* 간단 이모지 피커 */}
      {isPickerOpen && (
        <div className={styles.picker} role="menu" aria-label="이모지 선택">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className={styles.pickerItem}
              onClick={() => handlePickEmoji(emoji)}
              role="menuitem"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ReactionBar.propTypes = {
  initialReactions: PropTypes.objectOf(PropTypes.number),
  availableEmojis: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.oneOf(['blue', 'green', 'purple', 'beige', 'trans']),
};

ReactionBar.defaultProps = {
  initialReactions: {},
  availableEmojis: null,
  theme: 'blue',
};
