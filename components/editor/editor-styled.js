import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const EditorContainer = styled.div`
  padding: 24px;
  display: flex;
  max-height: 100%;
  min-height: 0;
  height: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: overlay;
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
    min-height: 100%;
    max-height: 100%;
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  ${({ alignContent }) =>
    alignContent &&
    css`
      align-content: ${alignContent};
    `}
`;

const LayersContainer = styled.div`
  position: absolute;
  z-index: 112;
  left: 0;
  top: 0;
`;

const EditorPlaceholder = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - var(--header-height));
  margin: ${(props) => props.margin};
  overflow: auto;
  padding-top: 24px;
  padding-bottom: 24px;
  justify-content: space-between;
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 100%;
    margin-left: 104px;
  }
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 100%;
    margin-right: 235px;
  }
`;

const EditorInnerPlaceholder = styled.div`
  position: relative;
`;

const EditorContainerWrapper = styled.div`
  position: relative;
  margin-right: 64px;
`;

const EditorSecondLine = styled.div`
  padding: 0 24px 0 64px;
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  margin-top: auto;
  position: relative;
  z-index: 3;
  pointer-events: none;
`;

const SlidePosition = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin-bottom: 8px;
  width: fit-content;
`;

const RefreshPreviewButtonWrapper = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 40px;
`;

const RefreshPreviewButton = styled.button`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  min-width: 131px;
  text-align: center;
  padding: 10px 15px;
  background: var(--shade-900-85);
  color: var(--white);
  border-radius: 8px;
  border: none;
  outline: none;
  transition: 0.12s ease;
  cursor: pointer;
  &:hover {
    background: var(--shade-700-85);
  }
`;

const LayersMenuSpacing = styled.div`
  width: 64px;
`;

const SlideListSpacing = styled.div`
  height: 202px;
`;

export default {
  Container,
  EditorContainer,
  EditorContainerWrapper,
  EditorPlaceholder,
  EditorInnerPlaceholder,
  EditorWrapper,
  RefreshPreviewButton,
  RefreshPreviewButtonWrapper,
  SlidePosition,
  EditorSecondLine,
  LayersContainer,
  LayersMenuSpacing,
  SlideListSpacing,
};
