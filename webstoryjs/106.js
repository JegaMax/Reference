'use strict';
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var o = n('./233'), a = n('./8'), i = n('./9'), l = n('./491'), s = (0, a.Map)(), c = l();
function u(e, t) {
  console.warn('WARNING: ' + e + ' will be deprecated soon!\nPlease use "' + t + '" instead.');
}
var f = {
  getLastCreatedEntityKey: function () {
    return u('DraftEntity.getLastCreatedEntityKey', 'contentState.getLastCreatedEntityKey'), f.__getLastCreatedEntityKey();
  },
  create: function (e, t, n) {
    return u('DraftEntity.create', 'contentState.createEntity'), f.__create(e, t, n);
  },
  add: function (e) {
    return u('DraftEntity.add', 'contentState.addEntity'), f.__add(e);
  },
  get: function (e) {
    return u('DraftEntity.get', 'contentState.getEntity'), f.__get(e);
  },
  __getAll: function __getAll() {
    return s;
  },
  __loadWithEntities: function __loadWithEntities(e) {
    s = e, c = l();
  },
  mergeData: function (e, t) {
    return u('DraftEntity.mergeData', 'contentState.mergeEntityData'), f.__mergeData(e, t);
  },
  replaceData: function (e, t) {
    return u('DraftEntity.replaceData', 'contentState.replaceEntityData'), f.__replaceData(e, t);
  },
  __getLastCreatedEntityKey: function __getLastCreatedEntityKey() {
    return c;
  },
  __create: function __create(e, t, n) {
    return f.__add(new o({
      type: e,
      mutability: t,
      data: n || {}
    }));
  },
  __add: function __add(e) {
    return c = l(), s = s.set(c, e), c;
  },
  __get: function __get(e) {
    var t = s.get(e);
    return t || i(!1), t;
  },
  __mergeData: function __mergeData(e, t) {
    var n = f.__get(e), o = function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {}, o = Object.keys(n);
          'function' == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
            return Object.getOwnPropertyDescriptor(n, e).enumerable;
          }))), o.forEach(function (t) {
            r(e, t, n[t]);
          });
        }
        return e;
      }({}, n.getData(), t), a = n.set('data', o);
    return s = s.set(e, a), a;
  },
  __replaceData: function __replaceData(e, t) {
    var n = f.__get(e).set('data', t);
    return s = s.set(e, n), n;
  }
};
e.exports = f;