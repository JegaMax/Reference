
import styled from 'styled-components';

const StyledDashboardColumn = styled.div`
  display: flex;
  flex-grow: 1;
  ${({ direction }) =>
    direction &&
    `
      flex-direction: ${direction};
    `}
  ${({ maxWidth }) =>
    maxWidth &&
    `
      max-width: ${maxWidth};
    `}
`;

const DashboardColumn = ({ children, direction, maxWidth }) => {
  return (
    <StyledDashboardColumn direction={direction} maxWidth={maxWidth}>
      {children}
    </StyledDashboardColumn>
  );
};

export default DashboardColumn;
