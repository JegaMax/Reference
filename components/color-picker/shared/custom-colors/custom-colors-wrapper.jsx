import styled from 'styled-components';

const StyledCustomColorsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin: 4px -2px 0;
  min-width: 100%;
`;

const CustomColorsWrapper = ({ children }) => {
  return <StyledCustomColorsWrapper>{children}</StyledCustomColorsWrapper>;
};

export default CustomColorsWrapper;
