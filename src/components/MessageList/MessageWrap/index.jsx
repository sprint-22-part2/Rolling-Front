import styles from './index.module.css';
import NoMessage from '@/components/MessageList/NoMessage';
import AddMessage from '@/components/MessageList/AddMessage';
import Message from '@/components/MessageList/Message';

function MessageWrap() {
  <div className={styles.messageWrap}>
    <NoMessage />
    <AddMessage />
    <Message />
  </div>;
}

export default MessageWrap;
