var r = n('./339'), o = n('./38'), a = Object.prototype, i = a.hasOwnProperty, l = a.propertyIsEnumerable, s = r(function () {
    return arguments;
  }()) ? r : function (e) {
    return o(e) && i.call(e, 'callee') && !l.call(e, 'callee');
  };
e.exports = s;