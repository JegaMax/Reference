'use strict';
var r = n('./0'), o = n('./54'), a = function (e) {
    var t, n;
    function DraftEditorPlaceholder() {
      return e.apply(this, arguments) || this;
    }
    n = e, (t = DraftEditorPlaceholder).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var a = DraftEditorPlaceholder.prototype;
    return a.shouldComponentUpdate = function (e) {
      return this.props.text !== e.text || this.props.editorState.getSelection().getHasFocus() !== e.editorState.getSelection().getHasFocus();
    }, a.render = function () {
      var e = this.props.editorState.getSelection().getHasFocus(), t = o({
          'public/DraftEditorPlaceholder/root': !0,
          'public/DraftEditorPlaceholder/hasFocus': e
        });
      return r.createElement('div', { className: t }, r.createElement('div', {
        className: o('public/DraftEditorPlaceholder/inner'),
        id: this.props.accessibilityID,
        style: { whiteSpace: 'pre-wrap' }
      }, this.props.text));
    }, DraftEditorPlaceholder;
  }(r.Component);
e.exports = a;