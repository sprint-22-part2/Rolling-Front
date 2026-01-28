import PropTypes from 'prop-types';
import styles from './index.module.css';

function RelationshipBadge({ relationship }) {
  // 관계별 스타일 클래스 매핑
  const relationshipStyles = {
    지인: styles.acquaintance,
    동료: styles.colleague,
    가족: styles.family,
    친구: styles.friend,
  };

  // 전달받은 relationship 값에 해당하는 클래스 선택
  const badgeClass = relationshipStyles[relationship] || '';

  return (
    // 공통 badge 스타일과 데이터에 따른 개별 스타일을 함께 적용
    <span className={`${styles.badge} ${badgeClass}`}>{relationship}</span>
  );
}

// Props 타입 정의 및 검사
RelationshipBadge.propTypes = {
  relationship: PropTypes.oneOf(['지인', '동료', '가족', '친구']).isRequired,
};

export default RelationshipBadge;
