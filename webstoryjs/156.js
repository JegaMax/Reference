'use strict';
var r = n('./0'), o = n('./54'), a = (0, n('./8').Map)({
    'header-one': { element: 'h1' },
    'header-two': { element: 'h2' },
    'header-three': { element: 'h3' },
    'header-four': { element: 'h4' },
    'header-five': { element: 'h5' },
    'header-six': { element: 'h6' },
    section: { element: 'section' },
    article: { element: 'article' },
    'unordered-list-item': {
      element: 'li',
      wrapper: r.createElement('ul', { className: o('public/DraftStyleDefault/ul') })
    },
    'ordered-list-item': {
      element: 'li',
      wrapper: r.createElement('ol', { className: o('public/DraftStyleDefault/ol') })
    },
    blockquote: { element: 'blockquote' },
    atomic: { element: 'figure' },
    'code-block': {
      element: 'pre',
      wrapper: r.createElement('pre', { className: o('public/DraftStyleDefault/pre') })
    },
    unstyled: {
      element: 'div',
      aliasedElements: ['p']
    }
  });
e.exports = a;