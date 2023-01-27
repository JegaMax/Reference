import styled, { css } from 'styled-components';

const StyledSidebarSectionWrapper = styled.div`
  display: block;
  padding: 28px 0 19px;
  border-bottom: 1px solid var(--shade-700-85);
  max-width: 260px;
  &:last-of-type {
    border-bottom: 0;
    padding-bottom: 24px;
  }
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.45;
      cursor: default;
      * {
        cursor: default;
      }
    `}
`;

const EditorSidebarSectionWrapper = ({ className, children, ...rest }) => {
  return (
    <StyledSidebarSectionWrapper {...rest} className={className}>
      {children}
    </StyledSidebarSectionWrapper>
  );
};

export default EditorSidebarSectionWrapper;
