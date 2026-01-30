import styles from './index.module.css';
import LogoImage from '@/assets/logo/logo.svg';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.logoWrapper}>
        <img src={LogoImage} alt="Rolling 로고" className={styles.logoImage} />
      </div>

      <h2 className={styles.title}>
        마음을 모으는 가장 쉬운 방법
        <br />
        로그인 없이 만드는 온라인 롤링 페이퍼
      </h2>
    </section>
  );
}

export default HeroSection;
