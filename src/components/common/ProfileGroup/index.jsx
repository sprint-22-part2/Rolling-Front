import styles from '@/components/common/ProfileGroup/index.module.css';
import ProfileImage from '@/components/common/ProfileImage';
import cn from 'classnames';
import PropTypes from 'prop-types';

function ProfileGroup({
  profiles = [],
  maxDisplay = 3,
  size = 28,
  borderColor = 'var(--white)',
  borderWidth = 1.4,
  textColor = 'var(--gray-700)',
  className,
}) {
  const safeProfiles = Array.isArray(profiles) ? profiles : [];
  const totalCount = safeProfiles.length;
  const safeMaxDisplay = Math.max(0, maxDisplay);
  const profileSize = typeof size === 'number' ? `${size}px` : size;

  const displayProfiles = safeProfiles.slice(0, safeMaxDisplay);
  const remainingCount = Math.max(0, safeProfiles.length - safeMaxDisplay);

  return (
    <div className={cn(styles.wrapper, className)}>
      {totalCount > 0 && (
        <div className={styles.profileGroup}>
          {displayProfiles.map((profile, index) => (
            <div
              key={profile.id}
              className={styles.profileItem}
              style={{ zIndex: index + 1 }}
            >
              <ProfileImage
                src={profile.src}
                alt={profile.alt ?? ''}
                size={size}
                borderColor={borderColor}
                borderWidth={borderWidth}
              />
            </div>
          ))}

          {remainingCount > 0 && (
            <div
              className={styles.remainingCount}
              style={{
                width: profileSize,
                height: profileSize,
                borderWidth: `${borderWidth}px`,
                zIndex: displayProfiles.length + 1,
              }}
            >
              +{remainingCount}
            </div>
          )}
        </div>
      )}

      <span className={styles.writerCount} style={{ color: textColor }}>
        <span className={styles.countBold}>{totalCount}</span>명이 작성했어요!
      </span>
    </div>
  );
}

ProfileGroup.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  maxDisplay: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default ProfileGroup;
