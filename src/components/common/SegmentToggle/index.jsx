import PropTypes from 'prop-types';
import styles from './index.module.css';

const OPTIONS = ['color', 'image'];
const DEFAULT_VALUE = 'color';

export default function SegmentToggle({ value, onChange }) {
  const currentValue = OPTIONS.includes(value) ? value : DEFAULT_VALUE;
  const isColor = currentValue === 'color';

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

SegmentToggle.propTypes = {
  value: PropTypes.oneOf(OPTIONS),
  onChange: PropTypes.func.isRequired,
};
