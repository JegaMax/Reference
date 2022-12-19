'use strict';
e.exports = function (e) {
  if (null != e)
    return e;
  throw new Error('Got unexpected null or undefined');
};