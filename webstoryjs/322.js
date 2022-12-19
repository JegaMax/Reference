'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = void 0;
var r, o = (r = n('./323')) && r.__esModule ? r : { default: r };
var a = {
  date: (0, o.default)({
    formats: {
      full: 'EEEE, MMMM do, y',
      long: 'MMMM do, y',
      medium: 'MMM d, y',
      short: 'MM/dd/yyyy'
    },
    defaultWidth: 'full'
  }),
  time: (0, o.default)({
    formats: {
      full: 'h:mm:ss a zzzz',
      long: 'h:mm:ss a z',
      medium: 'h:mm:ss a',
      short: 'h:mm a'
    },
    defaultWidth: 'full'
  }),
  dateTime: (0, o.default)({
    formats: {
      full: '{{date}} \'at\' {{time}}',
      long: '{{date}} \'at\' {{time}}',
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}'
    },
    defaultWidth: 'full'
  })
};
t.default = a, e.exports = t.default;