import { forwardRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 0 24px;
`;

const DragAndDropWrapper = forwardRef(
  ({ children }, ref) => {
    return <Wrapper ref={ref}>{children}</Wrapper>;
  },
);

export default DragAndDropWrapper;
