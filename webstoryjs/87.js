var r = n('./24'), o = n('./50'), a = n('./126'), i = n('./299'), l = a('IE_PROTO'), s = Object.prototype;
e.exports = i ? Object.getPrototypeOf : function (e) {
  return e = o(e), r(e, l) ? e[l] : 'function' == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null;
};