import PropTypes from 'prop-types';
import styles from '@/components/common/Button/index.module.css';

export default function Button({
  type = 'button',
  children,
  className,
  disabled,
  onClick,
  leftIcon,
  styleKey = '',
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styleKey ? styles[styleKey] : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      {children && <span className={styles.label}>{children}</span>}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  leftIcon: PropTypes.node,
  styleKey: PropTypes.string,
};
