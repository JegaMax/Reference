import styled, { css } from 'styled-components';

const Column = styled.div`
  display: flex;
  padding: ${({ padding }) => (padding ? padding : '0 4px')};
  flex: 0 0 50%;
  width: ${({ width }) => (width ? width : '50%')};
  flex: 0 0 50%;
  ${({ flexWrap }) =>
    flexWrap &&
    css`
      flex-wrap: wrap;
      flex: 1 0 100%;
      gap: 10px;
    `}
  align-items: center;
  justify-self: ${({ justifyContent }) => justifyContent};
  justify-content: ${({ justifyContent }) => justifyContent};
  ${({ justifyContent }) =>
    justifyContent === 'flex-end' &&
    css`
      margin-right: 0;
      margin-left: auto;
    `}
`;

const EditorSidebarHalfColumn = ({
  padding,
  justifyContent = 'flex-start',
  children,
  width,
  flexWrap,
}) => {
  return (
    <Column padding={padding} justifyContent={justifyContent} width={width} flexWrap={flexWrap}>
      {children}
    </Column>
  );
};

export default EditorSidebarHalfColumn;
