import styles from './Footer.module.css';
import LogoImage from '@/assets/logo/logo.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrap}>
        <div className={styles.footLogo}>
          <img src={LogoImage} alt="logo image" className={styles.logoImage} />
        </div>
        <div className={styles.memberWrap}>
          <p className={styles.title}>Members</p>
          <ul className={styles.members}>
            <li className={styles.member}>Kim HyunJin</li>
            <li className={styles.member}>Kim SongHyun</li>
            <li className={styles.member}>Nam BitNa</li>
            <li className={styles.member}>Lee SeoJeong</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
