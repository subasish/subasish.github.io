## Data Vizualization for Public Accounts of Canada 2009-2012

Try this app [here](http://tedstrauss.github.io/expenditures/).

This page provides a tool for exploring the expenditures of the federal government during 
three fiscal year periods, 2009/10, 2010/11, 2011/12. The data is provided by the Treasury 
Board of Canada at [this page](http://www.tbs-sct.gc.ca/ems-sgd/aegc-adgc-eng.asp). The data here corresponds to the spreadsheet titled 'Authorities 
and Expenditures by vote'. Data license information [here](http://www.data.gc.ca/default.asp?lang=En&n=46D15882-1). 
A news report about the data release can be found [here](http://globalnews.ca/news/502224/new-database-will-allow-canadians-to-track-government-spending-data/).

### Features

The data browser displays distribution of data over the principle data fields, and lets
the user filter content by interacting with the charts. A table displays raw values.

### Implementation

The app is a fork of the dc.js [example page](http://nickqizhu.github.io/dc.js/),
and makes use of the following libraries.

 - [d3.js](http://d3js.org/)
 - [dc.js](http://nickqizhu.github.io/dc.js/)
 - [crossfilter.js](http://square.github.io/crossfilter/)
 - [gridster.js](http://gridster.net/)
 
### Feedback and bugs

Please post questions and bug reports to the [issue queue](https://github.com/tedstrauss/expenditures/issues).
