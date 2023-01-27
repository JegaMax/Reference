import { ReactNode, memo } from 'react';
import styled, { css } from 'styled-components';
import { columnType } from '../../../../config/constants';

const StyledColorPickerColumn = styled.div`
  display: flex;
  flex-basis: ${({ type }) => type};
  flex-grow: ${({ flexGrow }) => flexGrow};
  min-width: ${({ type }) => type};
  align-items: center;
  padding: 0 4px;
  justify-self: ${({ justifyContent }) => justifyContent};
  justify-content: ${({ justifyContent }) => justifyContent};
  ${({ justifyContent }) =>
    justifyContent === 'flex-end' &&
    css`
      margin-right: 0;
      margin-left: auto;
    `}
`;

const ColorPickerColumn = ({ flexGrow, type, justifyContent, children }) => {
  return (
    <StyledColorPickerColumn flexGrow={flexGrow} type={type} justifyContent={justifyContent}>
      {children}
    </StyledColorPickerColumn>
  );
};

ColorPickerColumn.defaultProps = {
  flexGrow: '0',
  justifyContent: 'flex-start',
  type: columnType.WHOLE,
};

export default memo(ColorPickerColumn);
