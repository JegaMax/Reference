import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`;

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 22px;
  margin: auto;
  max-width: 440px;
  width: 100%;
  border-radius: 12px;
  background: var(--shade-900);
  padding: 9px 15px;
  left: 0;
  right: 0;
  transform: translateX(160px);
  z-index: 10;
`;

const SelectedItemsText = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0 14px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 12px;
  height: 40px;
  width: 40px;
  background: transparent;
  transition: 0.12s ease;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover,
  &:focus {
    background: var(--shade-500-85);
    box-shadow: 24px 32px 72px var(--black-18);
    outline: none;
    border: none;
  }
`;

const CancelButton = styled.button`
  backdrop-filter: blur(50px);
  border-radius: 8px;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  padding: 13px;
  background: transparent;
  transition: 0.12s ease;
  outline: none;
  border: none;
  cursor: pointer;
  margin-left: 12px;
  &:hover,
  &:focus {
    background: var(--shade-500-85);
    box-shadow: 24px 32px 72px var(--black-18);
    outline: none;
    border: none;
  }
`;

export { CancelButton, IconButton, SelectedItemsText, BarWrapper, Row };
