'use strict';
var r = {
  isImage: function (e) {
    return 'image' === o(e)[0];
  },
  isJpeg: function (e) {
    var t = o(e);
    return r.isImage(e) && ('jpeg' === t[1] || 'pjpeg' === t[1]);
  }
};
function o(e) {
  return e.split('/');
}
e.exports = r;