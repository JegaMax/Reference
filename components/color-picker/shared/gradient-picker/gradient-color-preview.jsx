import { memo } from 'react';
import styled from 'styled-components';

const StyledGradientColorPreviewOuter = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 1px solid var(${({ isActive }) => (isActive ? '--white-20' : '--shade-700-85')});
  border-radius: 6px;
  padding: 1px;
  cursor: pointer;
`;

const StyledGradientColorPreviewInner = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GradientColorPreview = ({ color, isActive, onClick }) => {
  return (
    <StyledGradientColorPreviewOuter onClick={onClick} isActive={isActive}>
      <StyledGradientColorPreviewInner style={{ backgroundColor: color }} />
    </StyledGradientColorPreviewOuter>
  );
};

GradientColorPreview.defaultProps = {
  color: 'var(--white-20)',
};

export default memo(GradientColorPreview);
