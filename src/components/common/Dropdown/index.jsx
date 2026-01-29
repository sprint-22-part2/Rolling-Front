import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import { ArrowDownIcon } from '@/assets/icons';

function Dropdown({
  placeholder,
  options,
  value,
  disabled,
  isError,
  errorMessage,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownRef = useRef(null);

  const currentValue = value !== undefined ? value : selectedOption;

  const handleToggle = () => {
    if (disabled) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (onChange) {
      onChange(option);
    }
    if (value === undefined) {
      setSelectedOption(option);
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
          ${currentValue ? styles.triggerFilled : ''} 
          ${isOpen ? styles.triggerOpen : ''}
          ${isError ? styles.triggerError : ''}
          ${disabled ? styles.triggerDisabled : ''}
        `}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span
          className={
            currentValue ? styles.textSelected : styles.textPlaceholder
          }
        >
          {currentValue || placeholder}
        </span>

        <ArrowDownIcon
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
        />
      </button>

      {isOpen && !disabled && (
        <ul className={styles.menu} role="listbox">
          {' '}
          {options.map((option) => (
            // TODO: 추후 API 연결 데이터의 id를 key로 사용하도록 수정 필요
            <li
              key={option}
              className={styles.item}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(option);
                }
              }}
              role="option"
              tabIndex="0"
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
  value: PropTypes.string,
  disabled: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

export default Dropdown;
