import styles from './index.module.css';
import AirplaneIcon from '@/assets/icons/ic-favicon.svg';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.logoWrapper}>
        <img src={AirplaneIcon} alt="비행기 아이콘" className={styles.icon} />
        <span className={styles.logoText}>Rolling</span>
      </div>

      <h1 className={styles.title}>
        마음을 모으는 가장 쉬운 방법
        <br />
        로그인 없이 만드는 온라인 롤링 페이퍼
      </h1>
    </section>
  );
}

export default HeroSection;
