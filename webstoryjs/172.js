var r = n('./124'), o = Function.toString;
'function' != typeof r.inspectSource && (r.inspectSource = function (e) {
  return o.call(e);
}), e.exports = r.inspectSource;