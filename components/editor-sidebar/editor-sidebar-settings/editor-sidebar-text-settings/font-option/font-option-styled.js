import styled, { css } from 'styled-components';

const SelectOption = styled.div.attrs(({ fontFamily }) => ({
  style: {
    fontFamily: `"${fontFamily}"`,
  },
}))`
  width: 100%;
  flex-basis: 100%;
  font-family: Heebo;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  padding: 3px 8px;
  border-radius: 6px;
  transition: 0.12s ease;
  cursor: pointer;
  margin-bottom: 4px;
  &:hover {
    background: var(--primary);
    color: var(--shade-900);
  }
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--primary);
      color: var(--shade-900);
    `}
`;

const OptionText = styled.span`
  position: relative;
  font-family: inherit;
  overflow-wrap: break-word;
  ${({ show }) =>
    !show &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: var(--shade-100);
        border-radius: 4px;
      }
    `}
`;

export default {
  SelectOption,
  OptionText,
};
