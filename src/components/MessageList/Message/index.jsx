import styles from './index.module.css';
import PropTypes from 'prop-types';

import { DeletedIcon } from '@/assets/icons';
function Message({ senderName = 'senderName' }) {
  return (
    <>
      <div className={styles.messageHeader}>
        <div className={styles.senderImg}>
          <img src="" alt="az" />
        </div>
        <div className={styles.senderWrap}>
          <div className={styles.sender}>
            <p className={styles.from}>From</p>
            <p className={styles.senderName}>{senderName}</p>
          </div>
          <div className={styles.relation}>형제</div>
        </div>
      </div>
      <div className={styles.messageContent}>
        코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
        하세요! 건강, 체력 모두 코로나가 또다시 기승을 부리는 요즘이네요. 건강,
        체력 모두 조심 또 하세요! 건강, 체력 모두 코로나가 또다시 기승을 부리는
        요즘이네요. 건강, 체력 모두 조심 또 하세요! 건강, 체력 모두 코로나가
        또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 건강,
        체력 모두 조심 또 하세요! 건강, 체력 모두 조심 또 하세요!
      </div>
      <div className={styles.messageFoot}>
        <span className={styles.data}>2023.07.08</span>
        <button>
          <DeletedIcon />
          삭제
        </button>
      </div>
    </>
  );
}
Message.propTypes = {
  senderName: PropTypes.string.isRequired,
};
export default Message;
