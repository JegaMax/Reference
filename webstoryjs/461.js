'use strict';
n('./60')({
  target: 'URL',
  proto: !0,
  enumerable: !0
}, {
  toJSON: function () {
    return URL.prototype.toString.call(this);
  }
});