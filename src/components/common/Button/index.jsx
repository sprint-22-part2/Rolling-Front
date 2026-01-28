import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '@/components/common/Button/index.module.css';

// to 보안 검사(내부 라우팅)
function isSafeTo(to) {
  if (typeof to !== 'string') {
    return false;
  }

  const value = to.trim();

  if (!value) {
    return false;
  }

  // javascript:, data:, vbscript: 같은 위험 프로토콜 차단
  if (/^(javascript|data|vbscript):/i.test(value)) {
    return false;
  }

  // 내부 라우트만 허용
  return value.startsWith('/');
}

// href 보안 검사(외부 링크)
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

function isSafeHref(href) {
  try {
    const url = new URL(href, window.location.origin);
    return ALLOWED_PROTOCOLS.includes(url.protocol);
  } catch {
    return false;
  }
}

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
  if (to && isSafeTo(to)) {
    return (
      <Link to={to} className={mergedClassName}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        {children && <span className={styles.label}>{children}</span>}
      </Link>
    );
  }

  // 외부 링크
  if (href && isSafeHref(href)) {
    return (
      <a
        href={href}
        className={mergedClassName}
        target={target}
        rel={
          target?.toLowerCase() === '_blank' ? 'noopener noreferrer' : undefined
        }
      >
        {leftIcon ? <span className={styles.leftIcon}>{leftIcon}</span> : null}
        {children ? <span className={styles.label}>{children}</span> : null}
      </a>
    );
  }

  // 안전하지 않은 href는 렌더링 안 함
  if (href && !isSafeHref(href)) {
    return null;
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
