import PropTypes from 'prop-types';
import LogoImage from '@/assets/logo/logo.svg';
import styles from './index.module.css';

export default function ImagePreview({ imageUrl }) {
  return (
    <div className={styles.preview}>
      <div
        className={styles.previewFrame}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={styles.previewDim} />
        <div className={styles.previewOverlay}>
          <div className={styles.previewHeader}>
            <div className={styles.headerLogoWrap}>
              <img
                src={LogoImage}
                alt="logo image"
                className={styles.headerLogo}
              />
            </div>
            <span className={styles.headerButton} />
          </div>

          <div className={styles.previewBody}>
            <div className={styles.previewTitle} />
            <div className={styles.previewMeta}>
              <span className={styles.metaBadge} />
              <span className={styles.metaText} />
              <span className={styles.metaDivider} />
              <span className={styles.metaText} />
            </div>

            <div className={styles.cardRow}>
              <div className={styles.addCard}>
                <span className={styles.addIcon} />
                <span className={styles.addText} />
              </div>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className={styles.previewCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.avatar} />
                  </div>
                  <div className={styles.cardLine} />
                  <div className={styles.cardLineShort} />
                  <div className={styles.cardDate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className={styles.previewLabel}>미리보기</span>
    </div>
  );
}

ImagePreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
