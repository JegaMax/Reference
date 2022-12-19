'use strict';
var r, o = n('./171'), a = (r = o) && r.__esModule ? r : { default: r };
var i = void 0, l = void 0, s = [];
function c() {
  0 !== s.length && s[s.length - 1].focusContent();
}
a.default.subscribe(function (e, t) {
  i && l || ((i = document.createElement('div')).setAttribute('data-react-modal-body-trap', ''), i.style.position = 'absolute', i.style.opacity = '0', i.setAttribute('tabindex', '0'), i.addEventListener('focus', c), (l = i.cloneNode()).addEventListener('focus', c)), (s = t).length > 0 ? (document.body.firstChild !== i && document.body.insertBefore(i, document.body.firstChild), document.body.lastChild !== l && document.body.appendChild(l)) : (i.parentElement && i.parentElement.removeChild(i), l.parentElement && l.parentElement.removeChild(l));
});