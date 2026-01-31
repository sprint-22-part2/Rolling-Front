import { FONT_MAP } from '@/constants/editor';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileImage from '@/components/common/ProfileImage';
import RelationshipBadge from '@/components/common/RelationshipBadge';
import { DeletedIcon } from '@/assets/icons';

function Message({
  senderName,
  profileImageURL,
  relationship,
  content,
  font,
  createdAt,
  isEditMode,
}) {
  const handleDelete = () => {
    console.log('카드 삭제 클릭');
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

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
        {content}
      </div>

      <div className={styles.messageFoot}>
        <span className={styles.data}>{formatDate(createdAt)}</span>

        {/* 편집 모드일 때만 삭제 버튼 노출 */}
        {isEditMode && (
          <button onClick={handleDelete}>
            <DeletedIcon />
            삭제
          </button>
        )}
      </div>
    </article>
  );
}

Message.propTypes = {
  senderName: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string,
  relationship: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  font: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
};

export default Message;
