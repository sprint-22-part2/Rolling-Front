import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function Layout() {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />
      <main className={styles.contentWrap}>
        <Outlet />
      </main>
      <Footer className={styles.footer} />
    </div>
  );
}

export default Layout;
