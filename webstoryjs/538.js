'use strict';
var r = n('./21'), o = n('./11'), a = n('./162'), i = n('./111'), l = n('./540'), s = n('./23'), c = n('./114'), u = n('./541'), f = n('./543'), d = n('./545'), p = n('./546'), h = n('./547'), g = n('./548'), m = n('./256'), b = n('./549'), v = n('./550'), y = n('./551'), C = a.isOptionKeyCommand, w = s.isBrowser('Chrome');
e.exports = function (e, t) {
  var n = t.which, a = e._latestEditorState;
  function s(n) {
    var r = e.props[n];
    return !!r && (r(t), !0);
  }
  switch (n) {
  case i.RETURN:
    if (t.preventDefault(), e.props.handleReturn && c(e.props.handleReturn(t, a)))
      return;
    break;
  case i.ESC:
    if (t.preventDefault(), s('onEscape'))
      return;
    break;
  case i.TAB:
    if (s('onTab'))
      return;
    break;
  case i.UP:
    if (s('onUpArrow'))
      return;
    break;
  case i.RIGHT:
    if (s('onRightArrow'))
      return;
    break;
  case i.DOWN:
    if (s('onDownArrow'))
      return;
    break;
  case i.LEFT:
    if (s('onLeftArrow'))
      return;
    break;
  case i.SPACE:
    w && C(t) && t.preventDefault();
  }
  var x = e.props.keyBindingFn(t);
  if (null != x && '' !== x)
    if ('undo' !== x) {
      if (t.preventDefault(), !e.props.handleKeyCommand || !c(e.props.handleKeyCommand(x, a, t.timeStamp))) {
        var E = function (e, t, n) {
          switch (e) {
          case 'redo':
            return o.redo(t);
          case 'delete':
            return b(t);
          case 'delete-word':
            return d(t);
          case 'backspace':
            return m(t);
          case 'backspace-word':
            return f(t);
          case 'backspace-to-start-of-line':
            return u(t, n);
          case 'split-block':
            return p(t);
          case 'transpose-characters':
            return v(t);
          case 'move-selection-to-start-of-block':
            return g(t);
          case 'move-selection-to-end-of-block':
            return h(t);
          case 'secondary-cut':
            return l.cut(t);
          case 'secondary-paste':
            return l.paste(t);
          default:
            return t;
          }
        }(x, a, t);
        E !== a && e.update(E);
      }
    } else
      y(t, a, e.update);
  else if (n === i.SPACE && w && C(t)) {
    var _ = r.replaceText(a.getCurrentContent(), a.getSelection(), '\xA0');
    e.update(o.push(a, _, 'insert-characters'));
  }
};