'use strict';
var r = n('./500'), o = 'Unknown', a = { 'Mac OS': 'Mac OS X' };
var i, l = new r().getResult(), s = function (e) {
    if (!e)
      return {
        major: '',
        minor: ''
      };
    var t = e.split('.');
    return {
      major: t[0],
      minor: t[1]
    };
  }(l.browser.version), c = {
    browserArchitecture: l.cpu.architecture || o,
    browserFullVersion: l.browser.version || o,
    browserMinorVersion: s.minor || o,
    browserName: l.browser.name || o,
    browserVersion: l.browser.major || o,
    deviceName: l.device.model || o,
    engineName: l.engine.name || o,
    engineVersion: l.engine.version || o,
    platformArchitecture: l.cpu.architecture || o,
    platformName: (i = l.os.name, a[i] || i || o),
    platformVersion: l.os.version || o,
    platformFullVersion: l.os.version || o
  };
e.exports = c;