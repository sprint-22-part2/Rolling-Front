import styles from './index.module.css';

import {
  ShareIcon,
  EditIcon,
  DeletedIcon,
  ArrowDownIcon,
  ImojiIcon,
} from '@/assets/icons';

function RollingHeader() {
  return (
    <div className={styles.rollingHeader}>
      <div className={styles.rollingHeaderTop}>
        <div className={styles.recipient}>
          <span className={styles.to}>To</span>
          <p className={styles.name}>ABC김송현asasasdad현hihihi</p>
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
        <div className={styles.numberAuthorsWrap}>
          <div className={styles.profilePhotos}>
            <span className={styles.profilePhoto}>1</span>
            <span className={styles.profilePhoto}>2</span>
            <span className={styles.profilePhoto}>3</span>
            <span className={styles.plusNum}>+34</span>
          </div>
          <div className={styles.numberAuthor}>
            <span className={styles.number}>30</span>명이 작성했어요!
          </div>
        </div>
      </div>
    </div>
  );
}

export default RollingHeader;
