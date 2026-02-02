import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

import ReactionBadge from '@/components/reaction/ReactionBadge/index';
import ReactionPanel from '@/components/reaction/ReactionPanel/index';
import AddReactionButton from '@/components/reaction/AddReactionButton/index';
import EmojiPickerPopup from '@/components/reaction/EmojiPickerPopup';
import { ArrowDownIcon } from '@/assets/icons';
import { REACTION_THEMES } from '@/components/reaction/ReactionBadge/reactionMock';

const THEMES = ['blue', 'green', 'purple', 'beige', 'trans'];

export default function ReactionBar({ initialReactions, theme }) {
  const [reactions, setReactions] = useState(initialReactions || {});
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const rootRef = useRef(null);
  const addBtnRef = useRef(null);

  // 서버에서 내려준 순서를 그대로 사용
  const entries = useMemo(() => Object.entries(reactions), [reactions]);
  const hasReactions = entries.length > 0;
  // theme key 검증
  const safeTheme = THEMES.includes(theme) ? theme : 'blue';

  // ReactionBadge에 넘길 값
  const themeObj = useMemo(() => {
    return REACTION_THEMES?.[safeTheme] ?? REACTION_THEMES.blue;
  }, [safeTheme]);

  // ReactionBar의 외부 클릭 / ESC는 패널만 닫음
  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  // 바깥 클릭 -> 패널만 닫기
  useEffect(() => {
    if (!isPanelOpen) {
      return;
    }

    const handlePointerDown = (e) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(e.target)) {
        closePanel();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isPanelOpen, closePanel]);

  // ESC -> 패널만 닫기
  useEffect(() => {
    if (!isPanelOpen) {
      return;
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePanel();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isPanelOpen, closePanel]);

  const handleBadgeClick = useCallback((emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
  }, []);

  const handleTogglePanel = useCallback(() => {
    setIsPanelOpen((v) => !v);
    setIsPickerOpen(false);
  }, []);

  const handlePickEmoji = useCallback((emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
    setIsPickerOpen(false);
  }, []);

  // Add 버튼 클릭 -> 피커 토글 및 패널 닫기
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
              theme={themeObj}
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

        {/* wrapper div 제거 -> AddReactionButton이 ref를 직접 받음 */}
        <AddReactionButton ref={addBtnRef} onClick={handleOpenPicker} />
      </div>

      {/* 상세 리액션 패널 */}
      {hasReactions && isPanelOpen && (
        <ReactionPanel reactions={reactions} onItemClick={handleBadgeClick} />
      )}

      {/* emoji-picker 팝업 */}
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
  theme: PropTypes.oneOf(['blue', 'green', 'purple', 'beige', 'trans']),
};

ReactionBar.defaultProps = {
  initialReactions: {},
  theme: 'blue',
};
