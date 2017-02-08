/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var DateRange = __webpack_require__(2);
	;(function (env, factory) {
	  if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	    module.exports = env.document ? factory(env) : function (win) {
	      if (!win.document) {
	        throw new Error('Window with document not present');
	      }
	      return factory(win, true);
	    };
	  } else {
	    env.DateRangeChooser = factory(env, true);
	  }
	})(typeof window !== 'undefined' ? window : undefined, function (_window, windowExists) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function (dep) {
	  /**
	   * Class representing the DateRange.
	   */
	  var DateRange = function () {
	    function DateRange() {
	      _classCallCheck(this, DateRange);

	      /**
	      * @private
	      */
	      if (typeof dep.FusionCharts === 'function') {
	        this.toolbox = dep.FusionCharts.getComponent('api', 'toolbox');
	      } else {
	        throw new Error('Unable to find FusionCharts.');
	      }
	      this.btns = {
	        contextualObj: {},
	        calculatedObj: {}
	      };
	      this.HorizontalToolbar = this.toolbox.HorizontalToolbar;
	      this.ComponentGroup = this.toolbox.ComponentGroup;
	      this.createObjectAssign();
	    }

	    _createClass(DateRange, [{
	      key: 'createObjectAssign',
	      value: function createObjectAssign() {
	        if (typeof Object.assign !== 'function') {
	          Object.assign = function (target, varArgs) {
	            'use strict';

	            if (target == null) {
	              throw new TypeError('Cannot convert undefined or null to object');
	            }

	            var to = Object(target);

	            for (var index = 1; index < arguments.length; index++) {
	              var nextSource = arguments[index];

	              if (nextSource != null) {
	                for (var nextKey in nextSource) {
	                  // Avoid bugs when hasOwnProperty is shadowed
	                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	                    to[nextKey] = nextSource[nextKey];
	                  }
	                }
	              }
	            }
	            return to;
	          };
	        }
	      }
	    }, {
	      key: 'createD3Buttons',
	      value: function createD3Buttons(store) {
	        var key,
	            inputButton,
	            text,
	            config,
	            states,
	            state,
	            btn,
	            styles = this.extData.button,
	            paper = this.graphics.paper,
	            d3 = paper.getInstances().d3,
	            self = this;

	        for (key in store) {
	          inputButton = store[key];
	          text = inputButton.text;
	          config = inputButton.config;
	          if (!self.btns[key]) {
	            self.btns[key] = {};
	          }
	          btn = self.btns[key].btn = d3.button(text).setConfig(config);
	          btn.namespace('fusioncharts');
	          btn.appendSelector('standarperiodselector');
	          self.addCssRules(btn.getIndividualClassNames(btn.getClassName()), styles);
	          states = styles.states;
	          for (state in states) {
	            self.addCssRules(btn.getIndividualClassNames(btn.config.states[state]), styles.states[state]);
	          }

	          inputButton.eventListeners && btn.attachEventHandlers({
	            click: inputButton.eventListeners.click.bind(btn)
	          });
	          inputButton.group.addSymbol(btn);
	        }
	      }
	    }, {
	      key: 'createD3Labels',
	      value: function createD3Labels(store) {
	        var key,
	            label,
	            text,
	            config,
	            styles = this.extData.label,
	            self = this,
	            dependencies = {
	          paper: self.graphics.paper,
	          chart: self.chart,
	          smartLabel: self.smartLabel,
	          chartContainer: self.graphics.container
	        };

	        for (key in store) {
	          label = store[key];
	          text = label.text;
	          config = label.config;
	          self[key] = new self.toolbox.Label(text, dependencies, config);
	          // self[key].namespace('fusioncharts');
	          // self[key].appendSelector('daterange');
	          self.addCssRules(self[key].getIndividualClassNames(self[key].getClassName()), styles);
	          label.group.addSymbol(self[key]);
	        }
	      }
	    }, {
	      key: 'init',


	      /**
	       * Fusioncharts life cycle method for extension
	       */
	      value: function init(require) {
	        var instance = this;
	        require(['graphics', 'chart', 'canvasConfig', 'MarkerManager', 'reactiveModel', 'globalReactiveModel', 'spaceManagerInstance', 'smartLabel', 'extData', 'chartInstance', function (graphics, chart, canvasConfig, markerManager, reactiveModel, globalReactiveModel, spaceManagerInstance, smartLabel, extData, chartInstance) {
	          instance.graphics = graphics;
	          instance.chart = chart;
	          instance.markerManager = markerManager;
	          instance.canvasConfig = canvasConfig;
	          instance.reactiveModel = reactiveModel;
	          instance.globalReactiveModel = globalReactiveModel;
	          instance.spaceManagerInstance = spaceManagerInstance;
	          instance.smartLabel = smartLabel;
	          instance.extDataUser = extData;
	          instance.chartInstance = chartInstance;
	        }]);
	        instance.extData = {
	          'disabled': false,
	          'default-select': 'ALL',
	          'all-button': true,
	          'contextual-button': true,
	          'calculated-button': true,
	          'posWrtCanvas': 'top',
	          'anchor-align': 'right',
	          'layout': 'inline',
	          'position': 'top',
	          'alignment': 'left',
	          'orientation': 'horizontal',
	          'customMultipliers': {
	            'millisecond': [1, 500],
	            'second': [1, 5, 15, 30],
	            'minute': [1, 5, 15, 30],
	            'hour': [1, 3, 6, 12],
	            'day': [1, 7, 15],
	            'month': [1, 3, 6],
	            'year': [1, 3, 5]
	          },
	          padding: 0,
	          button: {
	            height: 22,
	            radius: 1,
	            className: 'standard-period-selector',
	            container: {
	              style: {
	                fill: '#FFFFFF',
	                'stroke-width': '1px',
	                stroke: '#CED5D4',
	                labelFill: '#4b4b4b',
	                strokeWidth: '1px'
	                // 'input-shadow-fill': '#000000',
	                // 'input-shadow-opacity': 0.35,
	              }
	            },
	            text: {
	              style: {
	                'fontFamily': '"Lucida Grande", sans-serif',
	                'font-size': '13px',
	                'fill': '#4b4b4b',
	                'line-height': '1px',
	                'letter-spacing': '-0.04em'
	              }
	            },
	            states: {
	              hover: {
	                className: 'standard-period-selector-state-hover',
	                container: {
	                  style: {
	                    cursor: 'pointer',
	                    fill: '#f7f7f7'
	                  }
	                }
	              }
	            }
	          },
	          label: {
	            height: 22,
	            className: 'standard-period-selector-label',
	            text: {
	              style: {
	                'font-weight': 'bold',
	                'font-family': '"Lucida Grande", sans-serif',
	                'font-size': '13px',
	                'fill': '#4b4b4b'
	              }
	            }
	          }
	        };

	        instance.config = instance.extData;
	        Object.assign(instance.extData, instance.extDataUser);
	        instance.measurement = {};
	        (instance.toolbars = []).push(instance.createToolbar());

	        return instance;
	      }
	    }, {
	      key: 'createToolbar',


	      // creates toolbar
	      value: function createToolbar() {
	        var self = this,
	            buttonGroup,
	            toolbar,
	            allButton,
	            label,
	            group,
	            dependencies = {
	          paper: self.graphics.paper,
	          chart: self.chart,
	          smartLabel: self.smartLabel,
	          chartContainer: self.graphics.container
	        },
	            obj = {
	          fill: '#fff',
	          borderThickness: 0
	        };

	        // initiating the toolbar
	        toolbar = new self.HorizontalToolbar(dependencies);
	        toolbar.setConfig(obj);

	        // making group for the extension label
	        group = new self.toolbox.ComponentGroup(dependencies);

	        // making buttonGroup for the buttons
	        buttonGroup = new self.toolbox.UniSelectComponentGroup(dependencies);

	        buttonGroup.defineStateIndicator(function (symbol) {
	          var bBox = symbol.getBBox(),
	              x1 = bBox.x,
	              x2 = x1 + bBox.width,
	              y2 = bBox.y + bBox.height;
	          return {
	            type: 'path',
	            attrs: {
	              d: ['M', x1 + 1, y2 - 1.2, 'L', x2, y2 - 1.2].join(' '),
	              'stroke-width': 2,
	              stroke: '#c95a5a'
	            }
	          };
	        });

	        // making buttonGroup for the buttons
	        buttonGroup.setConfig(obj);
	        group.setConfig(obj);

	        // extension label
	        label = {
	          'ZOOM': {
	            text: 'Zoom:',
	            group: group
	          }
	        };
	        self.createD3Labels(label);

	        // 'ALL' button created
	        allButton = {
	          fn: function fn() {}
	        };

	        self.btns = {};
	        // adding dummyButton
	        for (var i = 0; i < 10; i++) {
	          self.createD3Buttons([{
	            text: 'ALL',
	            config: {
	              toolText: 'ALL',
	              margin: {
	                right: 2,
	                left: 2
	              }
	            },
	            group: group,
	            eventListeners: {
	              'click': allButton.fn
	            }
	          }]);
	        }

	        // adding group and button group to toolbar
	        toolbar.addComponent(group);
	        self.toolbar = toolbar;
	        return toolbar;
	      }
	    }, {
	      key: 'addCssRules',
	      value: function addCssRules(classNames, styles) {
	        var key,
	            className,
	            paper = this.graphics.paper;
	        for (key in classNames) {
	          className = classNames[key];
	          switch (key) {
	            case 'container':
	              styles.container && paper.cssAddRule('.' + className, styles.container.style);
	              break;
	            case 'text':
	              styles.text && paper.cssAddRule('.' + className, styles.text.style);
	          }
	        }
	      }
	    }, {
	      key: 'getLogicalSpace',
	      value: function getLogicalSpace(availableWidth, availableHeight) {
	        var logicalSpace = this.toolbars[0].getLogicalSpace(availableWidth, availableHeight);
	        this.toolbars[0].width = logicalSpace.width;
	        this.toolbars[0].height = logicalSpace.height;
	        console.log({
	          width: logicalSpace.width,
	          height: logicalSpace.height + this.config.padding
	        });
	        return {
	          width: logicalSpace.width,
	          height: logicalSpace.height + this.config.padding
	        };
	      }
	    }, {
	      key: 'placeInCanvas',
	      value: function placeInCanvas() {
	        var _self = this;
	        _self.spaceManagerInstance.add([{
	          name: function name() {
	            return 'ExpanderCollapser';
	          },
	          ref: function ref(obj) {
	            return obj['0'];
	          },
	          self: function self() {
	            return _self;
	          },
	          priority: function priority() {
	            return 2;
	          },
	          layout: function layout(obj) {
	            return obj[_self.config.layout];
	          },
	          orientation: [{
	            type: function type(obj) {
	              return obj[_self.config.orientation];
	            },
	            position: [{
	              type: function type(obj) {
	                return obj[_self.config.position];
	              },
	              alignment: [{
	                type: function type(obj) {
	                  return obj[_self.config.alignment];
	                },
	                dimensions: [function () {
	                  var parent = this.getParentComponentGroup();
	                  return _self.getLogicalSpace(parent.getWidth(), parent.getHeight());
	                }]
	              }]
	            }]
	          }]
	        }]);
	      }
	    }, {
	      key: 'setDrawingConfiguration',
	      value: function setDrawingConfiguration(x, y, width, height, group) {
	        console.log(x, y, width, height);
	        var mes = this.measurement;
	        mes.x = x;
	        mes.y = y;
	        mes.width = width;
	        mes.height = height;

	        this.parentGroup = group;

	        return this;
	      }
	    }, {
	      key: 'draw',
	      value: function draw(x, y, width, height, group) {
	        var self = this,
	            measurement = self.measurement,
	            toolbars = self.toolbars,
	            ln = void 0,
	            i = void 0,
	            toolbar = void 0,
	            model = self.globalReactiveModel;

	        x = x === undefined ? measurement.x : x;
	        y = y === undefined ? measurement.y : y;
	        width = width === undefined ? measurement.width : width;
	        height = height === undefined ? measurement.height : height;
	        group = group === undefined ? self.parentGroup : group;
	        if (width && height) {
	          for (i = 0, ln = toolbars.length; i < ln; i++) {
	            toolbar = toolbars[i];
	            toolbar.draw(x, y, group);
	          }
	        }
	      }
	    }]);

	    return DateRange;
	  }();

	  return DateRange;
	};

/***/ }
/******/ ]);