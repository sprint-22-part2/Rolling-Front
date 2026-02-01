import PropTypes from 'prop-types';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import EmojiPicker from 'emoji-picker-react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';

const ANCHOR_GAP = 8;
const VIEWPORT_MARGIN = 8;
const PICKER_FALLBACK_HEIGHT = 435;
const PICKER_FALLBACK_WIDTH = 350;

export default function EmojiPickerPopup({ open, onClose, onPick, anchorRef }) {
  const popupRef = useRef(null);
  const rafIdRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // 뷰포트 기준 좌표 계산
  const calcPos = useCallback(() => {
    const anchorEl = anchorRef?.current;
    if (!anchorEl) {
      return null;
    }

    const rect = anchorEl.getBoundingClientRect();

    // 기본: 버튼 아래에 붙이기
    let top = rect.bottom + ANCHOR_GAP;
    let left = rect.left;

    // 화면 밖으로 나가면 위로 띄우기(간단 안정화)
    const pickerHeight =
      popupRef.current?.offsetHeight ?? PICKER_FALLBACK_HEIGHT;
    const pickerWidth = popupRef.current?.offsetWidth ?? PICKER_FALLBACK_WIDTH;

    // 아래로 내리면 화면 밖이면 위로
    if (top + pickerHeight > window.innerHeight - VIEWPORT_MARGIN) {
      top = Math.max(VIEWPORT_MARGIN, rect.top - ANCHOR_GAP - pickerHeight);
    }

    // 뷰포트 경계에 맞게 가로 위치 조정
    left = Math.min(left, window.innerWidth - pickerWidth - VIEWPORT_MARGIN);
    left = Math.max(left, VIEWPORT_MARGIN);

    return { top, left };
  }, [anchorRef]);

  // open 동안 resize/scroll에 따라 위치 재계산
  useLayoutEffect(() => {
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

  return createPortal(
    <div
      ref={popupRef}
      className={styles.popup}
      role="dialog"
      aria-label="이모지 선택"
      style={{ top: pos.top, left: pos.left }}
    >
      <EmojiPicker
        // 이모지 문자열은 emojiData.emoji
        onEmojiClick={(emojiData) => onPick(emojiData.emoji)}
        searchPlaceholder="Search"
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
