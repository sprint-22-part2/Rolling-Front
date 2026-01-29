import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '@/components/common/Dropdown';
import { FONT_MAP } from '@/constants/editor';

const FontControl = ({ value, onChange }) => {
  const fontOptions = Object.keys(FONT_MAP);

  return (
    <Dropdown
      options={fontOptions}
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
