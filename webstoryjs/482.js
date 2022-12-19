'use strict';
var r = n('./29');
e.exports = function (e, t, n, o) {
  for (var a = t, i = e.getCharacterList(); a < n;)
    i = i.set(a, r.applyEntity(i.get(a), o)), a++;
  return e.set('characterList', i);
};