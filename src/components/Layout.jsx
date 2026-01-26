import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '@/components/Header/Index';
import Footer from '@/components/Footer/Index';

function Layout() {
  return (
    <>
      <Header className={styles.header} />
      <div className={styles.contentWrap}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </>
  );
}

export default Layout;
