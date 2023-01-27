import { useCallback, useEffect, useMemo, useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectPropFromActiveSlide, setActiveSlideProps } from '../../../appredux/features/amp-story/ampStorySlice';
// Components
import { IconButton } from '../../buttons';
import InlineEditor from '../../inline-editor';
import { BottomBarButtonWrapper, Typography } from '../shared';
// Utils
import debounce from 'lodash/debounce';
// Constants
import OutsideClickHandler from 'react-outside-click-handler';
import { storyConstants } from '../../../config/constants';
import { stopPropagation } from '../../../utils/common';
import { Infinite } from '../../icons';
import ToggleAutoAdvance from './toggle-auto-advance';

const limits = {
  lowerBound: storyConstants.slideMinDuration,
  upperBound: storyConstants.slideMaxDuration,
};

const EditorSlideDuration = () => {
  const dispatch = useDispatch();
  const selectPropFromActiveSlide = useMemo(makeSelectPropFromActiveSlide, []);
  const activeSlidePosition = useSelector((state) => state.ampStory.present.activeSlidePosition);
  const activeSlideDuration = useSelector((state) => selectPropFromActiveSlide(state, 'duration'));
  const isAutoAdvancedDisabled = useSelector((state) =>
    selectPropFromActiveSlide(state, 'isAutoAdvancedDisabled'),
  );
  const [duration, setDuration] = useState(activeSlideDuration);
  const [activeEditor, setActiveEditor] = useState(false);
  const [isAutoAdvancedOpen, setIsAutoAdvancedOpen] = useState(false);

  useEffect(() => {
    setDuration(activeSlideDuration);
  }, [activeSlideDuration]);

  const updateDuration = useCallback(
    debounce((newDuration) => {
      if (typeof newDuration === 'number' && !isNaN(newDuration) && newDuration !== activeSlideDuration) {
        dispatch(
          setActiveSlideProps({
            field: 'duration',
            value: newDuration,
          }),
        );
      }
    }, 500),
    [dispatch, activeSlidePosition],
  );

  useEffect(() => {
    updateDuration(duration);
  }, [duration, updateDuration]);

  const shouldArrowsFire = (event, min, max) => {
    const value = +event.target.value;
    if (isNaN(value)) {
      return false;
    }
    if (event.key === 'ArrowUp') {
      return !(value >= max);
    }
    if (event.key === 'ArrowDown') {
      return !(value <= min);
    }

    return true;
  };

  const handleDurationKeyDown = (event) => {
    let newDuration = Number(duration);

    if (shouldArrowsFire(event, storyConstants.slideMinDuration, storyConstants.slideMaxDuration)) {
      if (event.key === 'ArrowUp') {
        newDuration += 1;
      }
      if (event.key === 'ArrowDown') {
        newDuration -= 1;
      }
      setDuration(newDuration);
    }
  };

  const onButtonClick = () => {
    if (!isAutoAdvancedDisabled && !activeEditor) {
      setActiveEditor(true);
    }
    if (!isAutoAdvancedOpen) {
      setIsAutoAdvancedOpen(true);
    }
    if (isAutoAdvancedDisabled && isAutoAdvancedOpen) {
      setIsAutoAdvancedOpen(false);
    }
  };

  const onOutsideClick = () => {
    setIsAutoAdvancedOpen(false);
  };

  return (
    <BottomBarButtonWrapper onClick={stopPropagation}>
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <IconButton isActive={activeEditor} onClick={onButtonClick}>
          <Typography>
            {isAutoAdvancedDisabled ? (
              <Infinite />
            ) : (
              <>
                <InlineEditor
                  open={activeEditor}
                  setOpen={setActiveEditor}
                  type={'number'}
                  name={'duration'}
                  placeholder={'0'}
                  value={duration}
                  onChange={setDuration}
                  onKeyDown={handleDurationKeyDown}
                  limits={limits}
                />
                {!activeEditor && 's'}
              </>
            )}
          </Typography>
        </IconButton>

        {isAutoAdvancedOpen && <ToggleAutoAdvance />}
      </OutsideClickHandler>
    </BottomBarButtonWrapper>
  );
};

export default EditorSlideDuration;
