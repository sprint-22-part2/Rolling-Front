/* eslint-disable react/prop-types */
import styles from '@/components/common/CommonButtons/index.module.css';

export default function Button({
  children,
  className = '',
  disabled = false,
  onClick,
  leftIcon = null,
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[className] ?? ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
