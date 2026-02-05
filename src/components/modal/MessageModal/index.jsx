import PropTypes from 'prop-types';
import styles from './index.module.css';

import Modal from '@/components/modal/Modal';
import Button from '@/components/common/Button';
import ProfileImage from '@/components/common/ProfileImage';
import RelationshipBadge from '@/components/common/RelationshipBadge';
import EditorViewer from '@/components/message/EditorViewer';
import { FONT_MAP } from '@/constants/editor';

export default function MessageModal({
  isOpen,
  onClose,
  onConfirm,
  profileSrc,
  name,
  relationship,
  date,
  content,
  font,
}) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const safeFont = FONT_MAP[font] ?? 'inherit';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="메시지 모달"
      closeOnOverlayClick
      closeOnEsc
    >
      <header className={styles.modalHeader}>
        <div className={styles.meta}>
          <ProfileImage
            src={profileSrc}
            alt={`${name}의 프로필 이미지`}
            size={56}
            borderColor="var(--gray-200)"
            borderWidth={1}
            className={styles.profile}
          />
          <div className={styles.modalInfo}>
            <div className={styles.nameRow}>
              <div className={styles.fromAndBadge}>
                <span className={styles.from}>From</span>
                <RelationshipBadge relationship={relationship} />
              </div>
              <span className={styles.name}>{name}</span>
            </div>
          </div>
        </div>
        <div className={styles.date}>{date}</div>
      </header>

      <div className={styles.modalContent} style={{ fontFamily: safeFont }}>
        <EditorViewer content={content} currentFont={safeFont} />
      </div>

      <div className={styles.actions}>
        <Button size="sizeMd" variant="variantPrimary" onClick={handleConfirm}>
          확인
        </Button>
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
  font: PropTypes.string,
};

MessageModal.defaultProps = {
  onConfirm: null,
};
