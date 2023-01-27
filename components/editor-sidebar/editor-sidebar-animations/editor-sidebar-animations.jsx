import ToggleSwitch from 'components/shared/toggle-switch';
import { MoveableTooltip } from 'components/tooltip';
import { isNil } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { playAnimations, stopAnimation } from '../../../appredux/features/editor/helpers/helpersSlice';
import { enterAnimations, exitAnimations, fullscreenAnimations } from '../../../utils/builders';
import EditorSidebarRowWrapper from '../shared/structure/editor-sidebar-row-wrapper';
import AnimationDetails from './animation-details';
import AnimationsStyled from './editor-sidebar-animation-styled';

import { makeSelectPropFromActiveSlide, setActiveSlideProps } from '../../../appredux/features/amp-story/ampStorySlice';

export const AnimationType = {
  in : "IN",
  out : "OUT",
}

const EditorSidebarAnimations = ({
  layer,
  parentLayer,
  handleLayerChange,
  handleBatchLayerChange,
}) => {
  const dispatch = useAppDispatch();
  const selectPropFromActiveSlide = useMemo(makeSelectPropFromActiveSlide, []);

  const activeSlideDuration = useAppSelector((state) => selectPropFromActiveSlide(state, 'duration'));

  const isActiveLayerLocked = layer?.settings?.generalSettings?.locked;
  const isFullscreeen = layer?.settings?.layerSettings?.fullscreen;

  const animateIn = layer?.settings?.animateIn;
  const animateInDuration = layer?.settings?.animateInDuration;
  const animateInDelay = layer?.settings?.animateInDelay;
  const animateOut = layer?.settings?.animateOut;
  const animateOutDuration = layer?.settings?.animateOutDuration;
  const animateOutDelay = layer?.settings?.animateOutDelay;

  const [entryAnimationToggle, setEntryAnimationToggle] = useState(!!animateIn);
  const [exitAnimationToggle, setExitAnimationToggle] = useState(!!animateOut);

  const [isPanAnimationApplied, setPanAnimationApplied] = useState(animateIn?.startsWith('pan'));
  const [showTooltip, setTooltip] = useState(false);

  const filteredEnterAnimations = useMemo(() => {
    if (isFullscreeen) {
      return [...enterAnimations, ...fullscreenAnimations];
    }

    return enterAnimations;
  }, [isFullscreeen]);

  const toggleEntryAnimation = () => {
    if (entryAnimationToggle) {
      if (!isNil(parentLayer) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((childLayer) => {
          if (childLayer?._id === layer?._id) {
            return {
              ...childLayer,
              settings: {
                ...childLayer.settings,
                animateIn: '',
              },
            };
          }

          return childLayer;
        });

        handleLayerChange({
          field: 'childLayers',
          value: updatedLayers,
        });

        setEntryAnimationToggle(false);

        if (isPanAnimationApplied) {
          setPanAnimationApplied(false);
        }

        return;
      }

      handleLayerChange({
        field: 'settings.animateIn',
        value: '',
      });

      setEntryAnimationToggle(false);
      if (isPanAnimationApplied) {
        setPanAnimationApplied(false);
      }

      return;
    }

    if (!isNil(parentLayer) && layer._id !== parentLayer?._id) {
      const updatedLayers = parentLayer?.childLayers?.map((childLayer) => {
        if (childLayer?._id === layer?._id) {
          return {
            ...childLayer,
            settings: {
              ...childLayer.settings,
              animateIn: enterAnimations[0].name,
              animateInDuration: 2,
              animateInDelay: 0,
            },
          };
        }

        return childLayer;
      });

      handleLayerChange({
        field: 'childLayers',
        value: updatedLayers,
      });

      setEntryAnimationToggle(true);

      return;
    }

    handleBatchLayerChange([
      {
        field: 'settings.animateInDuration',
        value: 2,
      },
      {
        field: 'settings.animateInDelay',
        value: 0,
      },
      {
        field: 'settings.animateIn',
        value: enterAnimations[0].name,
      },
    ]);

    setEntryAnimationToggle(true);
  };

  const toggleExitAnimation = useCallback(() => {
    if (isPanAnimationApplied) {
      return;
    }

    if (exitAnimationToggle) {
      if (!isNil(parentLayer) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((childLayer) => {
          if (childLayer?._id === layer?._id) {
            return {
              ...childLayer,
              settings: {
                ...childLayer.settings,
                animateOut: '',
              },
            };
          }

          return childLayer;
        });

        handleLayerChange({
          field: 'childLayers',
          value: updatedLayers,
        });

        setEntryAnimationToggle(false);
        return;
      }

      handleLayerChange({
        field: 'settings.animateOut',
        value: '',
      });

      setExitAnimationToggle(false);
      return;
    }

    if (!isNil(parentLayer) && layer._id !== parentLayer?._id) {
      const updatedLayers = parentLayer?.childLayers?.map((childLayer) => {
        if (childLayer?._id === layer?._id) {
          return {
            ...childLayer,
            settings: {
              ...childLayer.settings,
              animateOut: exitAnimations[0].name,
              animateOutDuration: 2,
              animateOutDelay: 3,
            },
          };
        }

        return childLayer;
      });

      handleLayerChange({
        field: 'childLayers',
        value: updatedLayers,
      });

      setEntryAnimationToggle(true);
      return;
    }

    handleBatchLayerChange([
      {
        field: 'settings.animateOutDuration',
        value: 2,
      },
      {
        field: 'settings.animateOutDelay',
        value: 3,
      },
      {
        field: 'settings.animateOut',
        value: exitAnimations[0].name,
      },
    ]);

    setExitAnimationToggle(true);
  }, [exitAnimationToggle, handleBatchLayerChange, handleLayerChange, isPanAnimationApplied, layer?._id, parentLayer]);

  const onTogglePreview = (event) => {
    event.stopPropagation();
    dispatch(playAnimations());
  };

  const onChange = useCallback(
    ({ animationType, animation, duration, delay }) => {
      if (animationType === AnimationType.in) {
        const durationSum = delay + duration + (animateOut !== '' ? animateOutDelay + animateOutDuration : 0);

        if (!isNil(parentLayer) && layer._id !== parentLayer?._id) {
          const updatedLayers = parentLayer?.childLayers?.map((childLayer) => {
            if (childLayer?._id === layer?._id) {
              if (animation.startsWith('pan') && exitAnimationToggle) {
                return {
                  ...childLayer,
                  settings: {
                    ...childLayer.settings,
                    animateIn: animation,
                    animateInDuration: duration,
                    animateInDelay: delay,
                    animateOut: '',
                  },
                };
              }

              return {
                ...childLayer,
                settings: {
                  ...childLayer.settings,
                  animateIn: animation,
                  animateInDuration: duration,
                  animateInDelay: delay,
                },
              };
            }

            return childLayer;
          });

          handleLayerChange({
            field: 'childLayers',
            value: updatedLayers,
          });

          if (durationSum > activeSlideDuration) {
            dispatch(setActiveSlideProps({ field: 'duration', value: durationSum }));
          }

          if (animation.startsWith('pan')) {
            setPanAnimationApplied(true);
          } else {
            setPanAnimationApplied(false);
          }
          return;
        }

        const changes = [
          {
            field: 'settings.animateInDuration',
            value: duration,
          },
          {
            field: 'settings.animateInDelay',
            value: delay,
          },
          {
            field: 'settings.animateIn',
            value: animation,
          },
        ];

        if (durationSum > activeSlideDuration) {
          dispatch(setActiveSlideProps({ field: 'duration', value: durationSum }));
        }
        if (animation.startsWith('pan')) {
          setPanAnimationApplied(true);
          if (exitAnimationToggle) {
            changes.push({
              field: 'settings.animateOut',
              value: '',
            });
          }
        } else {
          setPanAnimationApplied(false);
        }
        handleBatchLayerChange(changes);
        return;
      }

      if (animationType === AnimationType.out) {
        const durationSum = delay + duration + (animateIn !== '' ? animateInDelay + animateInDuration : 0);

        if (!isNil(parentLayer) && layer._id !== parentLayer?._id) {
          const updatedLayers = parentLayer?.childLayers?.map((childLayer) => {
            if (childLayer?._id === layer?._id) {
              return {
                ...childLayer,
                settings: {
                  ...childLayer.settings,
                  animateOut: animation,
                  animateOutDuration: duration,
                  animateOutDelay: delay,
                },
              };
            }

            return childLayer;
          });

          handleLayerChange({
            field: 'childLayers',
            value: updatedLayers,
          });

          if (durationSum > activeSlideDuration) {
            dispatch(setActiveSlideProps({ field: 'duration', value: durationSum }));
          }

          return;
        }

        handleBatchLayerChange([
          {
            field: 'settings.animateOutDuration',
            value: duration,
          },
          {
            field: 'settings.animateOutDelay',
            value: delay,
          },
          {
            field: 'settings.animateOut',
            value: animation,
          },
        ]);

        if (durationSum > activeSlideDuration) {
          dispatch(setActiveSlideProps({ field: 'duration', value: durationSum }));
        }
        return;
      }
    },
    [
      activeSlideDuration,
      animateIn,
      animateInDelay,
      animateInDuration,
      animateOut,
      animateOutDelay,
      animateOutDuration,
      dispatch,
      exitAnimationToggle,
      handleBatchLayerChange,
      handleLayerChange,
      layer?._id,
      parentLayer,
    ],
  );

  const toggleTooltipOn = () => setTooltip(true);
  const toggleTooltipOff = () => setTooltip(false);

  // Sync store
  useEffect(() => {
    const isPan = layer?.settings?.animateIn?.startsWith('pan');

    setPanAnimationApplied((prev) => {
      if (isPan !== prev) {
        return isPan;
      }

      return prev;
    });
  }, [isPanAnimationApplied, layer?.settings?.animateIn]);

  useEffect(() => {
    setEntryAnimationToggle((prev) => {
      if (!!layer?.settings?.animateIn !== prev) {
        return !!layer?.settings?.animateIn;
      }

      return prev;
    });
  }, [layer?.settings?.animateIn]);

  useEffect(() => {
    setExitAnimationToggle((prev) => {
      if (!!layer?.settings?.animateOut !== prev) {
        return !!layer?.settings?.animateOut;
      }

      return prev;
    });
  }, [layer?.settings?.animateOut]);

  useEffect(() => {
    return () => {
      dispatch(stopAnimation());
    };
  }, [dispatch]);

  return (
    <>
      <AnimationsStyled.AnimationSectionWrapper>
        <AnimationsStyled.AnimationToggleContainer>
          <AnimationsStyled.AnimationPrimaryLabel>Entry animation</AnimationsStyled.AnimationPrimaryLabel>
          <ToggleSwitch isOn={entryAnimationToggle} onClick={toggleEntryAnimation} />
        </AnimationsStyled.AnimationToggleContainer>
        {entryAnimationToggle && (
          <AnimationDetails
            animationType={AnimationType.in}
            animations={filteredEnterAnimations}
            animation={animateIn}
            duration={animateInDuration}
            delay={animateInDelay}
            isLayerLocked={isActiveLayerLocked}
            onChange={onChange}
          />
        )}
      </AnimationsStyled.AnimationSectionWrapper>

      <AnimationsStyled.AnimationSectionWrapper
        isDisabled={isPanAnimationApplied}
        disableCursor={isPanAnimationApplied}
        onMouseEnter={toggleTooltipOn}
        onMouseLeave={toggleTooltipOff}
      >
        <AnimationsStyled.AnimationToggleContainer>
          <AnimationsStyled.AnimationPrimaryLabel>Exit animation</AnimationsStyled.AnimationPrimaryLabel>
          <ToggleSwitch isOn={exitAnimationToggle} onClick={toggleExitAnimation} />
        </AnimationsStyled.AnimationToggleContainer>
        {exitAnimationToggle && (
          <AnimationDetails
            animationType={AnimationType.out}
            animations={exitAnimations}
            animation={animateOut}
            duration={animateOutDuration}
            delay={animateOutDelay}
            isLayerLocked={isActiveLayerLocked}
            onChange={onChange}
          />
        )}
      </AnimationsStyled.AnimationSectionWrapper>

      {(entryAnimationToggle || exitAnimationToggle) && (
        <AnimationsStyled.AnimationSectionWrapper removeBorder>
          <EditorSidebarRowWrapper>
            <AnimationsStyled.AnimationPreviewButton type="button" onClick={onTogglePreview}>
              Preview Animations
            </AnimationsStyled.AnimationPreviewButton>
          </EditorSidebarRowWrapper>
        </AnimationsStyled.AnimationSectionWrapper>
      )}
      {isPanAnimationApplied && (
        <MoveableTooltip
          showTooltip={showTooltip}
          text={'Pan animations can’t be combined with an Exit animation'}
          position="left"
          width={335}
        />
      )}
    </>
  );
};

export default memo(EditorSidebarAnimations);
