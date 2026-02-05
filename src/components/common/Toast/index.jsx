import PropTypes from 'prop-types';
import cn from 'classnames';
import { CheckIcon, CloseIcon, ErrorIcon } from '@/assets/icons';
import styles from './index.module.css';

const STATUS_ICON = {
  success: CheckIcon,
  error: ErrorIcon,
};

export default function Toast({
  message,
  status = 'success',
  count = 1,
  onClose,
}) {
  const Icon = STATUS_ICON[status] ?? CheckIcon;

  return (
    <div className={cn(styles.toast, styles[status])} role="status">
      <span className={styles.iconCircle}>
        <Icon className={styles.icon} />
      </span>
      <span className={styles.message}>
        {message}
        {count > 1 && <span className={styles.count}>x{count}</span>}
      </span>
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="알림 닫기"
      >
        <CloseIcon aria-hidden="true" />
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['success', 'error']),
  count: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
