import styles from './index.module.css';
import PopularRolling from '@/components/main/PopularRolling';
import RecentRolling from '@/components/main/RecentRolling';
import LinkButton from '@/components/common/LinkButton';

function MainPage() {
  return (
    <div className={styles.rollingList}>
      <section className={styles.sectionRollingList}>
        <h2>인기 롤링 페이퍼 🔥</h2>
        <PopularRolling />
      </section>
      <section className={styles.sectionRollingList}>
        <div className={styles.sectionTop}>
          <h2>최근에 만든 롤링 페이퍼 ⭐️️</h2>
          <LinkButton
            to={`/post`}
            variant="variantMiddleText"
            className={styles.makeButton}
          >
            + 롤링 페이퍼 만들기
          </LinkButton>
        </div>
        <RecentRolling />
      </section>
    </div>
  );
}

export default MainPage;
