var r = n('./143'), o = n('./359'), a = n('./28'), i = n('./199'), l = /^\[object .+?Constructor\]$/, s = Function.prototype, c = Object.prototype, u = s.toString, f = c.hasOwnProperty, d = RegExp('^' + u.call(f).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
e.exports = function (e) {
  return !(!a(e) || o(e)) && (r(e) ? d : l).test(i(e));
};