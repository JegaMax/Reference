import styled from 'styled-components';
import { PrimaryButton } from '../../buttons';
import { CheckCircleIcon } from '../../icons';
import { ModalBodyWrapper, ModalExportOuterWrapper } from '../../shared/modal';

const StyledModalExportOuterWrapper = styled(ModalExportOuterWrapper)`
  > * {
    max-width: 1037px;
  }
`;

const SlidesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, calc(9 / 16 * 248px));
  grid-auto-rows: 272px;
  row-gap: 48px;
  column-gap: 26px;
  padding: 6px 28px;
  scrollbar-width: none;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
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
`;

const ContainerBackgroundWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const ContainerBackground = styled.div`
  display: inline-block;
  position: relative;
  margin: ${({ margin }) => margin ?? '0 10px'};
  background: var(--default-editor-bg) center center calc(100% - 4px) calc(100% - 4px);
  box-sizing: border-box;
  mask-image: radial-gradient(circle, white 100%, black 100%);
  overflow: hidden;
  cursor: ${({ cursor }) => cursor ?? 'auto'};
  border: ${({ activeSlide }) => (activeSlide ? '2px solid var(--primary)' : '2px solid transparent')};
  border-radius: 8px;
`;

const ActiveSlideMask = styled.div`
  background: var(--primary-10);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
`;

const StyledChecked = styled(CheckCircleIcon)`
  width: 18px;
  height: 18px;
  position: absolute;
  bottom: ${({ bottom }) => bottom ?? '12px'};
  right: ${({ right }) => right ?? '12px'};
  color: var(--primary);
  ${({ zIndex }) => zIndex !== undefined && `z-index: ${zIndex}`};
`;

const Container = styled.div`
  margin: 0;
  box-sizing: border-box;
  position: relative;
  width: ${({ containerWidth }) => containerWidth}px;
  height: ${({ containerHeight }) => containerHeight}px;
  overflow: hidden;
`;

const TemplateName = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin: 0 auto 0 14px;
  padding: 6px 6px 4px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  border-radius: 6px;
  align-self: flex-start;
  input {
    padding: 0;
    background: transparent;
  }
  &:hover {
    background: var(--shade-700-85);
    border-color: rgba(255, 255, 255, 0.2);
  }
  ${(props) =>
    props.isActive &&
    `
    border-color: var(--primary);                
    &:hover {
      border-color: var(--primary);
    }
  `}
`;

const PublishButton = styled(PrimaryButton)`
  margin-left: 10px;
`;

const SlideNumbers = styled.div`
  margin-top: 6px;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const SelectButtonWrapper = styled.div`
  padding: 22px 40px;
  margin: auto 0 0;
  text-align: center;
  width: 100%;
`;

const StyledModalBodyWrapper = styled(ModalBodyWrapper)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

export default {
  StyledModalExportOuterWrapper,
  SlidesWrapper,
  SlideNumbers,
  StyledChecked,
  ActiveSlideMask,
  ContainerBackgroundWrapper,
  ContainerBackground,
  Container,
  PublishButton,
  TemplateName,
  StyledModalBodyWrapper,
  SelectButtonWrapper,
};
