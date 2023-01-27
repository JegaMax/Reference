export const changeActiveBullet = (bulletIndex) => {
  (document.getElementsByClassName('splide__pagination__page')[bulletIndex]).click();
};

export const waitForAction = (action) =>
  new Promise((resolve, reject) => {
    action();
    resolve();
  });

export const scaleTextarea = (textareaElement) => {
  if (textareaElement) {
    textareaElement.style.height = '1px';
    textareaElement.style.height = textareaElement.scrollHeight + 'px';
  }
};

export const previewMutationListener = (element) => (mutationsList) => {
  for (const mutation of mutationsList) {
    const lightbox = element?.querySelector('.lightbox');
    if (mutation.type === 'attributes' && mutation.target === lightbox) {
      if (element) {
        const widgetContent = document.querySelector('#widget-content');
        const widgetSidebar = document.querySelector('#widget-sidebar');
        const scrollBars = document.querySelectorAll('.editor-scrollbar');
        if (lightbox?.classList?.contains('show') && widgetContent && widgetSidebar) {
          setTimeout(() => {
            widgetContent.style.zIndex = '1';
            widgetSidebar.style.zIndex = '0';
            scrollBars.forEach((scrollbar) => (scrollbar.style.zIndex = '0'));
          }, 180);
        }
        if (!lightbox?.classList?.contains('show') && widgetContent && widgetSidebar) {
          widgetContent?.style?.removeProperty('z-index');
          widgetSidebar?.style?.removeProperty('z-index');
          scrollBars.forEach((scrollbar) => scrollbar.style?.removeProperty('z-index'));
        }
      }
    }
  }
};
