import styled from 'styled-components';

const OuterWrapper = styled.div`
  position: relative;
  max-width: 260px;
  width: 100%;
`;

const EditorSidebarOuterWrapper = ({ id, children, onFocus }) => {
  return (
    <OuterWrapper id={id} onFocus={onFocus}>
      {children}
    </OuterWrapper>
  );
};

export default EditorSidebarOuterWrapper;
