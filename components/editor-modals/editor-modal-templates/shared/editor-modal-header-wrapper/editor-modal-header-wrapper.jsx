import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200%;
  flex-flow: row wrap;
  transition: transform 225ms linear;
  transform: ${({ isActive }) => (isActive ? 'translateX(-50%)' : 'translateX(0)')};
`;

const EditorModalHeaderWrapper = ({ isActive, children }) => {
  return <Wrapper isActive={isActive}>{children}</Wrapper>;
};

export default EditorModalHeaderWrapper;
