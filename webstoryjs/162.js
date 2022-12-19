'use strict';
var r = n('./23'), o = n('./539'), a = r.isPlatform('Mac OS X'), i = {
    isCtrlKeyCommand: function (e) {
      return !!e.ctrlKey && !e.altKey;
    },
    isOptionKeyCommand: function (e) {
      return a && e.altKey;
    },
    usesMacOSHeuristics: function () {
      return a;
    },
    hasCommandModifier: function (e) {
      return a ? !!e.metaKey && !e.altKey : i.isCtrlKeyCommand(e);
    },
    isSoftNewlineEvent: o
  };
e.exports = i;