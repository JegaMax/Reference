'use strict';
var r = n('./34');
function o() {
  return (o = r || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
var a = n('./42'), i = n('./0'), l = n('./155'), s = n('./108'), c = function (e) {
    var t, n;
    function DraftEditorDecoratedLeaves() {
      return e.apply(this, arguments) || this;
    }
    return n = e, (t = DraftEditorDecoratedLeaves).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, DraftEditorDecoratedLeaves.prototype.render = function () {
      var e = this.props, t = e.block, n = e.children, r = e.contentState, c = e.decorator, u = e.decoratorKey, f = e.direction, d = e.leafSet, p = e.text, h = t.getKey(), g = d.get('leaves'), m = c.getComponentForKey(u), b = c.getPropsForKey(u), v = a.encode(h, parseInt(u, 10), 0), y = p.slice(g.first().get('start'), g.last().get('end')), C = s.getHTMLDirIfDifferent(l.getDirection(y), f);
      return i.createElement(m, o({}, b, {
        contentState: r,
        decoratedText: y,
        dir: C,
        key: v,
        entityKey: t.getEntityAt(d.get('start')),
        offsetKey: v
      }), n);
    }, DraftEditorDecoratedLeaves;
  }(i.Component);
e.exports = c;