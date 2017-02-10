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

	'use strict';
	const DateRange = __webpack_require__(1);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (dep) {
	  /**
	   * Class representing the DateRange
	   */
	  class DateRange {
	    constructor() {
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

	    createObjectAssign () {
	      if (typeof Object.assign !== 'function') {
	        Object.assign = function (target, varArgs) {
	          'use strict';
	          if (target == null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	          }

	          var to = Object(target);

	          for (let index = 1; index < arguments.length; index++) {
	            let nextSource = arguments[index];

	            if (nextSource != null) {
	              for (let nextKey in nextSource) {
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

	    createD3Button (buttonConf) {
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
	    };

	    createD3Label (label) {
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
	    };

	    /**
	     * Fusioncharts life cycle method for extension
	     */
	    init (require) {
	      var instance = this;
	      require([
	        'graphics',
	        'chart',
	        'canvasConfig',
	        'MarkerManager',
	        'reactiveModel',
	        'globalReactiveModel',
	        'spaceManagerInstance',
	        'smartLabel',
	        'extData',
	        'chartInstance',
	        function (
	              graphics,
	              chart,
	              canvasConfig,
	              markerManager,
	              reactiveModel,
	              globalReactiveModel,
	              spaceManagerInstance,
	              smartLabel,
	              extData,
	              chartInstance) {
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
	        }
	      ]);
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
	    };

	    // creates toolbar
	    createToolbar () {
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

	      for (let i = 0; i < 10; i++) {
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
	            click: function () {
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
	    };

	    addCssRules (classNames, styles) {
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
	    };

	    addSymbols (symbolArr) {
	      var i, len,
	        group = this.group;

	      for (i = 0, len = symbolArr.length; i < len; i++) {
	        group.addSymbol(symbolArr[i].instance);
	      }
	    };

	    getLogicalSpace (availableWidth, availableHeight) {
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
	      self.maxSpace =  maxSpace;
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
	    };

	    placeInCanvas () {
	      var self = this;
	      self.spaceManagerInstance.add([{
	        name: function () {
	          return 'ExpanderCollapser';
	        },
	        ref: function (obj) {
	          return obj['0'];
	        },
	        self: function () {
	          return self;
	        },
	        priority: function () {
	          return 2;
	        },
	        layout: function (obj) {
	          return obj[self.config.layout];
	        },
	        orientation: [{
	          type: function (obj) {
	            return obj[self.config.orientation];
	          },
	          position: [{
	            type: function (obj) {
	              return obj[self.config.position];
	            },
	            alignment: [{
	              type: function (obj) {
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
	    };

	    setDrawingConfiguration (x, y, width, height, group) {
	      var mes = this.measurement;
	      mes.x = x;
	      mes.y = y;
	      mes.width = width;
	      mes.height = height;

	      this.parentGroup = group;

	      return this;
	    };

	    getDrawableComponentList (width, height) {
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
	      }
	      else {
	        self.fullview = true;
	      }

	      self.previousWidth = totalWidth;
	      return arr;
	    }

	    draw (x, y, width, height, group) {
	      let self = this,
	        measurement = self.measurement,
	        toolbar = self.toolbar,
	        list;

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
	    };
	  }
	  return DateRange;
	};


/***/ }
/******/ ]);