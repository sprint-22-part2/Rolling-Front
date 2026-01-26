import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import LogoImage from '@/assets/logo/logo.svg';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <h1>
          <img src={LogoImage} alt="logo image" className={styles.logoImage} />
        </h1>
        <Link to="/">롤링 페이퍼 만들기</Link>
      </div>
    </header>
  );
}

export default Header;
