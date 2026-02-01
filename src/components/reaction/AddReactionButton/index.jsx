import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import { ImojiIcon } from '@/assets/icons';

const AddReactionButton = forwardRef(function AddReactionButton(
  { onClick, className, disabled },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.addButton} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="이모지 추가"
    >
      <ImojiIcon aria-hidden="true" />
    </button>
  );
});

AddReactionButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

AddReactionButton.defaultProps = {
  onClick: null,
  className: '',
  disabled: false,
};

export default AddReactionButton;
