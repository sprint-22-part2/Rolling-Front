import styles from './index.module.css';
import NoMessage from '@/components/message-list/NoMessage';
import AddMessage from '@/components/message-list/AddMessage';
import Message from '@/components/message-list/Message';

function MessageWrap() {
  return (
    <div className={styles.messageWrap}>
      <NoMessage />
      <div className={styles.hasMessage}>
        <div className={styles.messageItem}>
          <AddMessage />
        </div>
        <div className={styles.messageItem}>
          <Message />
        </div>
      </div>
    </div>
  );
}

export default MessageWrap;
