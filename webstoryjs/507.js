'use strict';
var r = n('./508'), o = n('./245'), a = n('./42'), i = n('./8'), l = n('./0'), s = n('./54'), c = (i.List, function (e) {
    var t, n;
    function DraftEditorNode() {
      return e.apply(this, arguments) || this;
    }
    return n = e, (t = DraftEditorNode).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, DraftEditorNode.prototype.render = function () {
      var e = this.props, t = e.block, n = e.contentState, i = e.customStyleFn, c = e.customStyleMap, u = e.decorator, f = e.direction, d = e.forceSelection, p = e.hasSelection, h = e.selection, g = e.tree, m = t.getKey(), b = t.getText(), v = g.size - 1, y = this.props.children || g.map(function (e, s) {
          var g = e.get('decoratorKey'), y = e.get('leaves'), C = y.size - 1, w = y.map(function (e, n) {
              var r = a.encode(m, s, n), u = e.get('start'), f = e.get('end');
              return l.createElement(o, {
                key: r,
                offsetKey: r,
                block: t,
                start: u,
                selection: p ? h : null,
                forceSelection: d,
                text: b.slice(u, f),
                styleSet: t.getInlineStyleAt(u),
                customStyleMap: c,
                customStyleFn: i,
                isLast: g === v && n === C
              });
            }).toArray();
          return g && u ? l.createElement(r, {
            block: t,
            children: w,
            contentState: n,
            decorator: u,
            decoratorKey: g,
            direction: f,
            leafSet: e,
            text: b,
            key: s
          }) : w;
        }).toArray();
      return l.createElement('div', {
        'data-offset-key': a.encode(m, 0, 0),
        className: s({
          'public/DraftStyleDefault/block': !0,
          'public/DraftStyleDefault/ltr': 'LTR' === f,
          'public/DraftStyleDefault/rtl': 'RTL' === f
        })
      }, y);
    }, DraftEditorNode;
  }(l.Component));
e.exports = c;