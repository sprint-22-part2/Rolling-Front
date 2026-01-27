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

function RollingHeader({ theme = 'blue', recipientName = 'recipientName' }) {
  return (
    <div className={styles.rollingHeader} type={theme}>
      <div className={styles.rollingHeaderTop}>
        <div className={styles.recipient}>
          <span className={styles.to}>To</span>
          <p className={styles.name}>{recipientName}</p>
        </div>
        <div className={styles.rollingButtons}>
          <button>
            <ShareIcon />
            공유하기
          </button>
          <button>
            <EditIcon />
            편집하기
          </button>
          <button>
            <DeletedIcon />
            롤링페이퍼 삭제하기
          </button>
        </div>
      </div>
      <div className={styles.rollingHeaderBottom}>
        <div className={styles.emojis}>
          <div className={styles.emoji}>🥲 23</div>
          <div className={styles.emoji}>🥲 203</div>
          <div className={styles.emoji}>🥲 2663</div>
          <button className={styles.moreEmoji}>
            <ArrowDownIcon />
          </button>
          <button className={styles.addEmoji}>
            <ImojiIcon />
          </button>
        </div>
        {/* <div className={styles.numberAuthorsWrap}>
          <div className={styles.profilePhotos}>
            <span className={styles.profilePhoto}>1</span>
            <span className={styles.profilePhoto}>2</span>
            <span className={styles.profilePhoto}>3</span>
            <span className={styles.plusNum}>+34</span>
          </div>
          <div className={styles.numberAuthor}>
            <span className={styles.number}>30</span>명이 작성했어요!
          </div>
        </div> */}
        <ProfileGroup />
      </div>
    </div>
  );
}

RollingHeader.propTypes = {
  theme: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
};
export default RollingHeader;
