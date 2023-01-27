import styled, { css } from 'styled-components';

const defaultProps = {
  isActive: false,
};

const Label = styled.h4`
  display: inline-block;
  letter-spacing: 0.01em;
  font-size: 14px;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin: 0 4px 0;
  cursor: pointer;
  color: #ababba;
  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--white);
    `};
`;

const EditorModalLabel = ({ text, isActive, onClick }) => {
  return (
    <Label isActive={isActive} onClick={onClick}>
      {text}
    </Label>
  );
};

EditorModalLabel.defaultProps = defaultProps;

export default EditorModalLabel;
