import styles from './index.module.css';
import LinkButton from '@/components/common/LinkButton';
import PropTypes from 'prop-types';

function NoMessage({ recipientName }) {
  return (
    <div className={styles.noMessageBox}>
      <p className={styles.notiMessage}>
        작성된 메세지가 없습니다.
        <br />
        처음으로 {recipientName}님에게 메세지를 남겨보세요.
      </p>
      <LinkButton to="/post/message" size="sizeLg">
        메세지 남기기
      </LinkButton>
    </div>
  );
}

NoMessage.propTypes = {
  recipientName: PropTypes.string,
};

export default NoMessage;
