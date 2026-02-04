import styles from './index.module.css';

import HeroSection from '@/components/Landing/HeroSection';
import FeatureSection from '@/components/Landing/FeatureSection';

import RollingCardImage from '@/assets/images/img-card-list.svg';
import EmojiImage from '@/assets/images/img-emoji-reaction.png';
import LinkButton from '@/components/common/LinkButton';

function LandingPage() {
  return (
    <div className={styles.container}>
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* POINT 01 섹션 */}
      <FeatureSection
        labelText="POINT 01"
        title={
          <>
            누구나 손쉽게,
            <br />
            온라인 <span className={styles.highlight}>롤링 페이퍼</span>를 만들
            수 있어요
          </>
        }
        description="로그인 없이 자유롭게 만들어요."
      >
        {/* POINT 01 카드 리스트 사진 */}
        <div className={styles.cardImageWrapper}>
          <img src={RollingCardImage} alt="롤링 페이퍼 사진" />
        </div>
      </FeatureSection>

      {/* POINT 02 섹션 */}
      <FeatureSection
        labelText="POINT 02"
        title={
          <>
            서로에게 이모지로
            <br />
            <span className={styles.highlight}>감정을 표현</span>해보세요
          </>
        }
        description="롤링 페이퍼에 이모지를 추가할 수 있어요."
      >
        {/* POINT 02 이모지 사진 */}
        <div className={styles.emojiImageWrapper}>
          <img src={EmojiImage} alt="이모지 표현 사진" />
        </div>
      </FeatureSection>

      {/* 하단 버튼 */}
      <div className={styles.bottomSection}>
        <LinkButton
          to="/list"
          size="sizeBig"
          variant="variantPrimary"
          className={styles.linkButton}
        >
          구경해보기
        </LinkButton>
      </div>
    </div>
  );
}

export default LandingPage;
