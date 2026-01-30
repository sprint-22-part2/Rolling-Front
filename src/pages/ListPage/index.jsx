import styles from './index.module.css';
import PropTypes from 'prop-types';
import RollingHeader from '@/components/message-list/RollingHeader';
import MessageWrap from '@/components/message-list/MessageWrap';

function PostListPage({ theme = 'yellow' }) {
  return (
    <div className={`${styles.postList} ${styles[theme]}`} type={theme}>
      <section className={styles.sectionPostList}>
        <RollingHeader />
        <MessageWrap />
      </section>
    </div>
  );
}
PostListPage.propTypes = {
  theme: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
};
export default PostListPage;
