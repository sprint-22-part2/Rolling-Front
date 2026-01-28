import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  // 링크 관련 props
  to,
  href,
  target,
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

  // react-router 내부 링크
  if (to) {
    return (
      <Link to={to} className={mergedClassName}>
        {leftIcon}
        {children}
      </Link>
    );
  }

  // 외부 링크
  if (href) {
    return (
      <a
        href={href}
        className={mergedClassName}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {leftIcon}
        {children}
      </a>
    );
  }

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
  // 링크 관련
  to: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
};
