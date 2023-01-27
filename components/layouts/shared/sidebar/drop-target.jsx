import LinkElement from './link-element';
import styled from 'styled-components';
import { memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';

const DroppableContainer = styled.div`
  &&& {
    a {
      border: 1px solid transparent;
    }
    ${({ isOver }) =>
      isOver &&
      `
      a {
        border: 1px solid var(--primary);
      }
    `}
  }
`;

const DropTaget = ({
  teamId,
  isLinkDisabled,
  removePadding,
  disableTopLevelActive,
  children,
  title,
  to,
}) => {
  const onDrop = useCallback(
    () => ({
      folder: null,
      team: teamId,
      isSidebar: true,
    }),
    [teamId],
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'STORY',
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [[teamId]],
  );

  return (
    <DroppableContainer isOver={isOver} ref={drop}>
      <LinkElement
        removePadding={removePadding}
        disableTopLevelActive={disableTopLevelActive}
        isDisabled={isLinkDisabled}
        to={to}
        title={title}
      >
        {children}
      </LinkElement>
    </DroppableContainer>
  );
};

export default memo(DropTaget);
