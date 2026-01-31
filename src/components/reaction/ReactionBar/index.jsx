import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

import ReactionBadge from '@/components/reaction/ReactionBadge/index';
import ReactionPanel from '@/components/reaction/ReactionPanel/index';
import AddReactionButton from '@/components/reaction/AddReactionButton/index';
import EmojiPickerPopup from '@/components/reaction/EmojiPickerPopup';
import { ArrowDownIcon } from '@/assets/icons';

const THEMES = ['blue', 'green', 'purple', 'beige', 'trans'];

export default function ReactionBar({ initialReactions, theme }) {
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
  const safeTheme = THEMES.includes(theme) ? theme : 'blue';

  // 바깥 클릭하면 닫기
  useEffect(() => {
    const handlePointerDown = (e) => {
      // 패널이 열려있고, 클릭이 rootRef 요소 외부에서 발생했을 때만 패널을 닫습니다.
      if (
        isPanelOpen &&
        rootRef.current &&
        !rootRef.current.contains(e.target)
      ) {
        setIsPanelOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      // 패널이 열려있을 때 ESC 키를 누르면 패널을 닫습니다.
      if (isPanelOpen && e.key === 'Escape') {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPanelOpen]); // 의존성 배열에 isPanelOpen을 추가합니다.

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

  const addBtnRef = useRef(null);

  const handleOpenPicker = useCallback(() => {
    setIsPickerOpen((v) => !v);
    setIsPanelOpen(false);
  }, []);

  const handleClosePicker = useCallback(() => {
    setIsPickerOpen(false);
  }, []);

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
        <div ref={addBtnRef}>
          <AddReactionButton onClick={handleOpenPicker} />
        </div>
      </div>

      {/* 상세 리액션 패널 */}
      {hasReactions && isPanelOpen && (
        <ReactionPanel reactions={reactions} onItemClick={handleBadgeClick} />
      )}

      {/* emoji-mart 팝업 */}
      <EmojiPickerPopup
        open={isPickerOpen}
        onClose={handleClosePicker}
        onPick={handlePickEmoji}
        anchorRef={addBtnRef}
      />
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
