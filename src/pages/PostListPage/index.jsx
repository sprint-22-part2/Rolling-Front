import styles from './index.module.css';
// import PropTypes from 'prop-types';
import RollingHeader from '@/components/MessageList/RollingHeader';
import MessageWrap from '@/components/MessageList/MessageWrap';

function PostListPage() {
  return (
    <div className={`${styles.postList}`}>
      <section className={styles.sectionPostList}>
        <RollingHeader />
        <MessageWrap />
      </section>
    </div>
  );
}

export default PostListPage;
