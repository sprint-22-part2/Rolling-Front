import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';

export default function EmojiPickerPopup({ open, onClose, onPick, anchorRef }) {
  const popupRef = useRef(null);
  const rafIdRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // ✅ 뷰포트 기준 좌표 계산 (portal + position: fixed 전제)
  const calcPos = useCallback(() => {
    const anchorEl = anchorRef?.current;
    if (!anchorEl) {
      return null;
    }

    const rect = anchorEl.getBoundingClientRect();
    const gap = 8;

    // 기본: 버튼 아래에 붙이기
    let top = rect.bottom + gap;
    let left = rect.left;

    // ✅ 화면 밖으로 나가면 위로 띄우기(간단 안정화)
    const pickerHeight = 435; // 대략값(테마/옵션 따라 조금 변함)
    const pickerWidth = 350; // 대략값
    const margin = 8;

    // 아래로 내리면 화면 밖이면 위로
    if (top + pickerHeight > window.innerHeight - margin) {
      top = Math.max(margin, rect.top - gap - pickerHeight);
    }

    // 오른쪽으로 넘치면 왼쪽으로 당기기
    if (left + pickerWidth > window.innerWidth - margin) {
      left = Math.max(margin, window.innerWidth - margin - pickerWidth);
    }

    return { top, left };
  }, [anchorRef]);

  // ✅ open 동안 resize/scroll에 따라 위치 재계산 (requestAnimationFrame으로 스로틀링)
  useEffect(() => {
    if (!open) {
      return;
    }

    const update = () => {
      const next = calcPos();
      if (!next) {
        return;
      }

      setPos((prev) => {
        if (prev.top === next.top && prev.left === next.left) {
          return prev;
        }
        return next;
      });
    };

    const scheduleUpdate = () => {
      if (rafIdRef.current) {
        return;
      }
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('scroll', scheduleUpdate, true);

    return () => {
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate, true);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [open, calcPos]);

  // ✅ 바깥 클릭 / ESC 닫기
  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (e) => {
      const popupEl = popupRef.current;
      const anchorEl = anchorRef?.current;
      if (!popupEl) {
        return;
      }

      const clickedOutsidePopup = !popupEl.contains(e.target);
      const clickedOutsideAnchor = anchorEl
        ? !anchorEl.contains(e.target)
        : true;

      if (clickedOutsidePopup && clickedOutsideAnchor) {
        onClose();
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, anchorRef]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      ref={popupRef}
      className={styles.popup}
      role="dialog"
      aria-label="이모지 선택"
      style={{ top: pos.top, left: pos.left }}
    >
      <EmojiPicker
        // ✅ emoji-picker-react: 이모지 문자열은 emojiData.emoji
        onEmojiClick={(emojiData) => onPick(emojiData.emoji)}
        // UX 옵션(원하는대로)
        searchPlaceholder="Search"
        width={350}
        height={435}
        skinTonesDisabled
        previewConfig={{ showPreview: false }}
      />
    </div>,
    document.body
  );
}

EmojiPickerPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPick: PropTypes.func.isRequired,
  anchorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

EmojiPickerPopup.defaultProps = {
  anchorRef: null,
};
