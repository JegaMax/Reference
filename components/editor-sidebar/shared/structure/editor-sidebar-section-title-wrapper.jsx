import styled from 'styled-components';

const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  margin: 0 0 24px;
`;

const EditorSidebarSectionTitleWrapper = ({ className, children }) => {
  return <SectionTitleWrapper className={className}>{children}</SectionTitleWrapper>;
};

export default EditorSidebarSectionTitleWrapper;
