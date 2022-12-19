var r = n('./51'), o = n('./28');
e.exports = function (e) {
  if (!o(e))
    return !1;
  var t = r(e);
  return '[object Function]' == t || '[object GeneratorFunction]' == t || '[object AsyncFunction]' == t || '[object Proxy]' == t;
};