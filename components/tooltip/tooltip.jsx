import 'rc-tooltip/assets/bootstrap_white.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  background: var(--shade-100);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 6px;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
`;

const CustomTooltip = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CustomTooltip;
