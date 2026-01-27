import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import { ArrowDownIcon } from '@/assets/icons';

function Dropdown({
  placeholder,
  options,
  disabled,
  isError,
  errorMessage,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownRef = useRef(null);

  const handleToggle = () => {
    if (disabled) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={`
          ${styles.trigger} 
          ${selectedOption ? styles.triggerFilled : ''} 
          ${isOpen ? styles.triggerOpen : ''}
          ${isError ? styles.triggerError : ''}
          ${disabled ? styles.triggerDisabled : ''}
        `}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span
          className={
            selectedOption ? styles.textSelected : styles.textPlaceholder
          }
        >
          {selectedOption || placeholder}
        </span>

        <ArrowDownIcon
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
        />
      </button>

      {isOpen && !disabled && (
        <ul className={styles.menu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.item}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {isError && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

export default Dropdown;
