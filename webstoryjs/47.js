var n = Math.ceil, r = Math.floor;
e.exports = function (e) {
  return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
};