const editorWrapperResizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  if (entry?.target) {
    const root = document.documentElement;
    const currentRootPadding = getComputedStyle(root).getPropertyValue('--editor-wrapper-padding');
    const currentPadding = getComputedStyle(entry.target).getPropertyValue('padding');
    const currentRootHeight = getComputedStyle(root).getPropertyValue('--editor-height');
    const currentHeight = getComputedStyle(entry.target).getPropertyValue('height');

    if (currentRootPadding !== currentPadding) {
      root.style.setProperty('--editor-wrapper-padding', currentPadding);
    }

    if (currentRootHeight !== currentHeight) {
      root.style.setProperty('--editor-height', currentHeight);
    }
  }
});

const toolbarResizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  if (entry?.target) {
    const root = document.documentElement;
    const currentRootHeight = getComputedStyle(root).getPropertyValue('--toolbar-height');
    const currentHeight = getComputedStyle(entry.target).getPropertyValue('height');

    if (currentRootHeight !== currentHeight) {
      root.style.setProperty('--toolbar-height', currentHeight);
    }
  }
});

const layerButtonResizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  if (entry?.target) {
    const root = document.documentElement;
    const currentRootHeight = getComputedStyle(root).getPropertyValue('--layer-button-height');
    const currentHeight = getComputedStyle(entry.target).getPropertyValue('height');

    if (currentRootHeight !== currentHeight) {
      root.style.setProperty('--layer-button-height', currentHeight);
    }
  }
});

export { editorWrapperResizeObserver, toolbarResizeObserver, layerButtonResizeObserver };
