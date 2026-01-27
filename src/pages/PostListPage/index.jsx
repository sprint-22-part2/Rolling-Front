import styles from './index.module.css';
import PopularRolling from '../../components/RollingList/PopularRolling';
import RecentRolling from '../../components/RollingList/RecentRolling';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
function RollingListPage() {
=======
function PostListPage({ theme = 'yellow' }) {
>>>>>>> 5d01d54 (✨[feat]:post 페이지 구현)
  return (
    <div className={styles.rollingList}>
      <section className={styles.sectionRollingList}>
        <h2>인기 롤링 페이퍼 🔥</h2>
        <PopularRolling />
      </section>
      <section className={styles.sectionRollingList}>
        <div className={styles.sectionTop}>
          <h2>최근에 만든 롤링 페이퍼 ⭐️️</h2>
          <Link to="/" className={styles.makeButton}>
            + 롤링 페이퍼 만들기
          </Link>
        </div>
        <RecentRolling />
      </section>
    </div>
  );
}

export default RollingListPage;
