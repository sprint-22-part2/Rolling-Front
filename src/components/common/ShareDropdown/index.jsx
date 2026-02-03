import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

export default function ShareDropdown({ open, onClose, onSelect }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event) => {
      if (!dropdownRef.current) {
        return;
      }

      if (!dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef} role="menu">
      <button
        type="button"
        className={styles.item}
        onClick={() => onSelect('kakao')}
        role="menuitem"
      >
        카카오톡 공유
      </button>
      <button
        type="button"
        className={styles.item}
        onClick={() => onSelect('url')}
        role="menuitem"
      >
        URL 공유
      </button>
    </div>
  );
}

ShareDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
