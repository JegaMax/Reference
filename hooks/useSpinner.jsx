import React, { useState, useCallback } from 'react';
import * as SpinnersList from 'react-spinners';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #666;
  opacity: 0.8;
  z-index: 9998;
  height: 100%;
  width: 100%;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const defaultConfig = {
  startVisible: false,
  color: '#fff',
  backgroundColor: 'rgba(51,51,51,0.8)',
  disableOverlay: false,
  size: 20,
  margin: 10,
  spinnerType: 'SyncLoader',
};

const useSpinner = (config) => {
  const { startVisible, color, backgroundColor, disableOverlay, size, margin, spinnerType } = {
    ...defaultConfig,
    ...config,
  };
  const [isSpinnerActive, setSpinnerActive] = useState(startVisible);

  const showSpinner = useCallback(() => {
    setSpinnerActive(true);
  }, [setSpinnerActive]);

  const hideSpinner = useCallback(() => {
    setSpinnerActive(false);
  }, [setSpinnerActive]);

  return {
    isVisible: isSpinnerActive,
    show: showSpinner,
    hide: hideSpinner,
    spinnerProps: {
      isVisible: isSpinnerActive,
      color,
      backgroundColor,
      disableOverlay,
      size,
      margin,
      spinnerType,
    },
    Spinner,
  };
};

const Spinner = ({
  isVisible,
  color,
  backgroundColor,
  disableOverlay,
  size,
  margin,
  spinnerType,
  ref,
}) => {
  const SelectedSpinner = (SpinnersList )[spinnerType];
  return disableOverlay ? (
    <SelectedSpinner ref={ref} color={color} loading={isVisible} size={size} margin={margin} />
  ) : (
    <Overlay style={{ backgroundColor, display: isVisible ? 'block' : 'none' }}>
      <LoaderContainer>
        <SelectedSpinner ref={ref} color={color} loading={isVisible} size={size} margin={margin} />
      </LoaderContainer>
    </Overlay>
  );
};

export default useSpinner;
