'use strict';
var r = n('./8').OrderedMap, o = {
    createFromArray: function (e) {
      return r(e.map(function (e) {
        return [
          e.getKey(),
          e
        ];
      }));
    }
  };
e.exports = o;