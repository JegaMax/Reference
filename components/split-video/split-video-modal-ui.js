import styled from 'styled-components';
import { PrimaryButton } from '../buttons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--shade-500-85);
  position: fixed;
  width: 100%;
  height: 100%;
  padding: min(5%, 80px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 113;
  box-sizing: border-box;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
  > * {
    max-width: ${({ $maxWidth }) => $maxWidth ?? '480px'};
    width: 100%;
    margin: auto;
  }
  * {
    box-sizing: border-box;
  }
`;

const InnerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: var(--shade-900);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
  padding: 24px;
`;

const Text = styled.div`
  font-family: 'Heebo';
  font-style: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.01em;
`;

const Filename = styled(Text)`
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 100px);
`;

const MainButton = styled(PrimaryButton)`
  transition: 0.12s ease;
  &:hover {
    background: var(--primary-85);
  }
`;

const Body = styled.div`
  padding: 13px 44px 30px;
`;

const Duration = styled(Text)`
  font-weight: 400;
  color: var(--white);
  margin: 0 0 23px;
`;

const DurationWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 17px;
  margin: 0 0 19px;
`;

const SliderLabel = styled(Text)`
  color: var(--white);
`;

const InputWrapper = styled.div`
  min-width: 72px;
`;

const SplitterHint = styled(Text)`
  color: var(--shade-100);
  margin: 0 0 46px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  column-gap: 17px;
  align-items: center;
  justify-content: flex-start;
`;

const ToggleText = styled(Text)`
  color: var(--white);
`;

export default {
  ToggleText,
  ToggleWrapper,
  SplitterHint,
  InputWrapper,
  SliderLabel,
  DurationWrapper,
  Duration,
  Body,
  MainButton,
  Filename,
  InnerWrapper,
  Wrapper,
  Header,
};
