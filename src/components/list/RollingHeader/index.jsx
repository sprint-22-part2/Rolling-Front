import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import ReactionBar from '@/components/reaction/ReactionBar';

import { ShareIcon, EditIcon, DeletedIcon } from '@/assets/icons';

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
        {/* 이모지 영역 ReactionBar */}
        <ReactionBar
          theme={theme}
          initialReactions={{
            '🥲': 23,
          }}
        />
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
