import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  setArtboardsCount,
  setShouldDiscardLayout,
  setVideoDuration,
  toggleSplitVideoModal,
} from '../../appredux/features/media/mediaSlice';
import Slider from 'rc-slider';
import ToggleSwitch from '../shared/toggle-switch';
import SplitVideoUI from './split-video-modal-ui';
import { selectActiveLayer, splitVideo } from '../../appredux/features/amp-story/ampStorySlice';
import { onGetVideoDuration } from '../../utils/mediaUtils';
import { batch } from 'react-redux';
import Select from '../shared/select';
import { storyConstants } from '../../config/constants';

const trackStyle = {
  backgroundColor: 'var(--primary)',
  height: 4,
  transition: 'none',
};
const handleStyle = {
  height: 12,
  width: 12,
  backgroundColor: 'var(--white)',
  border: 'none',
  marginTop: '-4px',
};
const railStyle = { backgroundColor: 'var(--shade-500-85)', height: 4 };

const SplitVideoModal = () => {
  const dispatch = useAppDispatch();
  const videoLayer = useAppSelector(selectActiveLayer);
  const artboardsCount = useAppSelector((state) => state.media.artboardsCount);
  const shouldDiscardLayout = useAppSelector((state) => state.media.shouldDiscardLayout);
  const videoDuration = useAppSelector((state) => state.media.videoDuration);
  const artboards = useMemo(() => {
    const maxArtboardsCount = Math.ceil(videoDuration / storyConstants.slideMinDuration);
    const minArtboardsCount = Math.ceil(videoDuration / storyConstants.slideMaxDuration);

    return {
      maxCount: maxArtboardsCount,
      minCount: minArtboardsCount <= 1 ? 2 : minArtboardsCount,
      options: Array.from(Array(maxArtboardsCount).keys(), (x) => ({ name: x + 1, value: x + 1 })).slice(
        minArtboardsCount,
      ),
    };
  }, [videoDuration]);

  useEffect(() => {
    if (videoDuration === -1 && videoLayer?.content?.video?.url) {
      onGetVideoDuration({
        mediaUrl: videoLayer?.content?.video?.url,
        shouldLimitDuration: false,
        callback: (duration) => dispatch(setVideoDuration(Math.round(duration))),
      });
    }
  }, [dispatch, videoDuration, videoLayer?.content?.video?.url]);

  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(setArtboardsCount(2));
        dispatch(setVideoDuration(-1));
        dispatch(setShouldDiscardLayout(false));
      });
    };
  }, [dispatch]);

  const onSplitVideo = () => {
    const videoDurationParts = [];
    const segmentTime = Math.ceil(videoDuration / artboardsCount);
    const lastSlideDuration = videoDuration % segmentTime;

    for (let i = 0; i < artboardsCount; i++) {
      if (artboardsCount - 1 === i && lastSlideDuration) {
        videoDurationParts.push(lastSlideDuration);
      } else {
        videoDurationParts.push(segmentTime);
      }
    }

    dispatch(splitVideo(videoDurationParts));
  };

  const toggleDiscardLayout = () => {
    dispatch(setShouldDiscardLayout(!shouldDiscardLayout));
  };

  const closeModal = () => {
    dispatch(toggleSplitVideoModal());
  };

  const onSlideChange = (value) => {
    dispatch(setArtboardsCount(value));
  };

  const onSelect = (option) => {
    dispatch(setArtboardsCount(option));
  };

  return (
    <SplitVideoUI.Wrapper>
      <OutsideClickHandler onOutsideClick={closeModal}>
        <SplitVideoUI.InnerWrapper>
          <SplitVideoUI.Header>
            <SplitVideoUI.Filename>{videoLayer?.content?.originalName}</SplitVideoUI.Filename>

            <SplitVideoUI.MainButton text="Split video" onClick={onSplitVideo} />
          </SplitVideoUI.Header>

          <SplitVideoUI.Body>
            <SplitVideoUI.Duration>Video duration: {videoDuration}s</SplitVideoUI.Duration>
            <SplitVideoUI.DurationWrapper>
              <SplitVideoUI.SliderLabel>Artboards</SplitVideoUI.SliderLabel>

              <Slider
                min={artboards.minCount}
                max={artboards.maxCount}
                value={artboardsCount}
                trackStyle={trackStyle}
                handleStyle={handleStyle}
                railStyle={railStyle}
                onChange={onSlideChange}
              />

              <SplitVideoUI.InputWrapper>
                <Select
                  options={artboards.options}
                  selectOption={artboardsCount}
                  dropdownHeight={'110px'}
                  onSelect={onSelect}
                />
              </SplitVideoUI.InputWrapper>
            </SplitVideoUI.DurationWrapper>

            <SplitVideoUI.SplitterHint>Video will be split into {artboardsCount} Artboards</SplitVideoUI.SplitterHint>

            <SplitVideoUI.ToggleWrapper>
              <SplitVideoUI.ToggleText>Create blank Artboards</SplitVideoUI.ToggleText>
              <ToggleSwitch size="medium" isOn={shouldDiscardLayout} onClick={toggleDiscardLayout} />
            </SplitVideoUI.ToggleWrapper>
          </SplitVideoUI.Body>
        </SplitVideoUI.InnerWrapper>
      </OutsideClickHandler>
    </SplitVideoUI.Wrapper>
  );
};

export default SplitVideoModal;
