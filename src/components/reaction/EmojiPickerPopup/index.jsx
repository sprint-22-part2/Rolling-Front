import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import styles from './index.module.css';

export default function EmojiPickerPopup({ open, onClose, onPick, anchorRef }) {
  const popupRef = useRef(null);
  const rafIdRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // 뷰포트 기준 좌표만 사용
  const calcPos = useCallback(() => {
    const anchorEl = anchorRef?.current;
    if (!anchorEl) {
      return null;
    }

    const rect = anchorEl.getBoundingClientRect();
    const gap = 8;

    return {
      top: rect.bottom + gap,
      left: rect.left,
    };
  }, [anchorRef]);

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

  // 바깥 클릭 / ESC 닫기
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

  return (
    <div
      ref={popupRef}
      className={styles.popup}
      role="dialog"
      aria-label="이모지 선택"
      style={{
        top: pos.top,
        left: pos.left,
      }}
    >
      <Picker
        data={data}
        theme="light"
        previewPosition="none"
        onEmojiSelect={(emoji) => onPick(emoji.native)}
      />
    </div>
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
