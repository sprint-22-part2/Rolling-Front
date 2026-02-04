import styles from './index.module.css';
import PropTypes from 'prop-types';
import { PlusIcon } from '@/assets/icons';
import LinkButton from '@/components/common/LinkButton';
import NoMessage from '@/components/list-detail/NoMessage';
import Message from '@/components/list-detail/Message';

function MessageWrap({
  isEditMode,
  messages,
  recipientName,
  theme,
  onDelete,
  recipientId,
}) {
  const addButtonVariant =
    theme === 'image' ? 'variantWhiteCircle' : 'variantCircle';

  // 메세지 하나도 없을 때
  if (!messages || messages.length === 0) {
    return (
      <div className={styles.messageWrap}>
        <NoMessage recipientName={recipientName} recipientId={recipientId} />
      </div>
    );
  }

  // 메세지가 있을 때
  return (
    <div className={styles.messageWrap}>
      <div className={styles.hasMessage}>
        {/* 편집 모드가 아닐 때 '메세지 추가하기' 노출 */}
        {!isEditMode && (
          <div className={styles.messageItem}>
            <LinkButton
              to={`/post/${recipientId}/message`}
              variant={addButtonVariant}
              leftIcon={<PlusIcon />}
              className={styles.addButtonLink}
            >
              메시지 추가하기
            </LinkButton>
          </div>
        )}

        {/* 메세지 리스트 렌더링 */}
        {messages.map((message) => (
          <div key={message.recipientId} className={styles.messageItem}>
            <Message
              isEditMode={isEditMode}
              senderName={message.sender}
              profileImageURL={message.profileImageURL}
              relationship={message.relationship}
              content={message.content}
              font={message.font}
              createdAt={message.createdAt}
              theme={theme}
              id={message.recipientId}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

MessageWrap.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  messages: PropTypes.array,
  recipientName: PropTypes.string,
  theme: PropTypes.string,
  onDelete: PropTypes.func,
  recipientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default MessageWrap;
