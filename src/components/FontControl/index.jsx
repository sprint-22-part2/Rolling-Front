import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '@/components/common/Dropdown';

const FontControl = ({ options, value, onChange }) => {
  return (
    <Dropdown
      options={options}
      placeholder="폰트를 선택하세요"
      value={value}
      onChange={onChange}
    />
  );
};

FontControl.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FontControl;
