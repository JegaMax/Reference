import { useDebounce, useDidUpdateEffect, useIsContentOverflowing } from 'hooks';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import EditorSidebarSliderWithInputDecimals from '../shared/editor-sidebar-slider-with-input-decimals';
import EditorSidebarLabel from '../shared/elements/editor-sidebar-label';
import EditorSidebarLabelWrapper from '../shared/structure/editor-sidebar-label-wrapper';
import DirectionButton, { Direction } from './direction-button';
import AnimationsStyled from './editor-sidebar-animation-styled';
import { AnimationType } from './editor-sidebar-animations';
import SpeedButton, { SpeedSteps } from './speed-button';

const Container = styled.div`
  margin-top: 24px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 16px;
  width: 100%;
  &:last-of-type {
    margin: 0;
  }
`;

const getArrowValue = (e) => {
  let value = 0;
  value = +e.target.value;

  if (value % 1 === 0) {
    value = e.keyCode === 38 ? value + 1 : value - 1;
  } else {
    value = e.keyCode === 38 ? Math.ceil(value) : Math.floor(value);
  }

  return value;
};

const speedOptions = [SpeedSteps.firstSpeed, SpeedSteps.secondSpeed, SpeedSteps.thirdSpeed, SpeedSteps.fourthSpeed];
const speedMap = new Map([
  [SpeedSteps.firstSpeed, 6],
  [SpeedSteps.secondSpeed, 4],
  [SpeedSteps.thirdSpeed, 2],
  [SpeedSteps.fourthSpeed, 1],
]);

const getSpeedFromDuration = (duration) => {
  const record = [...speedMap].find(([_, value]) => value === duration);

  return record?.[0];
};

const getDirectionFromAnimation = (animationName, invert = false) => {
  const tokens = animationName?.split('-');
  const lastWord = tokens?.[tokens.length - 1];

  if (invert) {
    if (lastWord === 'right') {
      return Direction.left;
    }
    if (lastWord === 'top') {
      return Direction.bottom;
    }
    if (lastWord === 'left') {
      return Direction.right;
    }

    return Direction.top;
  }

  if (lastWord === 'right') {
    return Direction.right;
  }
  if (lastWord === 'bottom') {
    return Direction.bottom;
  }
  if (lastWord === 'left') {
    return Direction.left;
  }

  return Direction.top;
};

const parseAnimationNameFromDirection = (animationName, direction, invert = false) => {
  const tokens = animationName?.split('-') ?? [];
  tokens.pop();

  if (invert) {
    let newDirection = 'bottom';

    if (direction === Direction.right) {
      newDirection = 'left';
    } else if (direction === Direction.bottom) {
      newDirection = 'top';
    } else if (direction === Direction.left) {
      newDirection = 'right';
    }

    tokens.push(newDirection);
    return tokens.join('-');
  }

  let newDirection = 'top';

  if (direction === Direction.right) {
    newDirection = 'right';
  } else if (direction === Direction.bottom) {
    newDirection = 'bottom';
  } else if (direction === Direction.left) {
    newDirection = 'left';
  }

  tokens.push(newDirection);
  return tokens.join('-');
};

const returnAnimationBase = (animationName) => {
  const tokens = animationName?.split('-') ?? [];

  if (tokens.some((token) => ['left', 'right', 'bottom', 'top'].includes(token))) {
    tokens.pop();
  }

  return tokens.join('-');
};

const AnimationDetails = ({
  animationType,
  animations,
  animation,
  duration,
  delay,
  isLayerLocked,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDelay, setCurrentDelay] = useState(delay);
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [direction, setDirection] = useState(
    getDirectionFromAnimation(animation, animationType === AnimationType.in && !animation?.startsWith('pan')),
  );
  const [speed, setSpeed] = useState(getSpeedFromDuration(duration));

  const debouncedDelay = useDebounce(currentDelay, 200);

  const dropdownWrapperRef = useRef(null);
  const isOverflowing = useIsContentOverflowing({ element: dropdownWrapperRef.current });
  const selectedAnimation = useMemo(() => animations.find((a) => a?.name?.startsWith(returnAnimationBase(animation))), [
    animation,
    animations,
  ]);

  const onDropdownToggle = useCallback(() => {
    if (isLayerLocked) {
      return;
    }

    setIsDropdownOpen((prev) => !prev);
  }, [isLayerLocked]);

  const onAnimationChange = useCallback(
    (animation) => () => {
      onChange({ animationType, animation, duration: currentDuration, delay: debouncedDelay });
      setIsDropdownOpen(false);
    },
    [animationType, debouncedDelay, currentDuration, onChange],
  );

  const onDropdownWrapperOutsideClick = useCallback(() => setIsDropdownOpen(false), []);

  const onDelayChange = useCallback((newDelay) => setCurrentDelay(newDelay), []);

  const onDelayArrowDown = useCallback(
    (e) => {
      if (isLayerLocked) {
        return;
      }

      if (e.keyCode === 38 || e.keyCode === 40) {
        const value = getArrowValue(e);
        setCurrentDelay(value);
      }
    },
    [isLayerLocked],
  );

  const onSpeedChange = useCallback((speedStep) => {
    const newDuration = speedMap.get(speedStep);
    if (newDuration) {
      setCurrentDuration(newDuration);
      setSpeed(speedStep);
    }
  }, []);

  const onDirectionChange = useCallback(
    (direction) => {
      const newAnimation = parseAnimationNameFromDirection(
        animation,
        direction,
        animationType === AnimationType.in && !animation?.startsWith('pan'),
      );
      onAnimationChange(newAnimation)();
      setDirection(direction);
    },
    [animation, animationType, onAnimationChange],
  );

  useDidUpdateEffect(() => {
    onChange({ animationType, animation, duration: currentDuration, delay: debouncedDelay });
  }, [debouncedDelay, currentDuration]);

  useDidUpdateEffect(() => {
    if (selectedAnimation?.directions?.[0] !== undefined) {
      setDirection(selectedAnimation?.directions?.[0]);
    }
  }, [selectedAnimation]);

  // Sync with store
  useEffect(() => {
    setDirection(
      getDirectionFromAnimation(animation, animationType === AnimationType.in && !animation?.startsWith('pan')),
    );
  }, [animation, animationType]);

  useEffect(() => {
    setCurrentDelay((prev) => (prev !== delay ? delay : prev));
  }, [delay]);

  useEffect(() => {
    setCurrentDuration((prev) => (prev !== duration ? duration : prev));
    setSpeed((prev) => {
      const newSpeed = getSpeedFromDuration(duration);
      if (newSpeed !== prev) {
        return newSpeed;
      }

      return prev;
    });
  }, [duration]);

  return (
    <Container>
      <Row>
        <AnimationsStyled.OutsideClickHandlerWrapper>
          <OutsideClickHandler onOutsideClick={onDropdownWrapperOutsideClick}>
            <AnimationsStyled.AnimationsDropdownWrapper>
              <AnimationsStyled.AnimationDropdownTrigger
                isDisabled={isLayerLocked}
                isDropdownOpen={isDropdownOpen}
                onClick={onDropdownToggle}
              >
                <AnimationsStyled.AnimationIconWrapper>
                  {selectedAnimation && (
                    <AnimationsStyled.AnimationIcon src={selectedAnimation?.image} alt={selectedAnimation?.name} />
                  )}
                </AnimationsStyled.AnimationIconWrapper>
                <AnimationsStyled.AnimationLabelWrapper>
                  <AnimationsStyled.AnimationLabel>
                    {selectedAnimation?.label || 'Select Effect'}
                  </AnimationsStyled.AnimationLabel>
                </AnimationsStyled.AnimationLabelWrapper>
                <AnimationsStyled.DropdownIcon />
              </AnimationsStyled.AnimationDropdownTrigger>

              {isDropdownOpen && (
                <AnimationsStyled.DropdownMenuWrapper isOverflowing={isOverflowing} ref={dropdownWrapperRef}>
                  {animations.map((a) => {
                    return (
                      <AnimationsStyled.AnimationItem key={`animation-${a?.name}`} onClick={onAnimationChange(a.name)}>
                        <AnimationsStyled.AnimationIconWrapper>
                          <AnimationsStyled.AnimationIcon src={a?.image} alt={a?.name} />
                        </AnimationsStyled.AnimationIconWrapper>
                        <AnimationsStyled.AnimationLabelWrapper>
                          <AnimationsStyled.AnimationLabel>{a?.label}</AnimationsStyled.AnimationLabel>
                        </AnimationsStyled.AnimationLabelWrapper>
                      </AnimationsStyled.AnimationItem>
                    );
                  })}
                </AnimationsStyled.DropdownMenuWrapper>
              )}
            </AnimationsStyled.AnimationsDropdownWrapper>
          </OutsideClickHandler>
        </AnimationsStyled.OutsideClickHandlerWrapper>
      </Row>

      {selectedAnimation?.directions ? (
        <Row>
          <EditorSidebarLabelWrapper>
            <EditorSidebarLabel text={'Direction'} />
          </EditorSidebarLabelWrapper>

          {selectedAnimation?.directions.map((option) => (
            <DirectionButton
              key={option}
              direction={option}
              onClick={onDirectionChange}
              isActive={option === direction}
            />
          ))}
        </Row>
      ) : null}

      <Row>
        <EditorSidebarLabelWrapper>
          <EditorSidebarLabel text={'Speed'} />
        </EditorSidebarLabelWrapper>

        {speedOptions.map((option) => (
          <SpeedButton key={option} speedStep={option} onClick={onSpeedChange} isActive={option === speed} />
        ))}
      </Row>

      <Row>
        <EditorSidebarLabelWrapper>
          <EditorSidebarLabel text={'Delay'} />
        </EditorSidebarLabelWrapper>

        <EditorSidebarSliderWithInputDecimals
          min={0}
          max={15}
          step={0.1}
          isDisabled={isLayerLocked}
          value={currentDelay}
          sign={'s'}
          onChange={onDelayChange}
          onInputArrowDown={onDelayArrowDown}
        />
      </Row>
    </Container>
  );
};

export default memo(AnimationDetails);
