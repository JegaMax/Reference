import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 260px;
  max-height: 464px;
  padding: 0;
  z-index: 2;
  overflow: hidden;
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 12px;
  left: calc(100% + 8px);
  top: 0px;
  box-sizing: border-box;
  & * {
    box-sizing: inherit;
  }
`;

const EditorModalWrapper = ({ children }) => {
  const offsetTop = useSelector((state) => state.editorModal.offsetTop);
  const ref = useRef(null);
  const [height, setHeight] = useState(464);

  useEffect(() => {
    if (ref?.current) {
      const elementDimensions = ref?.current?.getBoundingClientRect();

      setHeight(window.innerHeight - elementDimensions.top - 10);
    }
  }, [setHeight, offsetTop]);

  return (
    <ModalWrapper style={{ top: `${offsetTop}px`, height: `${height}px` }} ref={ref}>
      {children}
    </ModalWrapper>
  );
};

export default EditorModalWrapper;
