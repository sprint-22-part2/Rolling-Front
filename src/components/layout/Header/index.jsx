import styles from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import LogoImage from '@/assets/logo/logo.svg';

function Header() {
  const { pathname } = useLocation();
  const isPostPage = pathname === '/post/create';

  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <h1>
          <Link to="/">
            <img
              src={LogoImage}
              alt="logo image"
              className={styles.logoImage}
            />
          </Link>
        </h1>
        {!isPostPage && <Link to="/">롤링 페이퍼 만들기</Link>}
      </div>
    </header>
  );
}

export default Header;
