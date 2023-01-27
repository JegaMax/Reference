import styled from 'styled-components';

const StyledHeaderNavigationTab = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? '500' : 'normal')};
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: var(${({ isActive }) => (isActive ? '--white' : '--shade-100')});
  flex: none;
  flex-grow: 0;
  margin-right: 8px;
  cursor: pointer;
`;

const HeaderNavigationTab = ({ children, isActive, onClick }) => {
  return (
    <StyledHeaderNavigationTab isActive={isActive} onClick={onClick}>
      {children}
    </StyledHeaderNavigationTab>
  );
};

HeaderNavigationTab.defaultProps = {
  isActive: false,
};

export default HeaderNavigationTab;
