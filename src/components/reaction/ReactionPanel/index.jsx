import PropTypes from 'prop-types';
import styles from './index.module.css';
import { useEffect, useRef } from 'react';

/**
 * ReactionPanel
 * - ⌄ 버튼 클릭 시 열리는 "리액션 상세 패널"
 * - 각 이모지와 누적 카운트를 그리드 형태로 표시
 */
export default function ReactionPanel({ reactions, onItemClick, onClose }) {
  const panelRef = useRef(null);
  /**
   * reactions 객체를 배열로 변환 후
   * 많이 눌린 리액션이 위에 오도록 내림차순 정렬
   */
  const entries = Object.entries(reactions).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      // 패널(ref)이 존재하고, 클릭한 대상이 패널 내부에 있지 않을 때만 onClose 호출
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className={styles.panel}
      role="dialog"
      aria-label="리액션 목록"
    >
      {/* 이모지 + 카운트를 그리드 레이아웃으로 배치 */}
      <div className={styles.panelGrid}>
        {entries.map(([emoji, count]) => (
          /**
           * 각 리액션 항목
           * - 버튼으로 만들어 클릭 시 해당 이모지에 반응 추가 가능
           */
          <button
            key={emoji}
            type="button"
            className={styles.panelItem}
            onClick={() => onItemClick?.(emoji)}
          >
            {/* 이모지 표시 */}
            <span className={styles.panelEmoji}>{emoji}</span>
            {/* 해당 이모지의 누적 카운트 */}
            <span className={styles.panelCount}>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

ReactionPanel.propTypes = {
  reactions: PropTypes.objectOf(PropTypes.number).isRequired,
  onItemClick: PropTypes.func,
  onClose: PropTypes.func,
};

ReactionPanel.defaultProps = {
  onItemClick: null,
  onClose: null,
};
