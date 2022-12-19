'use strict';
var r = n('./522'), o = n('./523'), a = n('./253'), i = new RegExp('\r\n', 'g'), l = {
    'text/rtf': 1,
    'text/html': 1
  };
function s(e) {
  if ('file' == e.kind)
    return e.getAsFile();
}
var c = function () {
  function DataTransfer(e) {
    this.data = e, this.types = e.types ? o(e.types) : [];
  }
  var e = DataTransfer.prototype;
  return e.isRichText = function () {
    return !(!this.getHTML() || !this.getText()) || !this.isImage() && this.types.some(function (e) {
      return l[e];
    });
  }, e.getText = function () {
    var e;
    return this.data.getData && (this.types.length ? -1 != this.types.indexOf('text/plain') && (e = this.data.getData('text/plain')) : e = this.data.getData('Text')), e ? e.replace(i, '\n') : null;
  }, e.getHTML = function () {
    if (this.data.getData) {
      if (!this.types.length)
        return this.data.getData('Text');
      if (-1 != this.types.indexOf('text/html'))
        return this.data.getData('text/html');
    }
  }, e.isLink = function () {
    return this.types.some(function (e) {
      return -1 != e.indexOf('Url') || -1 != e.indexOf('text/uri-list') || e.indexOf('text/x-moz-url');
    });
  }, e.getLink = function () {
    return this.data.getData ? -1 != this.types.indexOf('text/x-moz-url') ? this.data.getData('text/x-moz-url').split('\n')[0] : -1 != this.types.indexOf('text/uri-list') ? this.data.getData('text/uri-list') : this.data.getData('url') : null;
  }, e.isImage = function () {
    var e = this.types.some(function (e) {
      return -1 != e.indexOf('application/x-moz-file');
    });
    if (e)
      return !0;
    for (var t = this.getFiles(), n = 0; n < t.length; n++) {
      var o = t[n].type;
      if (!r.isImage(o))
        return !1;
    }
    return !0;
  }, e.getCount = function () {
    return this.data.hasOwnProperty('items') ? this.data.items.length : this.data.hasOwnProperty('mozItemCount') ? this.data.mozItemCount : this.data.files ? this.data.files.length : null;
  }, e.getFiles = function () {
    return this.data.items ? Array.prototype.slice.call(this.data.items).map(s).filter(a.thatReturnsArgument) : this.data.files ? Array.prototype.slice.call(this.data.files) : [];
  }, e.hasFiles = function () {
    return this.getFiles().length > 0;
  }, DataTransfer;
}();
e.exports = c;