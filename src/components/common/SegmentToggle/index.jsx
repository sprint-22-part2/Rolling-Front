/* eslint-disable react/prop-types */
import styles from './index.module.css';

export default function SegmentToggle({
  value, // 'color' | 'image'
  onChange,
}) {
  const isColor = value === 'color';

  return (
    <div className={styles.wrapper} role="tablist" aria-label="옵션 선택">
      <button
        type="button"
        role="tab"
        aria-selected={isColor}
        className={`${styles.tab} ${isColor ? styles.active : ''}`}
        onClick={() => onChange('color')}
      >
        컬러
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={!isColor}
        className={`${styles.tab} ${!isColor ? styles.active : ''}`}
        onClick={() => onChange('image')}
      >
        이미지
      </button>
    </div>
  );
}
