'use strict';
const DateRange = require('./fcts-ext-expandercollapser');
;(function (env, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = env.document
       ? factory(env) : function (win) {
         if (!win.document) {
           throw new Error('Window with document not present');
         }
         return factory(win, true);
       };
  } else {
    env.DateRangeChooser = factory(env, true);
  }
})(typeof window !== 'undefined' ? window : this, function (_window, windowExists) {
  var FC = _window.FusionCharts,
    FusionCalendar = _window.FusionCalendar;
  FC.register('extension', ['private', 'expander-collapser', function () {
    var DateTimeFormatter = this.hcLib.DateTimeFormatter;
    FC.registerComponent('extensions', 'expander-collapser', DateRange({
      FusionCharts: FC,
      DateTimeFormatter: DateTimeFormatter
    }));
  }]);
});
