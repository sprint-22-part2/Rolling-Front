import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './index.module.css';

export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
  closeOnOverlayClick,
  closeOnEsc,
}) {
  // ESC로 닫기
  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // 열렸을 때 body 스크롤 잠금
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayPointerDownCapture = (e) => {
    if (!closeOnOverlayClick) {
      return;
    }
    // overlay 자체를 누른 경우에만 닫기
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  return createPortal(
    <div
      className={styles.overlay}
      role="presentation"
      onPointerDownCapture={handleOverlayPointerDownCapture}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
};

Modal.defaultProps = {
  ariaLabel: 'modal',
  closeOnOverlayClick: true,
  closeOnEsc: true,
};
