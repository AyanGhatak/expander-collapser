# Expander-collapser Extension
## A FusionTime Series Extension
This extension mainly draws buttons using [d3-form-components](https://github.com/ranajitbanerjee/d3-form-components)
<script src='https://www.fusioncharts.com/startup-bridge/assets/fusioncharts.js' charset='utf-8'></script>
<script src='https://www.fusioncharts.com/startup-bridge/assets/fusioncharts.timeseries.js' charset='utf-8'></script>
<script src='../dist/expander-collapser-es5.js' charset='utf-8'></script>
<div id='chart-container'></div>
<script src='../main.js'></script>
### Browser Inclusion
```html
<script src='fusioncharts.js' charset='utf-8'></script>
<script src='fusioncharts.timeseries.js' charset='utf-8'></script>
<script src='expander-collapser.js' charset='utf-8'></script>
```
### Node Inclusion
To run the extension one Node, one must also provide a custom DOM implementaion (such as [JSDOM](https://github.com/tmpvar/jsdom)).
```javascript
var FusionCharts = require('fusioncharts');
require('fusioncharts/fusioncharts.timeseries')(FusionCharts);
var ExpanderCollapser = require('./expander-collapser.js');
```
