import styles from './index.module.css';
import PopularRolling from '@/components/main/PopularRolling';
import RecentRolling from '@/components/main/RecentRolling';
import MessageModal from '@/components/message/MessageModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.rollingList}>
      <button type="button" onClick={() => setOpen(true)}>
        모달 열기
      </button>
      <section className={styles.sectionRollingList}>
        <h2>인기 롤링 페이퍼 🔥</h2>
        <PopularRolling />
      </section>
      <section className={styles.sectionRollingList}>
        <div className={styles.sectionTop}>
          <h2>최근에 만든 롤링 페이퍼 ⭐️️</h2>
          <Link to="/" className={styles.makeButton}>
            + 롤링 페이퍼 만들기
          </Link>
        </div>
        <RecentRolling recipientName="Song" />
        <MessageModal
          isOpen={open}
          onClose={() => setOpen(false)}
          profileSrc="/profile.png"
          name="김동훈"
          relationship="동료"
          date="2025.01.11"
          content={`우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...
              우리는 종종 모든 것이 명확해진 뒤에...`}
        />
      </section>
    </div>
  );
}

export default MainPage;
