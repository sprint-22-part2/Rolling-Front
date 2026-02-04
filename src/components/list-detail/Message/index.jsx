import { FONT_MAP } from '@/constants/editor';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileImage from '@/components/common/ProfileImage';
import RelationshipBadge from '@/components/common/RelationshipBadge';
import { DeletedIcon } from '@/assets/icons';
import Button from '@/components/common/Button';
import { formatDate } from '@/utils/dateFormat';
import EditorViewer from '@/components/message/EditorViewer';

function Message({
  senderName,
  profileImageURL,
  relationship,
  content,
  font,
  createdAt,
  isEditMode,
  theme,
  id,
  onDelete,
}) {
  const handleDeleteClick = (e) => {
    e.stopPropagation();

    onDelete(id);
  };

  const deleteBtnVariant =
    theme === 'image' ? 'variantSmallWhiteText' : 'variantSmallText';

  return (
    <article>
      <div className={styles.messageHeader}>
        <ProfileImage src={profileImageURL} />
        <div className={styles.senderWrap}>
          <div className={styles.sender}>
            <p className={styles.from}>From</p>
            <p className={styles.senderName}>{senderName}</p>
          </div>
          <RelationshipBadge relationship={relationship} />
        </div>
      </div>

      <div
        className={`${styles.messageContent} ${styles[font]}`}
        style={{ fontFamily: FONT_MAP[font] }}
      >
        <EditorViewer content={content} currentFont={FONT_MAP[font] ?? font} />
      </div>

      <div className={styles.messageFoot}>
        <span className={styles.data}>{formatDate(createdAt)}</span>

        {/* 편집 모드일 때만 삭제 버튼 노출 */}
        {isEditMode && (
          <Button
            variant={deleteBtnVariant}
            onClick={handleDeleteClick}
            leftIcon={<DeletedIcon />}
            className={styles.deleteBtn}
          >
            삭제
          </Button>
        )}
      </div>
    </article>
  );
}

Message.propTypes = {
  senderName: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string,
  relationship: PropTypes.oneOf(['지인', '동료', '가족', '친구']).isRequired,
  content: PropTypes.string.isRequired,
  font: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
  theme: PropTypes.string,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

export default Message;
