'use strict';
var r = n('./162'), o = n('./111'), a = n('./23'), i = a.isPlatform('Mac OS X'), l = i && a.isBrowser('Firefox < 29'), s = r.hasCommandModifier, c = r.isCtrlKeyCommand;
function u(e) {
  return i && e.altKey || c(e);
}
e.exports = function (e) {
  switch (e.keyCode) {
  case 66:
    return s(e) ? 'bold' : null;
  case 68:
    return c(e) ? 'delete' : null;
  case 72:
    return c(e) ? 'backspace' : null;
  case 73:
    return s(e) ? 'italic' : null;
  case 74:
    return s(e) ? 'code' : null;
  case 75:
    return i && c(e) ? 'secondary-cut' : null;
  case 77:
  case 79:
    return c(e) ? 'split-block' : null;
  case 84:
    return i && c(e) ? 'transpose-characters' : null;
  case 85:
    return s(e) ? 'underline' : null;
  case 87:
    return i && c(e) ? 'backspace-word' : null;
  case 89:
    return c(e) ? i ? 'secondary-paste' : 'redo' : null;
  case 90:
    return function (e) {
      return s(e) ? e.shiftKey ? 'redo' : 'undo' : null;
    }(e) || null;
  case o.RETURN:
    return 'split-block';
  case o.DELETE:
    return function (e) {
      return !i && e.shiftKey ? null : u(e) ? 'delete-word' : 'delete';
    }(e);
  case o.BACKSPACE:
    return function (e) {
      return s(e) && i ? 'backspace-to-start-of-line' : u(e) ? 'backspace-word' : 'backspace';
    }(e);
  case o.LEFT:
    return l && s(e) ? 'move-selection-to-start-of-block' : null;
  case o.RIGHT:
    return l && s(e) ? 'move-selection-to-end-of-block' : null;
  default:
    return null;
  }
};