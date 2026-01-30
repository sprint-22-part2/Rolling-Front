import PropTypes from 'prop-types';
import styles from './index.module.css';

function FeatureSection({ labelText, title, description, children }) {
  return (
    <section className={styles.featureSection}>
      <div className={styles.textContainer}>
        <span className={styles.label}>{labelText}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.contentContainer}>{children}</div>
    </section>
  );
}

FeatureSection.propTypes = {
  labelText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default FeatureSection;
