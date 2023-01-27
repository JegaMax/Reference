import { ChevronUp } from 'components/icons';
import { DraggableTypes } from 'interfaces/dnd';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';

export const SwipeUpContainer = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  width: 100px;
  height: 30px;
  white-space: nowrap;
  position: relative;
  justify-content: ${(props) => props.justifyContent};
  background: ${(props) => props.background};
  font-family: ${(props) => props.fontFamily};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  font-weight: ${(props) => props.fontWeight};
  box-shadow: ${(props) => props.boxShadow};
  border: ${(props) => props.border};
  &:hover {
    cursor: pointer;
  }
  & svg {
    color: ${(props) => (props.hasBlackChevron ? 'var(--black)' : null)};
  }
`;

export const StyledChevronUp = styled(ChevronUp)`
  color: var(--white);
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SwipeUp = ({ onSelectPreset, preset }) => {
  const onSelect = () => onSelectPreset(preset);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DraggableTypes.Layer,
      item: {
        type: layerTypes.OUTLINK,
        _id: preset.id,
        subType: '',
        width: 100,
        height: 30,
        swipeUpContent: preset,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [preset.id],
  );

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <SwipeUpContainer
      {...preset.styles}
      hasBlackChevron={preset.hasBlackChevron}
      onClick={onSelect}
      style={{ opacity: isDragging ? 0 : 1 }}
      ref={drag}
    >
      {/* {config.logo ? (
                <UploadedIconWrapper>
                  <UploadedIcon src={config.logo} />
                </UploadedIconWrapper>
              ) : null} */}
      {preset.title}
      {preset.chevron ? <StyledChevronUp /> : null}
    </SwipeUpContainer>
  );
};

export default memo(SwipeUp);
