import styles from '@/components/common/ProfileImage/index.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';

function ProfileImage({
  src,
  alt = 'profile',
  size = 56,
  borderColor = 'var(--gray-100)',
  borderWidth = 1,
  className,
}) {
  const imageSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <img
      src={src}
      alt={alt}
      className={cn(styles.profileImage, className)}
      style={{
        width: imageSize,
        height: imageSize,
        borderColor,
        borderWidth: `${borderWidth}px`,
      }}
    />
  );
}

ProfileImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  className: PropTypes.string,
};

export default ProfileImage;
