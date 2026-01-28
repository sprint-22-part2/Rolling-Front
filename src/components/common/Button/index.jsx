import PropTypes from 'prop-types';
import styles from '@/components/common/Button/index.module.css';

export default function Button({
  type = 'button',
  children,
  className,
  disabled,
  onClick,
  leftIcon,
  size = '',
  variant = '',
  styleKey = '',
}) {
  const mergedClassName = [
    styles.button,
    styles[size],
    styles[variant],
    styleKey ? styles[styleKey] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={mergedClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon ? <span className={styles.leftIcon}>{leftIcon}</span> : null}
      {children ? <span className={styles.label}>{children}</span> : null}
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
  size: PropTypes.string,
  variant: PropTypes.string,
  styleKey: PropTypes.string,
};
