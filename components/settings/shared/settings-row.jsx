import styled from 'styled-components';
const StyledSettingsRow = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  width: 100%;
  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ disableCursor }) =>
    disableCursor &&
    `
    &&& * {
      cursor: default;
    }
  `}
`;

const SettingsRow = ({
  className,
  children,
  alignItems,
  justifyContent,
  onClick,
  margin,
  gap,
  disableCursor,
}) => {
  return (
    <StyledSettingsRow
      className={className}
      justifyContent={justifyContent}
      alignItems={alignItems}
      margin={margin}
      gap={gap}
      onClick={onClick}
      disableCursor={disableCursor}
    >
      {children}
    </StyledSettingsRow>
  );
};

SettingsRow.defaultProps = {
  justifyContent: 'flex-start',
};

export default SettingsRow;
