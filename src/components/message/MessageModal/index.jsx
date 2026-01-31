import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

import Button from '@/components/common/Button';
import ProfileImage from '@/components/common/ProfileImage';
import RelationshipBadge from '@/components/common/RelationshipBadge';

export default function MessageModal({
  isOpen,
  onClose,
  onConfirm,
  profileSrc,
  name,
  relationship,
  date,
  content,
}) {
  // ESC로 닫기
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    // 필요하면 확인 시 추가 로직 실행
    onConfirm?.();
    // 모달 닫기
    onClose();
  };

  const handleOverlayPointerDownCapture = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
      onPointerDownCapture={handleOverlayPointerDownCapture}
    >
      {/* 모달 내부 클릭은 닫히지 않게 막기 */}
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="메시지 모달"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <header className={styles.modalHeader}>
          <ProfileImage
            src={profileSrc}
            alt="profile"
            size={56}
            borderColor="var(--gray-200)"
            borderWidth={1}
            className={styles.profile}
          />

          <div className={styles.meta}>
            <div className={styles.modalInfo}>
              <div className={styles.nameRow}>
                <span className={styles.from}>From.</span>
                <span className={styles.name}>{name}</span>
              </div>

              <RelationshipBadge relationship={relationship} />
            </div>

            <div className={styles.date}>{date}</div>
          </div>
        </header>

        <div className={styles.divider} />

        <div className={styles.modalContent}>{content}</div>

        <div className={styles.actions}>
          <Button
            size="sizeMd"
            variant="variantPrimary"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

MessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  profileSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  relationship: PropTypes.oneOf(['지인', '동료', '가족', '친구']).isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

MessageModal.defaultProps = {
  onConfirm: null,
};
