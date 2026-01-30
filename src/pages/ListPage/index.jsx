import styles from './index.module.css';
import PropTypes from 'prop-types';
import RollingHeader from '@/components/list/RollingHeader';
import MessageWrap from '@/components/list/MessageWrap';

function ListPage({ theme = 'yellow' }) {
  return (
    <div className={`${styles.postList} ${styles[theme]}`} type={theme}>
      <section className={styles.sectionPostList}>
        <RollingHeader />
        <MessageWrap />
      </section>
    </div>
  );
}
ListPage.propTypes = {
  theme: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
};
export default ListPage;
