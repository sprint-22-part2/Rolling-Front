import PropTypes from 'prop-types';
import cn from 'classnames';
import { CheckIcon } from '@/assets/icons';
import styles from './index.module.css';

export default function CheckMark({ className, label }) {
  return (
    <span
      className={cn(styles.checkMark, className)}
      aria-hidden={!label}
      aria-label={label}
    >
      <CheckIcon aria-hidden="true" />
    </span>
  );
}

CheckMark.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

CheckMark.defaultProps = {
  className: '',
  label: undefined,
};
