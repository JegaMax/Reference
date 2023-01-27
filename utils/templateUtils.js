import pick from 'lodash/pick';
import { cloneObj } from './commonUtils';
import { normalizeLayers } from './editorUtils';

export const combineStoryAndTemplate = (
  story,
  template,
  slidePosition,
  selectedSlides,
) => {
  if (!template?.cuts) {
    return null;
  }
  if (!selectedSlides) {
    selectedSlides = [...Array(template.cuts.length).keys()];
  }

  const newSlideNumbers = selectedSlides.length + story.cuts.length - 1;
  const cuts = [];
  let templateSlidesCounter = 0;

  for (let index = 0; index < newSlideNumbers; index += 1) {
    if (slidePosition === index) {
      const cutInfo = pick(template.cuts[selectedSlides[templateSlidesCounter]], [
        'author',
        'backgroundColor',
        'duration',
        'layers',
        'title',
        'type',
      ]);
      const cutInfoCopy = cloneObj(cutInfo);
      const slide = normalizeLayers(cutInfoCopy, undefined, true);

      cuts.push({ ...story.cuts[index], ...slide, position: index });
    } else if (index > slidePosition && slidePosition + selectedSlides.length - 1 >= index) {
      templateSlidesCounter++;
      const slide = normalizeLayers(template.cuts[selectedSlides[templateSlidesCounter]], undefined, true);
      cuts.push({ ...slide, position: index });
    } else if (index < slidePosition) {
      cuts.push({ ...story.cuts[index], position: index });
    } else {
      cuts.push({ ...story.cuts[index - templateSlidesCounter], position: index });
    }
  }

  const combinedFonts = [...story.fonts, ...(template?.fonts ?? [])];
  const combinedGoogleFonts = [...story.googleFonts, ...(template?.googleFonts ?? [])];

  return {
    ...story,
    cuts,
    fonts: combinedFonts,
    googleFonts: combinedGoogleFonts,
    storyUpdatedAt: new Date().toISOString(),
  };
};
