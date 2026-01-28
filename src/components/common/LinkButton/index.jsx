import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '@/components/common/Button/index.module.css';

const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

function isSafeHref(href) {
  if (typeof href !== 'string') {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);
    return ALLOWED_PROTOCOLS.includes(url.protocol);
  } catch {
    return false;
  }
}

function isSafeTo(to) {
  if (typeof to !== 'string') {
    return false;
  }

  const value = to.trim();

  if (!value) {
    return false;
  }

  // 위험 프로토콜 차단
  if (/^(javascript|data|vbscript):/i.test(value)) {
    return false;
  }

  // 내부 라우팅은 "/"로 시작하는 경로만 허용
  return value.startsWith('/');
}

export default function LinkButton({
  children,
  className = '',
  size = 'sizeMd',
  variant = 'variantPrimary',
  leftIcon = null,

  // 링크 전용
  to,
  href,
  target,
}) {
  const mergedClassName = [
    styles.linkButton, // ✅ LinkButton의 기본 스타일(여기가 styles.button 역할)
    styles[size],
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {leftIcon ? <span className={styles.leftIcon}>{leftIcon}</span> : null}
      {children ? <span className={styles.label}>{children}</span> : null}
    </>
  );

  // 내부 라우트
  if (to) {
    if (!isSafeTo(to)) {
      return null;
    }

    return (
      <Link to={to} className={mergedClassName}>
        {content}
      </Link>
    );
  }

  // 외부 링크
  if (href) {
    if (!isSafeHref(href)) {
      return null;
    }

    const normalizedTarget = typeof target === 'string' ? target : undefined;

    return (
      <a
        href={href}
        className={mergedClassName}
        target={normalizedTarget}
        rel={
          normalizedTarget?.toLowerCase() === '_blank'
            ? 'noopener noreferrer'
            : undefined
        }
      >
        {content}
      </a>
    );
  }

  // to/href 둘 다 없으면 렌더 X
  return null;
}

LinkButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  leftIcon: PropTypes.node,

  to: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
};

LinkButton.defaultProps = {
  children: null,
  className: '',
  size: 'sizeMd',
  variant: 'variantPrimary',
  leftIcon: null,
  to: null,
  href: null,
  target: undefined,
};
