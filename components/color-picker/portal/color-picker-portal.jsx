import React from 'react';
import ReactDOM from 'react-dom';

const ColorPickerPortal = ({ children, targetSelector }) => {
  const selector = targetSelector;
  const element = document.getElementById(selector);

  return element ? ReactDOM.createPortal(<>{children}</>, element) : null;
};

export default ColorPickerPortal;
