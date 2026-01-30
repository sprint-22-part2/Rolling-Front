import styles from './index.module.css';
import { Link } from 'react-router-dom';

function NoMessage() {
  return (
    <div className={styles.noMessageBox}>
      <p className={styles.notiMessage}>
        작성된 메세지가 없습니다.
        <br />
        처음으로 SongHunyKimaa님에게 메세지를 남겨보세요.
      </p>
      <Link>메세지 남기기</Link>
    </div>
  );
}

export default NoMessage;
