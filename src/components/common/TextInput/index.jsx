import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function TextInput({
  label,
  placeholder,
  onChange,
  name,
  value,
  disabled,
  maxLength = 40,
}) {
  // 에러 메시지 상태 관리
  const [errorMessage, setErrorMessage] = useState('');
  const [inputLength, setInputLength] = useState('0');

  // 에러 존재 여부를 불리언 값으로 변환 (메시지가 있으면 true)
  const isError = !!errorMessage;

  const isFilled = value && value.length > 0;

  // 입력창에서 포커스가 나갈 때 실행 (유효성 검사)
  const handleBlur = (e) => {
    // 앞뒤 공백을 제거한 값이 비어있을 경우 에러 메시지 설정
    if (!e.target.value.trim()) {
      setErrorMessage('이름을 입력해 주세요');
    } else {
      setErrorMessage('');
    }
  };

  // 입력창에 다시 포커스가 들어오면 에러 메시지 초기화
  const handleFocus = () => setErrorMessage('');

  // 값이 변경될 때 부모 컴포넌트의 onChange 함수에 name과 value를 전달
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange && onChange(name, newValue);
    if (newValue.length === 41) {
      setErrorMessage('40자까지만 입력 가능합니다.');
    } else {
      setErrorMessage('');
    }
    setInputLength(newValue.length);
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.labelCount}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.characterCount}>{inputLength}/40</div>
      </div>
      <input
        // 기본 스타일과 에러 발생 시 스타일을 조건부로 결합
        disabled={disabled}
        className={`${styles.inputField} ${isFilled ? styles.filled : ''} ${isError ? styles.errorField : ''}`}
        value={value}
        placeholder={placeholder}
        onBlur={handleBlur} // 포커스 아웃 이벤트
        onFocus={handleFocus} // 포커스 인 이벤트
        onChange={handleChange}
        maxLength={maxLength}
      />
      {/* 에러가 있을 때만 에러 문구 표시 */}
      {isError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}

// Props 타입 정의 및 검사
TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default TextInput;
