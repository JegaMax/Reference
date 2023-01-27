
import styled, { css } from 'styled-components';

const StyledElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 6px 14px 0 38px;
  margin-bottom: 8px;
  svg > * {
    fill: var(--shade-300);
  }
  ${({ isDisabled }) =>
    !isDisabled &&
    css`
      cursor: pointer;
      svg > * {
        fill: var(--shade-100-85);
      }
      &:hover {
        background: var(--shade-500-85);
      }
    `}
`;

const ElementTitle = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 1.333333;
  letter-spacing: 0.01em;
  margin-left: 14px;
  color: var(${({ isDisabled }) => (isDisabled ? `--shade-300` : `--shade-100`)});
`;

const LinkElement = ({ title, children, isDisabled, onClick }) => {
  return (
    <StyledElement isDisabled={isDisabled} onClick={onClick}>
      {children}
      <ElementTitle isDisabled={isDisabled}>{title}</ElementTitle>
    </StyledElement>
  );
};

LinkElement.defaultProps = {
  isDisabled: false,
};

export default LinkElement;
