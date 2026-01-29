import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '@/components/common/Dropdown';

const FONT_OPTIONS = [
  'Noto Sans',
  'Pretendard',
  '나눔명조',
  '나눔손글씨 손편지체',
];

const FontControl = ({ value, onChange }) => {
  return (
    <Dropdown
      options={FONT_OPTIONS}
      placeholder="폰트를 선택하세요"
      value={value}
      onChange={onChange}
    />
  );
};

FontControl.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FontControl;
