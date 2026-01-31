import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import {
  ShareIcon,
  EditIcon,
  DeletedIcon,
  ArrowDownIcon,
  ImojiIcon,
} from '@/assets/icons';

function RollingHeader({
  theme = 'blue',
  recipientName = 'recipientName',
  isEditMode,
  setIsEditMode,
  hasMessages,
  recentMessages = [],
  messageCount = 0,
  topReactions = [],
}) {
  const handleEdit = () => setIsEditMode(true);
  const handleSave = () => setIsEditMode(false);

  const profiles = recentMessages.map((msg) => ({
    id: msg.id,
    src: msg.profileImageURL,
    alt: msg.sender,
  }));

  return (
    <div className={styles.rollingHeader} type={theme}>
      <div className={styles.rollingHeaderTop}>
        <div className={styles.recipient}>
          <span className={styles.to}>To</span>
          <p className={styles.name}>{recipientName}</p>
        </div>

        {hasMessages && (
          <div className={styles.rollingButtons}>
            {!isEditMode ? (
              <>
                <button>
                  <ShareIcon />
                  공유하기
                </button>
                <button onClick={handleEdit}>
                  <EditIcon />
                  편집하기
                </button>
              </>
            ) : (
              <>
                <button>
                  <DeletedIcon />
                  롤링페이퍼 삭제하기
                </button>
                <button onClick={handleSave}>편집 완료</button>
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.rollingHeaderBottom}>
        <div className={styles.emojis}>
          {topReactions.map((reaction) => (
            <div key={reaction.id} className={styles.emoji}>
              {reaction.emoji} {reaction.count}
            </div>
          ))}

          <button className={styles.moreEmoji}>
            <ArrowDownIcon />
          </button>
          <button className={styles.addEmoji}>
            <ImojiIcon />
          </button>
        </div>
        <ProfileGroup profiles={profiles} messageCount={messageCount} />
      </div>
    </div>
  );
}

RollingHeader.propTypes = {
  theme: PropTypes.string,
  recipientName: PropTypes.string,
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
  hasMessages: PropTypes.bool.isRequired,
  recentMessages: PropTypes.array,
  messageCount: PropTypes.number,
  topReactions: PropTypes.array,
};

export default RollingHeader;
