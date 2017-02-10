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
	        var obj = {};

	        for (var i = 0; i < 10; i++) {
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

	                self.adjustWidth(diff);
	                // self.expand = !self.expand;
	                // if (self.expand) {
	                //   self.group.addSymbol(self.getDrawableComponentList(800, 300));
	                // }
	                // else {
	                //   self.group.addSymbol(self.getDrawableComponentList(400, 300));
	                // }
	                // self.sp.adjustWidth(50);
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

	        this.addSymbols(minArr);
	        minSpace = this.toolbar.getLogicalSpace(availableWidth, availableHeight);

	        console.log(minSpace);
	        this.group.emptyList();

	        this.addSymbols(this.componentArr);

	        maxSpace = this.toolbar.getLogicalSpace(availableWidth, availableHeight);
	        self.maxSpace = maxSpace;
	        this.group.emptyList();

	        console.log(maxSpace);

	        return {
	          width: {
	            max: maxSpace.width,
	            min: minSpace.width
	          },
	          height: {
	            max: maxSpace.height,
	            min: minSpace.height
	          }
	        };
	      }
	    }, {
	      key: 'placeInCanvas',
	      value: function placeInCanvas() {
	        var self = this;
	        self.spaceManagerInstance.add([{
	          name: function name() {
	            return 'ExpanderCollapser';
	          },
	          ref: function ref(obj) {
	            return obj['0'];
	          },
	          self: function (_self) {
	            function self() {
	              return _self.apply(this, arguments);
	            }

	            self.toString = function () {
	              return _self.toString();
	            };

	            return self;
	          }(function () {
	            return self;
	          }),
	          priority: function priority() {
	            return 2;
	          },
	          layout: function layout(obj) {
	            return obj[self.config.layout];
	          },
	          orientation: [{
	            type: function type(obj) {
	              return obj[self.config.orientation];
	            },
	            position: [{
	              type: function type(obj) {
	                return obj[self.config.position];
	              },
	              alignment: [{
	                type: function type(obj) {
	                  return obj[self.config.alignment];
	                },
	                dimensions: [function () {
	                  var parent = this.getParentComponentGroup();
	                  return self.getLogicalSpace(parent.getWidth(), parent.getHeight());
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
	            logicalSpace;

	        for (i = 0, len = componentArr.length; i < len; i++) {
	          component = componentArr[i];
	          logicalSpace = component.instance.getLogicalSpace();
	          totalWidth += logicalSpace.width;
	          if (totalWidth > width) {
	            break;
	          }
	          arr.push(component.instance);
	        }

	        if (arr.length !== len) {
	          arr.push(this.expandButton.instance);
	          self.fullview = false;
	        } else {
	          self.fullview = true;
	        }

	        self.previousWidth = totalWidth;
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

/***/ }
/******/ ]);