import PropTypes from 'prop-types';
import styles from './index.module.css';
import { ImojiIcon } from '@/assets/icons';

export default function AddReactionButton({ onClick }) {
  return (
    <button
      type="button"
      className={styles.addButton}
      onClick={onClick}
      aria-label="이모지 추가"
    >
      <ImojiIcon className={styles.addIcon} />
    </button>
  );
}

AddReactionButton.propTypes = {
  onClick: PropTypes.func,
};

AddReactionButton.defaultProps = {
  onClick: null,
};
