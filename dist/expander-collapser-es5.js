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
	var SidePanel = __webpack_require__(3);
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
	    FC.registerComponent('extensions', 'expander-collapser2', DateRange({
	      FusionCharts: FC,
	      DateTimeFormatter: DateTimeFormatter
	    }));

	    FC.registerComponent('extensions', 'SidePanel', SidePanel({
	      FusionCharts: FC,
	      DateTimeFormatter: DateTimeFormatter
	    }));
	    // FC.registerComponent('extensions', 'expander-collapser3', DateRange({
	    //   FusionCharts: FC,
	    //   DateTimeFormatter: DateTimeFormatter
	    // }));
	    // FC.registerComponent('extensions', 'expander-collapser4', DateRange({
	    //   FusionCharts: FC,
	    //   DateTimeFormatter: DateTimeFormatter
	    // }));
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
	   * Class representing the DateRange
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
	      key: 'createD3Button',
	      value: function createD3Button(buttonConf) {
	        var key,
	            text,
	            config,
	            states,
	            state,
	            btn,
	            button,
	            styles = this.extData.button,
	            paper = this.graphics.paper,
	            d3 = paper.getInstances().d3,
	            self = this;

	        text = buttonConf.text;
	        config = buttonConf.config;

	        button = d3.button(text).setConfig(config);
	        button.namespace('fusioncharts');
	        button.appendSelector('standarperiodselector');
	        self.addCssRules(button.getIndividualClassNames(button.getClassName()), styles);
	        states = styles.states;
	        for (state in states) {
	          self.addCssRules(button.getIndividualClassNames(button.config.states[state]), styles.states[state]);
	        }

	        buttonConf.eventListeners && button.attachEventHandlers({
	          click: buttonConf.eventListeners.click.bind(button)
	        });
	        return button;
	      }
	    }, {
	      key: 'createD3Label',
	      value: function createD3Label(label) {
	        var key,
	            text,
	            config,
	            instance,
	            styles = this.extData.label,
	            self = this,
	            button,
	            dependencies = {
	          paper: self.graphics.paper,
	          chart: self.chart,
	          smartLabel: self.smartLabel,
	          chartContainer: self.graphics.container
	        };

	        text = label.text;
	        config = label.config;
	        instance = new self.toolbox.Label(text, dependencies, config);
	        // self[key].namespace('fusioncharts');
	        // self[key].appendSelector('daterange');
	        self.addCssRules(instance.getIndividualClassNames(instance.getClassName()), styles);
	        return instance;
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
	            className: 'standard-period-selector-label',
	            text: {
	              style: {
	                'font-weight': 'bold',
	                'font-family': '"Lucida Grande", sans-serif',
	                'font-size': '13px',
	                'fill': '#4b4b4b'
	              }
	            },
	            container: {
	              height: 22
	            }
	          }
	        };

	        instance.config = instance.extData;
	        Object.assign(instance.extData, instance.extDataUser);
	        instance.measurement = {};
	        instance.toolbar = instance.createToolbar();
	        return instance;
	      }
	    }, {
	      key: 'createToolbar',


	      // creates toolbar
	      value: function createToolbar() {
	        if (!window.count) {
	          window.count = 0;
	        }
	        window.count += 1;

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
	        },
	            button;

	        // initiating the toolbar
	        toolbar = new self.HorizontalToolbar(dependencies);
	        toolbar.setConfig(obj);

	        // making group for the extension label
	        group = this.group = new self.toolbox.ComponentGroup(dependencies);

	        group.setConfig(obj);

	        // extension label
	        label = {
	          height: 22,
	          text: 'Zoom:',
	          group: group,
	          config: {
	            height: 22
	          }
	        };

	        self.componentArr = [];

	        self.componentArr.push({
	          instance: self.createD3Label(label),
	          priority: 1
	        });
	        var obj = {},
	            name = self.getModuleName();

	        for (var i = 0; i < 6; i++) {
	          button = {};
	          button.instance = self.createD3Button({
	            text: 'BUTTON' + i,
	            config: {
	              margin: {
	                right: 5,
	                left: 5
	              }
	            },
	            group: group
	          });
	          button.id = 'id';
	          button.priority = 2;
	          this.componentArr.push(button);
	        };

	        this.expandButton = {
	          instance: self.createD3Button({
	            text: '>>',
	            config: {
	              margin: {
	                right: 2,
	                left: 2
	              }
	            },
	            group: group,
	            eventListeners: {
	              click: function click() {
	                var fullview = self.fullview,
	                    previousWidth = self.previousWidth,
	                    maxSpace = self.maxSpace,
	                    diff = maxSpace.width - previousWidth;
	                console.log('diff', diff);
	                self.spaceManagerInstance.cacheByName(name).adjustWidth(diff);
	              }
	            }
	          })
	        };

	        this.expandButton.logicalSpace = button.instance.getLogicalSpace();
	        this.expandButton.priority = 0;

	        // self.createD3Buttons({
	        //   'expander': {
	        //     text: '>>',
	        //     config: {
	        //       margin: {
	        //         right: 2,
	        //         left: 2
	        //       }
	        //     },
	        //     group: group,
	        //     eventListeners: {
	        //       click: function () {
	        //         self.expand = !self.expand;
	        //         for (var key in self.btns) {
	        //           obj = self.btns[key];
	        //           /button/.test(key) && (self.expand ? obj.btn.hide() : obj.btn.show());
	        //         }
	        //         self.toolbar.redraw();
	        //       }
	        //     }
	        //   }
	        // });

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
	      key: 'addSymbols',
	      value: function addSymbols(symbolArr) {
	        var i,
	            len,
	            group = this.group;

	        for (i = 0, len = symbolArr.length; i < len; i++) {
	          group.addSymbol(symbolArr[i].instance);
	        }
	      }
	    }, {
	      key: 'getLogicalSpace',
	      value: function getLogicalSpace(availableWidth, availableHeight) {
	        var buttons = this.buttons,
	            minArr = [this.expandButton],
	            minSpace,
	            maxSpace;

	        this.group.emptyList();
	        this.addSymbols(minArr);
	        minSpace = this.toolbar.getLogicalSpace(availableWidth, availableHeight);
	        console.log('minWidth', minSpace.width);
	        this.group.emptyList();

	        this.addSymbols(this.componentArr);

	        this.maxSpace = maxSpace = this.toolbar.getLogicalSpace(availableWidth, availableHeight);

	        return {
	          width: {
	            max: maxSpace.width,
	            min: minSpace.width
	          },
	          height: maxSpace.height
	        };
	      }
	    }, {
	      key: 'getModuleName',
	      value: function getModuleName() {
	        return 'ExpanderCollapser' + window.count;
	      }
	    }, {
	      key: 'placeInCanvas',
	      value: function placeInCanvas() {
	        var _self = this;
	        _self.spaceManagerInstance.add([{
	          name: function name() {
	            return _self.getModuleName();
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
	        var mes = this.measurement;
	        mes.x = x;
	        mes.y = y;
	        mes.width = width;
	        mes.height = height;

	        this.parentGroup = group;

	        return this;
	      }
	    }, {
	      key: 'getDrawableComponentList',
	      value: function getDrawableComponentList(width, height) {
	        var componentArr = this.componentArr,
	            totalWidth = 0,
	            len,
	            component,
	            arr = [],
	            i,
	            logicalSpace,
	            group = this.group,
	            toolbar = this.toolbar,
	            padding = group.config.padding,
	            margin = group.config.margin,
	            tPad = toolbar.config.padding,
	            btn,
	            hSpace = tPad.left + tPad.right + padding.left + padding.right + margin.left + margin.right;

	        width -= hSpace;

	        for (i = 0, len = componentArr.length; i < len; i++) {
	          component = componentArr[i];
	          logicalSpace = component.instance.getLogicalSpace();
	          this.previousWidth = totalWidth;
	          totalWidth += logicalSpace.width;
	          if (totalWidth > width) {
	            totalWidth -= logicalSpace.width;
	            break;
	          }
	          arr.push(component.instance);
	        }

	        logicalSpace = this.expandButton.instance.getLogicalSpace();

	        if (arr.length !== len) {
	          totalWidth += logicalSpace.width;
	          if (totalWidth > width) {
	            btn = arr.pop();
	            totalWidth -= btn.getLogicalSpace().width;
	          }
	          arr.push(this.expandButton.instance);
	        }

	        this.previousWidth = totalWidth + hSpace;
	        return arr;
	      }
	    }, {
	      key: 'draw',
	      value: function draw(x, y, width, height, group) {
	        var self = this,
	            measurement = self.measurement,
	            toolbar = self.toolbar,
	            list = void 0;

	        x = x === undefined ? measurement.x : x;
	        y = y === undefined ? measurement.y : y;
	        width = width === undefined ? measurement.width : width;
	        height = height === undefined ? measurement.height : height;
	        group = group === undefined ? self.parentGroup : group;
	        if (width && height) {
	          this.group.emptyList();
	          list = this.getDrawableComponentList(width, height);
	          this.group.addSymbol(list);
	          toolbar.getLogicalSpace(width, height);
	          toolbar.draw(x, y, group);
	        }
	      }
	    }]);

	    return DateRange;
	  }();

	  return DateRange;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function (dep) {
	  /**
	   * Class representing the DateRange
	   */
	  var KPIIndicator = function () {
	    function KPIIndicator() {
	      _classCallCheck(this, KPIIndicator);

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

	    _createClass(KPIIndicator, [{
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
	      key: 'createD3Button',
	      value: function createD3Button(buttonConf) {
	        var key,
	            text,
	            config,
	            states,
	            state,
	            btn,
	            button,
	            styles = this.extData.button,
	            paper = this.graphics.paper,
	            d3 = paper.getInstances().d3,
	            self = this;

	        text = buttonConf.text;
	        config = buttonConf.config;

	        button = d3.button(text).setConfig(config);
	        button.namespace('fusioncharts');
	        button.appendSelector('standarperiodselector');
	        self.addCssRules(button.getIndividualClassNames(button.getClassName()), styles);
	        states = styles.states;
	        for (state in states) {
	          self.addCssRules(button.getIndividualClassNames(button.config.states[state]), styles.states[state]);
	        }

	        buttonConf.eventListeners && button.attachEventHandlers({
	          click: buttonConf.eventListeners.click.bind(button)
	        });
	        return button;
	      }
	    }, {
	      key: 'createD3Label',
	      value: function createD3Label(label) {
	        var key,
	            text,
	            config,
	            instance,
	            styles = this.extData.label,
	            self = this,
	            button,
	            dependencies = {
	          paper: self.graphics.paper,
	          chart: self.chart,
	          smartLabel: self.smartLabel,
	          chartContainer: self.graphics.container
	        };

	        text = label.text;
	        config = label.config;
	        instance = new self.toolbox.Label(text, dependencies, config);
	        // self[key].namespace('fusioncharts');
	        // self[key].appendSelector('daterange');
	        self.addCssRules(instance.getIndividualClassNames(instance.getClassName()), styles);
	        return instance;
	      }
	    }, {
	      key: 'init',


	      /**
	       * Fusioncharts life cycle method for extension
	       */
	      value: function init(require) {
	        var instance = this;
	        require(['graphics', 'chart', 'canvasConfig', 'MarkerManager', 'reactiveModel', 'globalReactiveModel', 'spaceManagerInstance', 'smartLabel', 'extData', 'chartInstance', 'dataset', function (graphics, chart, canvasConfig, markerManager, reactiveModel, globalReactiveModel, spaceManagerInstance, smartLabel, extData, chartInstance, dataset) {
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
	          'alignment': 'right',
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
	            className: 'standard-period-selector-label',
	            text: {
	              style: {
	                'font-weight': 'bold',
	                'font-family': '"Lucida Grande", sans-serif',
	                'font-size': '13px',
	                'fill': '#4b4b4b'
	              }
	            },
	            container: {
	              height: 22
	            }
	          }
	        };

	        instance.config = instance.extData;
	        Object.assign(instance.extData, instance.extDataUser);
	        instance.measurement = {};
	        instance.toolbar = instance.createToolbar();
	        return instance;
	      }
	    }, {
	      key: 'createToolbar',


	      // creates toolbar
	      value: function createToolbar() {
	        if (!window.count) {
	          window.count = 0;
	        }
	        window.count += 1;

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
	        },
	            button;

	        // initiating the toolbar
	        toolbar = new self.HorizontalToolbar(dependencies);
	        toolbar.setConfig(obj);

	        // making group for the extension label
	        group = this.group = new self.toolbox.ComponentGroup(dependencies);

	        group.setConfig(obj);

	        // extension label
	        label = {
	          height: 22,
	          text: 'Zoom:',
	          group: group,
	          config: {
	            height: 22
	          }
	        };

	        self.componentArr = [];

	        var obj = {},
	            name = self.getModuleName();

	        this.componentArr.push({
	          instance: self.createD3Button({
	            text: 'Set Min',
	            config: {
	              margin: {
	                right: 5,
	                left: 5
	              }
	            },
	            group: group,
	            eventListeners: {
	              click: function click() {
	                self.showPopup();
	              }
	            }
	          }),
	          id: 'id',
	          priority: 2
	        }, {
	          instance: self.createD3Button({
	            text: 'Show KPI',
	            config: {
	              margin: {
	                right: 5,
	                left: 5
	              }
	            },
	            group: group,
	            eventListeners: {
	              click: function click() {
	                self.showKPI = !self.showKPI;
	                tsInstance.resizeTo();
	              }
	            }
	          }),
	          id: 'id',
	          priority: 2
	        });

	        d3.select('html').on('click', function () {
	          self.hidePopup();
	        });
	        // self.createD3Buttons({
	        //   'expander': {
	        //     text: '>>',
	        //     config: {
	        //       margin: {
	        //         right: 2,
	        //         left: 2
	        //       }
	        //     },
	        //     group: group,
	        //     eventListeners: {
	        //       click: function () {
	        //         self.expand = !self.expand;
	        //         for (var key in self.btns) {
	        //           obj = self.btns[key];
	        //           /button/.test(key) && (self.expand ? obj.btn.hide() : obj.btn.show());
	        //         }
	        //         self.toolbar.redraw();
	        //       }
	        //     }
	        //   }
	        // });

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
	      key: 'addSymbols',
	      value: function addSymbols(symbolArr) {
	        var i,
	            len,
	            group = this.group;

	        for (i = 0, len = symbolArr.length; i < len; i++) {
	          group.addSymbol(symbolArr[i].instance);
	        }
	      }
	    }, {
	      key: 'showPopup',
	      value: function showPopup() {
	        var paper = this.graphics.paper,
	            d3 = paper.getInstances().d3,
	            self = this,
	            container = this.graphics.container,
	            width = container.offsetWidth - (this.showKPI ? 100 : 0),
	            height = container.offsetHeight,
	            selection,
	            input,
	            text;

	        selection = this.selection;
	        if (!selection) {
	          selection = this.selection = d3.select(container).append('div');
	        }
	        selection.style('display', 'block');
	        selection.style('position', 'absolute').style('left', '0px').style('top', '0px').style('width', width + 'px').style('height', height + 'px').style('background', 'rgba(76, 175, 80, 0.3)');
	        input = selection.selectAll('input').data([{
	          text: 'Set Min'
	        }]);
	        text = selection.selectAll('span').data([{
	          text: 'Set Min'
	        }]);
	        d3.event.stopPropagation();
	        input.enter().append('input').merge(input).style('position', 'absolute').style('top', height / 2 + 'px').style('left', width / 2 + 'px').on('keypress', function () {
	          var reactiveModel = self.globalReactiveModel,
	              inst = self.chartInstance,
	              store = inst.apiInstance.getComponentStore(),
	              canvas = store.getCanvasByIndex(0),
	              comp = canvas.getComposition(),
	              plotManager = comp.plotManager,
	              value,
	              inputValue = Number(this.value),
	              params = {};

	          if (d3.event.keyCode === 13) {
	            comp.PlotManager.getInstancesByPlotType('column')[0].graphics.group.selectAll('rect').each(function (d) {
	              if (d.y) {
	                value = comp.yAxis.getValue(d.y);
	                if (value > inputValue) {
	                  d3.select(this).style('fill', '#ff0000');
	                } else {
	                  d3.select(this).style('fill', null);
	                }
	              }
	            });

	            self.hidePopup();
	          }
	        }).on('click', function () {
	          d3.event.stopPropagation();
	        }).node().focus();

	        text.enter().append('span').merge(text).html('Set Min').style('position', 'absolute').style('top', height / 2 + 'px').style('left', width / 2 - 60 + 'px').style('color', '#000000').style('opacity', 1).style('font-family', 'sans-serif');
	        d3.event.stopPropagation();
	      }
	    }, {
	      key: 'hidePopup',
	      value: function hidePopup() {
	        this.selection && this.selection.style('display', 'none');
	      }
	    }, {
	      key: 'getParams',
	      value: function getParams(withinVisibleRange) {
	        var self = this,
	            reactiveModel = self.globalReactiveModel,
	            inst = self.chartInstance,
	            store = inst.apiInstance.getComponentStore(),
	            canvas = store.getCanvasByIndex(0),
	            comp = canvas.getComposition(),
	            ds = comp.dataset,
	            params = {};

	        ds.forEachSeries(function (xAxisModel, yAxisModel, vp) {
	          var i,
	              y,
	              max = -Infinity,
	              min = +Infinity,
	              sum = 0,
	              arr = [],
	              avg,
	              sd,
	              start = withinVisibleRange ? vp.start : 0,
	              end = withinVisibleRange ? vp.end : yAxisModel.length;

	          for (i = start; i < end; i++) {
	            y = yAxisModel[i];
	            if (y !== undefined) {
	              max = Math.max(max, y);
	              min = Math.min(min, y);
	              sum += y;
	            }
	          }
	          avg = sum / (end - start);

	          params.sum = sum;
	          for (i = vp.start; i < vp.end; i++) {
	            y = yAxisModel[i];
	            if (y !== undefined) {
	              arr.push(Math.pow(y - avg, 2));
	            }
	          }
	          sum = 0;
	          for (i = 0; i < arr.length; i++) {
	            y = arr[i];
	            sum += y;
	          }

	          sd = sum / arr.length;

	          params.sd = sd.toFixed(2);
	          params.max = max;
	          params.min = min;
	          params.mean = avg.toFixed(2);
	        });

	        return params;
	      }
	    }, {
	      key: 'getLogicalSpace',
	      value: function getLogicalSpace(availableWidth, availableHeight) {
	        var buttons = this.buttons,
	            minArr = this.componentArr,
	            minSpace,
	            maxSpace;

	        this.group.emptyList();
	        this.addSymbols(minArr);
	        minSpace = this.toolbar.getLogicalSpace(availableWidth, availableHeight);
	        console.log('minWidth', minSpace.width);
	        this.group.emptyList();

	        this.addSymbols(this.componentArr);

	        this.maxSpace = maxSpace = this.toolbar.getLogicalSpace(availableWidth, availableHeight);

	        return {
	          width: {
	            max: maxSpace.width,
	            min: minSpace.width
	          },
	          height: maxSpace.height
	        };
	      }
	    }, {
	      key: 'getSidePanelSpace',
	      value: function getSidePanelSpace(availableWidth, availableHeight) {
	        return {
	          width: this.showKPI ? 100 : 0,
	          height: this.showKPI ? 1 : 0
	        };
	      }
	    }, {
	      key: 'getModuleName',
	      value: function getModuleName() {
	        return 'ExpanderCollapser' + window.count;
	      }
	    }, {
	      key: 'placeInCanvas',
	      value: function placeInCanvas() {
	        var _self = this;
	        _self.spaceManagerInstance.add([{
	          name: function name() {
	            return _self.getModuleName();
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

	        _self.spaceManagerInstance.add([{
	          name: function name() {
	            return 'sidepanel';
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
	            return obj.block;
	          },
	          orientation: [{
	            type: function type(obj) {
	              return obj.vertical;
	            },
	            position: [{
	              type: function type(obj) {
	                return obj.right;
	              },
	              alignment: [{
	                type: function type(obj) {
	                  return obj.middle;
	                },
	                dimensions: [function () {
	                  var parent = this.getParentComponentGroup();
	                  return _self.getSidePanelSpace(parent.getWidth(), parent.getHeight());
	                }]
	              }]
	            }]
	          }]
	        }]);
	      }
	    }, {
	      key: 'setDrawingConfiguration',
	      value: function setDrawingConfiguration(x, y, width, height, group) {
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
	            toolbar = self.toolbar,
	            list = void 0;

	        x = x === undefined ? measurement.x : x;
	        y = y === undefined ? measurement.y : y;
	        width = width === undefined ? measurement.width : width;
	        height = height === undefined ? measurement.height : height;
	        group = group === undefined ? self.parentGroup : group;
	        if (width && height) {
	          toolbar.draw(x, y, group);
	          this.showKPI ? this.drawPanel(x + width, y) : this.hidePanel();
	        }
	      }
	    }, {
	      key: 'drawPanel',
	      value: function drawPanel(x, y) {
	        var visParams = this.getParams(true),
	            absParams = this.getParams(),
	            childStyle = {
	          left: '10px',
	          'font-weight': 'normal',
	          padding: '2px'
	        },
	            headStyleObj = {
	          padding: '10px',
	          'font-weight': 'bold'
	        };
	        var data = [{
	          head: {
	            text: ['Visible Data'],
	            style: headStyleObj
	          },
	          style: {
	            margin: '5px'
	          },
	          children: [{
	            text: ['Maximum', visParams.max],
	            style: childStyle
	          }, {
	            text: ['Minimum', visParams.min],
	            style: childStyle
	          }, {
	            text: ['Standard Deviation', visParams.sd],
	            style: childStyle
	          }, {
	            text: ['Average', visParams.mean],
	            style: childStyle
	          }]
	        }, {
	          head: {
	            text: ['Full Data'],
	            style: headStyleObj
	          },
	          style: {
	            margin: '5px'
	          },
	          children: [{
	            text: ['Maximum', absParams.max],
	            style: childStyle
	          }, {
	            text: ['Minimum', absParams.min],
	            style: childStyle
	          }, {
	            text: ['Standard Deviation', absParams.sd],
	            style: childStyle
	          }, {
	            text: ['Average', absParams.mean],
	            style: childStyle
	          }]
	        }];

	        var parent,
	            selection = d3.select(this.graphics.container).selectAll('.test').data([1]);

	        selection = selection.enter().append('div').merge(selection).attr('class', 'test').style("left", x + "px").style('position', 'absolute').style('display', 'block').style("top", y + "px");

	        function createDIV(text, selection, cls, styleObj) {
	          var str = text.join(':'),
	              child = selection.selectAll('.' + cls).data([1]);

	          child = child.enter().append('div').merge(child).attr('class', cls).html(str).style('position', 'relative');

	          for (var obj in styleObj) {
	            child.style(obj, styleObj[obj]);
	          }

	          return child;
	        }

	        for (var i = 0, len = data.length; i < len; i += 1) {
	          createDIV([], selection, data[i].head.text[0] + '_container', data[i].style);
	          parent = createDIV(data[i].head.text, selection, data[i].head.text[0], data[i].head.style);
	          if (data[i].children) {
	            for (var j = 0, len1 = data[i].children.length; j < len1; j += 1) {
	              createDIV(data[i].children[j].text, parent, data[i].text + '_' + data[i].children[j].text[0], data[i].children[j].style);
	            }
	          }
	        }
	      }
	    }, {
	      key: 'hidePanel',
	      value: function hidePanel() {
	        d3.select(this.graphics.container).select('.test').remove();
	      }
	    }]);

	    return KPIIndicator;
	  }();

	  return KPIIndicator;
	};

/***/ }
/******/ ]);