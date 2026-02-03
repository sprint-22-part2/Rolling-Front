import PropTypes from 'prop-types';
import ImagePreview from '@/components/post/ImagePreview';
import CheckMark from '@/components/post/CheckMark';
import styles from './index.module.css';

export default function ImageSelector({ images, value, onChange }) {
  const first = images[0];
  const selected = images.find((o) => o.id === value) ?? first;

  if (!selected) {
    return null;
  }

  const currentValue = selected.id;

  return (
    <div className={styles.wrapper}>
      <ImagePreview imageUrl={selected.url} />

      <div className={styles.imageGrid}>
        {images.map((option) => {
          const isSelected = option.id === currentValue;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${option.label} 이미지 선택`}
              className={`${styles.imageCard} ${isSelected ? styles.selected : ''}`}
              style={{ '--image-card-bg': `url(${option.url})` }}
              onClick={() => onChange(option.id)}
            >
              {isSelected && <CheckMark />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

ImageSelector.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
