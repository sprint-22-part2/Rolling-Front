import styles from './index.module.css';
import NoMessage from '@/components/MessageList/NoMessage';
import AddMessage from '@/components/MessageList/AddMessage';
import Message from '@/components/MessageList/Message';

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
