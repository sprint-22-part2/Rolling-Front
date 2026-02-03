import PropTypes from 'prop-types';
import styles from './index.module.css';

import Modal from '@/components/modal/Modal';
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
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="메시지 모달"
      closeOnOverlayClick
      closeOnEsc
    >
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <ProfileImage
            src={profileSrc}
            alt={`${name}의 프로필 이미지`}
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
    </Modal>
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
