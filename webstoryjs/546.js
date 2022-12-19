'use strict';
var r = n('./21'), o = n('./11');
e.exports = function (e) {
  var t = r.splitBlock(e.getCurrentContent(), e.getSelection());
  return o.push(e, t, 'split-block');
};