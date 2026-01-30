import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '@/components/common/Button/index.module.css';

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
  to, // 링크 전용
}) {
  const mergedClassName = [
    styles.linkButton,
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
};

LinkButton.defaultProps = {
  children: null,
  className: '',
  size: 'sizeMd',
  variant: 'variantPrimary',
  leftIcon: null,
  to: null,
};
