import styled from 'styled-components';

const StyledGradientPickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const GradientPickerWrapper = ({ children }) => {
  return <StyledGradientPickerWrapper>{children}</StyledGradientPickerWrapper>;
};

export default GradientPickerWrapper;
