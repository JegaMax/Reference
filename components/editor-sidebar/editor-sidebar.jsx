import isNil from 'lodash/isNil';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { layerTypes } from '../../interfaces/layer-types';
import { selectSelectedLayers } from '../../appredux/features/amp-story/ampStorySlice';
import { handleCroppedLayer } from '../../appredux/features/editor/helpers/helpersSlice';
import { isMediaLayer } from '../../utils/editorUtils';
import EditorSidebarAnimations from './editor-sidebar-animations/editor-sidebar-animations';
import EditorSidebarCtaSettings from './editor-sidebar-settings/editor-sidebar-cta-settings/editor-sidebar-cta-settings';
import EditorSidebarLinkSettings from './editor-sidebar-settings/editor-sidebar-link-settings/editor-sidebar-link-settings';
import EditorSidebarMultiLayersSettings from './editor-sidebar-settings/editor-sidebar-multi-layers-settings';
import EditorSidebarOutlinkSettings from './editor-sidebar-settings/editor-sidebar-outlink-settings/editor-sidebar-outlink-settings';
import EditorSidebarVideoSettings from './editor-sidebar-settings/editor-sidebar-video-settings/editor-sidebar-video-settings';
import { EditorSidebarHeader } from './shared/elements';
import { EditorSidebarBodyWrapper, EditorSidebarOuterWrapper, EditorSidebarWrapper } from './shared/structure';
// Components
import {
  EditorSidebarAudioSettings,
  EditorSidebarBackgroundSettings,
  EditorSidebarEffectsSettings,
  EditorSidebarGradientSettings,
  EditorSidebarImageSettings,
  EditorSidebarLayoutSettings,
  EditorSidebarPreviewSettings,
  EditorSidebarShapeSettings,
  EditorSidebarTextSettings,
  EditorSidebarTextStyle
} from './editor-sidebar-settings';

// Constants
import {
  MAIN_SIDEBAR_TABS,
  SIDEBAR_TAB_ANIMATION,
  SIDEBAR_TAB_DESIGN,
  SIDEBAR_TAB_PREVIEW
} from './constants/editor-sidebar-header-tabs';

const EditorSidebar = ({
  layer,
  keepRatio,
  backgroundColor,
  ctaLayerRef,
  handleLayerChange,
  handleBatchLayerChange,
  handleSlideBackgroundColorChange,
}) => {
  const dispatch = useAppDispatch();

  const [activeTabName, setActiveTabName] = useState(SIDEBAR_TAB_DESIGN);
  const [tabs, setTabs] = useState(MAIN_SIDEBAR_TABS);

  const activeLayerPosition = useAppSelector((state) => state.ampStory.present.activeLayerPosition);
  const showFullScreenIEditor = useAppSelector((state) => state.helpers.showFullScreenIEditor);
  const selectedChildLayer = useAppSelector((state) => state.groupLayerHelper.selectedChildLayer);
  const selectedLayers = useAppSelector(selectSelectedLayers);

  const activeLayer = useMemo(() => {
    if (!isNil(selectedChildLayer) && layer?.type === layerTypes.GROUP) {
      const childLayer = layer.childLayers?.find(({ _id }) => _id === selectedChildLayer._id);
      if (childLayer) {
        return childLayer;
      }
    }

    return layer;
  }, [layer, selectedChildLayer]);

  const activeLayerType = activeLayer?.type;

  const getTabs = useCallback(() => {
    if (
      activeLayerType !== layerTypes.CTA_LINK &&
      activeLayerType !== layerTypes.OUTLINK &&
      typeof activeLayerPosition !== 'undefined' &&
      activeLayerPosition > -1 &&
      !showFullScreenIEditor
    ) {
      return setTabs(MAIN_SIDEBAR_TABS);
    }

    if (showFullScreenIEditor) {
      return setTabs([SIDEBAR_TAB_PREVIEW]);
    }

    return setTabs([SIDEBAR_TAB_DESIGN]);
  }, [activeLayerPosition, activeLayerType, showFullScreenIEditor]);

  const onFocus = useCallback(() => {
    if (isMediaLayer(activeLayerType)) {
      dispatch(handleCroppedLayer());
    }
  }, [dispatch, activeLayerType]);

  useEffect(() => {
    getTabs();
  }, [activeLayerType, activeLayerPosition, showFullScreenIEditor, getTabs]);

  useEffect(() => {
    setActiveTabName((prev) => {
      if (tabs?.includes(SIDEBAR_TAB_ANIMATION) && prev === SIDEBAR_TAB_ANIMATION) {
        return prev;
      }

      if (tabs?.includes(SIDEBAR_TAB_PREVIEW)) {
        return SIDEBAR_TAB_PREVIEW;
      }

      return SIDEBAR_TAB_DESIGN;
    });
  }, [tabs]);

  return (
    <EditorSidebarOuterWrapper onFocus={onFocus}>
      <EditorSidebarWrapper>
        <EditorSidebarHeader activeTab={activeTabName} tabs={tabs} onTabClick={setActiveTabName} />

        {showFullScreenIEditor && <EditorSidebarPreviewSettings />}

        {activeTabName === SIDEBAR_TAB_DESIGN && (
          <EditorSidebarBodyWrapper>
            {!isNil(activeLayerPosition) &&
              activeLayerPosition > -1 &&
              layer &&
              activeLayerType !== layerTypes.CTA_LINK &&
              activeLayerType !== layerTypes.OUTLINK && (
                <EditorSidebarLayoutSettings
                  layer={activeLayer}
                  keepRatio={keepRatio}
                  handleLayerChange={handleLayerChange}
                  handleBatchLayerChange={handleBatchLayerChange}
                />
              )}

            {activeLayerType === layerTypes.HTML && (
              <EditorSidebarTextStyle
                layer={activeLayer}
                parentLayer={layer}
                handleBatchLayerChange={handleBatchLayerChange}
              />
            )}

            {activeLayerType === layerTypes.HTML && (
              <EditorSidebarTextSettings
                layer={activeLayer}
                parentLayer={layer}
                handleBatchLayerChange={handleBatchLayerChange}
              />
            )}

            {activeLayerType === layerTypes.SHAPE && (
              <EditorSidebarShapeSettings
                layer={activeLayer}
                parentLayer={layer}
                handleLayerChange={handleLayerChange}
                handleBatchLayerChange={handleBatchLayerChange}
              />
            )}

            {activeLayerType === layerTypes.GRADIENTS && (
              <EditorSidebarGradientSettings
                layer={activeLayer}
                parentLayer={layer}
                handleBatchLayerChange={handleBatchLayerChange}
              />
            )}

            {(activeLayerType === layerTypes.IMAGE || activeLayerType === layerTypes.GIFS) && layer && (
              <EditorSidebarImageSettings
                layer={activeLayer}
                parentLayer={layer}
                handleLayerChange={handleLayerChange}
              />
            )}

            {activeLayerType === layerTypes.VIDEO && layer && (
              <EditorSidebarVideoSettings
                layer={activeLayer}
                parentLayer={layer}
                handleLayerChange={handleLayerChange}
              />
            )}

            {/* Refactor ends here */}
            {activeLayerType === layerTypes.CTA_LINK && layer && (
              <EditorSidebarCtaSettings
                layer={layer}
                ctaLayerRef={ctaLayerRef}
                handleLayerChange={handleLayerChange}
                handleBatchLayerChange={handleBatchLayerChange}
              />
            )}

            {activeLayerType === layerTypes.OUTLINK && layer && (
              <EditorSidebarOutlinkSettings
                layer={layer}
                ctaLayerRef={ctaLayerRef}
                handleLayerChange={handleLayerChange}
                handleBatchLayerChange={handleBatchLayerChange}
              />
            )}

            {(isNil(activeLayerPosition) || activeLayerPosition < 0) &&
              backgroundColor &&
              !(selectedLayers?.length > 1) && (
                <>
                  <EditorSidebarBackgroundSettings
                    backgroundColor={backgroundColor}
                    handleSlideBackgroundColorChange={handleSlideBackgroundColorChange}
                  />
                  <EditorSidebarAudioSettings />
                </>
              )}

            {activeLayerType !== layerTypes.CTA_LINK && activeLayerType !== layerTypes.OUTLINK && layer && (
              <>
                <EditorSidebarEffectsSettings
                  layer={activeLayer}
                  parentLayer={layer}
                  handleLayerChange={handleLayerChange}
                  handleBatchLayerChange={handleBatchLayerChange}
                />
                <EditorSidebarLinkSettings
                  // Force unmount so the values can always be in sync
                  key={activeLayer._id}
                  layer={activeLayer}
                  handleBatchLayerChange={handleBatchLayerChange}
                />
              </>
            )}

            {selectedLayers?.length > 1 && <EditorSidebarMultiLayersSettings />}
          </EditorSidebarBodyWrapper>
        )}
        {activeTabName === SIDEBAR_TAB_ANIMATION && layer && (
          <EditorSidebarBodyWrapper>
            <EditorSidebarAnimations
              key={layer._id}
              layer={activeLayer}
              parentLayer={layer}
              handleLayerChange={handleLayerChange}
              handleBatchLayerChange={handleBatchLayerChange}
            />
          </EditorSidebarBodyWrapper>
        )}
        <div id="color-picker-modal" />
      </EditorSidebarWrapper>
    </EditorSidebarOuterWrapper>
  );
};

export default memo(EditorSidebar);
