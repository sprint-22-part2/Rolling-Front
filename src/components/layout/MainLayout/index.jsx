import { Outlet } from 'react-router-dom';
import styles from './index.module.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function MainLayout() {
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

export default MainLayout;
