import PropTypes from 'prop-types';
import COLOR_OPTIONS from '@/constants/post';
import CheckMark from '@/components/post/CheckMark';
import styles from './index.module.css';

export default function ColorSelector({ value, onChange }) {
  const currentValue = COLOR_OPTIONS.find((option) => option.id === value)
    ? value
    : COLOR_OPTIONS[0].id;

  return (
    <div className={styles.colorGrid}>
      {COLOR_OPTIONS.map((option) => {
        const isSelected = option.id === currentValue;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            aria-label={`${option.label} 배경 선택`}
            className={`${styles.colorCard} ${isSelected ? styles.selected : ''}`}
            style={{ background: option.gradient }}
            onClick={() => onChange(option.id)}
          >
            {isSelected && <CheckMark />}
          </button>
        );
      })}
    </div>
  );
}

ColorSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
