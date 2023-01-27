import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks';
import { makeSelectPropFromActiveSlide, setActiveSlideProps } from '../../../appredux/features/amp-story/ampStorySlice';
import ToggleSwitch from '../../shared/toggle-switch';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  position: absolute;
  top: 3px;
  right: calc(100% + 8px);
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 8px;
  min-width: 137px;
  z-index: 1;
`;

const Text = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0 0 0 8px;
`;

const ToggleAutoAdvance = () => {
  const dispatch = useAppDispatch();
  const selectPropFromActiveSlide = useMemo(makeSelectPropFromActiveSlide, []);
  const isAutoAdvancedDisabled = useSelector((state) =>
    selectPropFromActiveSlide(state, 'isAutoAdvancedDisabled'),
  );

  const onToggle = () => {
    dispatch(
      setActiveSlideProps({
        field: 'isAutoAdvancedDisabled',
        value: !isAutoAdvancedDisabled,
      }),
    );
  };

  return (
    <Wrapper>
      <ToggleSwitch size="medium" isOn={!isAutoAdvancedDisabled} onClick={onToggle} />
      <Text>Auto-advance</Text>
    </Wrapper>
  );
};

export default ToggleAutoAdvance;
