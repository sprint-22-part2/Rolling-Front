import styles from './index.module.css';

export default function ImageSelectorSkeleton() {
  return (
    <div className={styles.imageSkeleton}>
      <div className={`${styles.skeletonPreview} ${styles.skeleton}`} />
      <div className={`${styles.skeletonLabel} ${styles.skeleton}`} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className={`${styles.skeletonCard} ${styles.skeleton}`}
          />
        ))}
      </div>
    </div>
  );
}
