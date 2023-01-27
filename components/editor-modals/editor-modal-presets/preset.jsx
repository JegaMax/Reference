import { ChevronRight, LabelIcon, Plus } from 'components/icons';
import { DraggableTypes } from 'interfaces/dnd';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';

export const PresetContainer = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  width: 100px;
  height: 30px;
  white-space: nowrap;
  justify-content: ${(props) => props.justifyContent};
  background: ${(props) => props.background};
  font-family: ${(props) => props.fontFamily};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  font-weight: ${(props) => props.fontWeight};
  box-shadow: ${(props) => props.boxShadow};
  border: ${(props) => props.border};
  will-change: width, height, font-size;
  transition: width 225ms ease, height 225ms ease, font-size 225ms ease;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledChevronRight = styled(ChevronRight)`
  width: 4px;
  height: 7px;
  margin-left: 7px;
  will-change: width, height, transform;
  transition: width 225ms ease, height 225ms ease, transform 225ms ease;
`;

export const StyledLabelIcon = styled(LabelIcon)`
  width: 13px;
  height: 13px;
  margin-left: 7px;
  will-change: width, height, transform;
  transition: width 225ms ease, height 225ms ease, transform 225ms ease;
`;

export const StyledPlusIcon = styled(Plus)`
  width: 24px;
  height: 24px;
  font-weight: bold;
  will-change: width, height, transform;
  transition: width 225ms ease, height 225ms ease, transform 225ms ease;
`;

const Preset = ({ preset, onClick }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DraggableTypes.Layer,
      item: {
        type: layerTypes.OUTLINK,
        _id: preset.id,
        subType: '',
        width: 100,
        height: 30,
        presetContent: preset,
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
    <PresetContainer {...preset.styles} onClick={onClick} ref={drag} style={{ opacity: isDragging ? 0 : 1 }}>
      {preset.plusIcon ? <StyledPlusIcon /> : null}
      {preset.title}
      {preset.chevron ? <StyledChevronRight /> : null}
      {preset.labelIcon ? <StyledLabelIcon /> : null}
    </PresetContainer>
  );
};

export default memo(Preset);
