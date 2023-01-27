import { memo } from 'react';
import styled, { css } from 'styled-components';
import { columnType } from '../../../config/constants';

const StyledSettingsColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: ${({ flexBasis }) => flexBasis};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'none')};
  flex-grow: ${({ flexGrow }) => flexGrow};
  ${({ flexShrink }) =>
    flexShrink &&
    css`
      flex-shrink: ${flexShrink};
    `}
  justify-self: ${({ justifyContent }) => justifyContent};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  min-width: ${({ minWidth }) => minWidth ?? '300px'};
  padding: ${({ padding }) => padding ?? '12px'};
`;

const SettingsColumn = ({
  className,
  flexGrow,
  flexBasis,
  maxWidth,
  justifyContent,
  alignItems,
  flexShrink,
  minWidth,
  padding,
  children,
}) => {
  return (
    <StyledSettingsColumn
      className={className}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      flexBasis={flexBasis}
      maxWidth={maxWidth}
      justifyContent={justifyContent}
      minWidth={minWidth}
      padding={padding}
      alignItems={alignItems}
    >
      {children}
    </StyledSettingsColumn>
  );
};

SettingsColumn.defaultProps = {
  flexGrow: '0',
  justifyContent: 'flex-start',
  flexBasis: columnType.WHOLE,
  alignItems: 'flex-start',
};

export default memo(SettingsColumn);
