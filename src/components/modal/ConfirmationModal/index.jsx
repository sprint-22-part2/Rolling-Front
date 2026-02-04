import PropTypes from 'prop-types';
import styles from './index.module.css';

import Modal from '@/components/modal/Modal';
import Button from '@/components/common/Button';
import { useCallback } from 'react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText,
  confirmButtonProps,
  cancelButtonProps,
}) {
  const handleConfirm = useCallback(async () => {
    await onConfirm?.();
    onClose();
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={title}
      closeOnOverlayClick
      closeOnEsc
    >
      <div className={styles.modal}>
        <p className={styles.title}>{title}</p>
        <div className={styles.actions}>
          <Button
            type="button"
            size="sizeSm"
            variant="variantPrimary"
            onClick={handleConfirm}
            {...confirmButtonProps}
          >
            {confirmText}
          </Button>

          <Button
            type="button"
            size="sizeSm"
            className={styles.cancelButton}
            onClick={handleCancel}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  title: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
};

ConfirmModal.defaultProps = {
  onConfirm: null,
  confirmText: '삭제',
  cancelText: '아니오',
  confirmButtonProps: {},
  cancelButtonProps: {},
};
