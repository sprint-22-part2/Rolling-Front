import styles from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import LogoImage from '@/assets/logo/logo.svg';
import LinkButton from '@/components/common/LinkButton';

function Header() {
  const { pathname } = useLocation();
  const isPostPage = pathname === '/post';
  const isMessagePage = pathname === '/post/message';

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
        {!isPostPage && !isMessagePage && (
          <LinkButton size="sizeMd" variant="variantOutlinePrimary" to="/post">
            롤링 페이퍼 만들기
          </LinkButton>
        )}
      </div>
    </header>
  );
}

export default Header;
