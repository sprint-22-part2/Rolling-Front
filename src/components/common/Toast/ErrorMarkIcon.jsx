import PropTypes from 'prop-types';

const ErrorMarkIcon = ({ className }) => (
  <span className={className} aria-hidden="true">
    !
  </span>
);

ErrorMarkIcon.propTypes = {
  className: PropTypes.string,
};

ErrorMarkIcon.defaultProps = {
  className: undefined,
};

export default ErrorMarkIcon;
