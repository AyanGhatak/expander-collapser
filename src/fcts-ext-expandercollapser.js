'use strict';
module.exports = function (dep) {
  /**
   * Class representing the DateRange.
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

    createD3Buttons (store) {
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
        if (!self.btns[key]) { self.btns[key] = {}; }
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
    };

    createD3Labels (store) {
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
        fn: function () {

        }
      };


      self.btns = {};
      // adding dummyButton
      for (let i = 0; i < 10; i++) {
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

    getLogicalSpace (availableWidth, availableHeight) {
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
      console.log(x, y, width, height)
      var mes = this.measurement;
      mes.x = x;
      mes.y = y;
      mes.width = width;
      mes.height = height;

      this.parentGroup = group;

      return this;
    };

    draw (x, y, width, height, group) {
      let self = this,
        measurement = self.measurement,
        toolbars = self.toolbars,
        ln,
        i,
        toolbar,
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
    };
  }
  return DateRange;
};
