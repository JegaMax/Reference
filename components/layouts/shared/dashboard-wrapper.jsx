import styled from 'styled-components';

const StyledDashboardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`;

const DashboardWrapper = ({ children }) => {
  return <StyledDashboardWrapper>{children}</StyledDashboardWrapper>;
};

export default DashboardWrapper;
