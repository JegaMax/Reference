'use strict';
var r = n('./0'), o = n('./16');
t.a = function (e, t) {
  return Object(r.useCallback)((...t) => Object(o.unstable_batchedUpdates)(() => e(...t)), t);
};