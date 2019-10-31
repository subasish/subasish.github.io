'use strict';

/* capitalizes string */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function capitalize(string) {
  var splitStr = string.split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

/*----------------------------
Simple One Dropdown
------------------------------*/
/* generic component for a dropdown menu with only one possible value in the column */

var DropdownOne = function (_React$Component) {
  _inherits(DropdownOne, _React$Component);

  function DropdownOne() {
    _classCallCheck(this, DropdownOne);

    return _possibleConstructorReturn(this, (DropdownOne.__proto__ || Object.getPrototypeOf(DropdownOne)).apply(this, arguments));
  }

  _createClass(DropdownOne, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      /* NOTE: the column parameter passed in to the component selects the certain row from the total data*/
      var column = this.props.column;
      var totalOptions = [" "];
      var data = this.props.data;
      /* uses ES6, saves all options into array, then uses Set to find unique value then sort by alphabet */
      {
        data.map(function (object) {
          totalOptions.push(capitalize(object[column].trim()));
        });
      }
      var uniqueOpt = Array.from(new Set(totalOptions));
      /* sorts by alphabetical order */
      /* uniqueOpt.sort() */
      uniqueOpt.splice(uniqueOpt.length - 1, 1);
      /* console.log(uniqueOpt) */
      /* updates state with selected option and column name*/
      return React.createElement(
        'div',
        { 'class': 'rct-comp-div' },
        React.createElement(
          'h5',
          null,
          this.props.title,
          ' ',
          React.createElement(
            'sup',
            { 'class': 'required noprint' },
            '*'
          )
        ),
        React.createElement(
          'select',
          { 'class': 'form-control rct-dropdown', onChange: function onChange(e) {
              return _this2.props.onChangeElem(e.target.value, column);
            } },
          uniqueOpt.map(function (dat, i) {
            return React.createElement(
              'option',
              null,
              dat
            );
          })
        )
      );
    }
  }]);

  return DropdownOne;
}(React.Component);

/*--------------------
Multi Dropdown
--------------------*/
/* generic component for a dropdown menu with columns that contain arrays */
/* use this with columns like location1/location2/location3/location4 */


var DropdownMult = function (_React$Component2) {
  _inherits(DropdownMult, _React$Component2);

  function DropdownMult() {
    _classCallCheck(this, DropdownMult);

    return _possibleConstructorReturn(this, (DropdownMult.__proto__ || Object.getPrototypeOf(DropdownMult)).apply(this, arguments));
  }

  _createClass(DropdownMult, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      var column = this.props.column;
      var totalOptions = [" "];
      var data = this.props.data;
      /* uses ES6, saves all array of options into single layer array, then uses Set to find unique value then sort by alphabet */
      {
        data.map(function (object) {
          var myarr = object[column].split("/");
          {
            myarr.map(function (element) {
              totalOptions.push(capitalize(element.trim()));
            });
          }
        });
      }
      var uniqueOpt = Array.from(new Set(totalOptions));
      uniqueOpt.sort();
      uniqueOpt.splice(0, 1);
      /* console.log(uniqueOpt) */
      return React.createElement(
        'div',
        { 'class': 'rct-comp-div' },
        React.createElement(
          'h5',
          null,
          this.props.title,
          ' ',
          React.createElement(
            'sup',
            { 'class': 'required noprint' },
            '*'
          )
        ),
        React.createElement(
          'select',
          { 'class': 'form-control rct-dropdown', onChange: function onChange(e) {
              return _this4.props.onChangeElem(e.target.value, column);
            } },
          uniqueOpt.map(function (dat, i) {
            return React.createElement(
              'option',
              null,
              dat
            );
          })
        )
      );
    }
  }]);

  return DropdownMult;
}(React.Component);

/* filters the control methods, adding to a filtered array and calls the card component */


var MethodList = function (_React$Component3) {
  _inherits(MethodList, _React$Component3);

  function MethodList() {
    _classCallCheck(this, MethodList);

    return _possibleConstructorReturn(this, (MethodList.__proto__ || Object.getPrototypeOf(MethodList)).apply(this, arguments));
  }

  _createClass(MethodList, [{
    key: 'render',
    value: function render() {
      /* NOTE: instantiate these variables to each field in the selected object*/
      var selLoc = this.props.selected.location.toLowerCase();
      var selFacility = this.props.selected.facility.toLowerCase();
      var selConstruction = this.props.selected.construction.toLowerCase();
      var data = this.props.data;
      var filter = [];
      /* makeshift iterator to save the results that match the search to the filter array */
      var iter = 0;
      {
        data.map(function (opt) {
          /* if (sellcost == opt.lcost.trim()) { */
          /* since state is an array of states */
          {
            opt.location.split("/").map(function (indivState) {
              if (selLoc == indivState.trim()) {
                {
                  opt.facility.split("/").map(function (indivFac) {
                    if (selFacility == indivFac.trim()) {
                      {
                        opt.construction.split("/").map(function (indivCons) {
                          if (selConstruction == indivCons.trim()) {
                            filter.push(data[iter]);
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          }
          /*}*/
          iter++;
        });
      }
      /* {((selState != "--choose an option--" && selDuration != "--choose an option--") && filter.length == 0 ? <h5 class="listcontainer">No results found. </h5> : <h5></h5>} */
      console.log(filter);
      /* remember to RETURN when using map() to render elements! */
      /* add summary of all choices as a tabale here */
      return React.createElement(
        'div',
        null,
        filter.length == 0 && (selLoc && selFacility && selConstruction) != " " ? React.createElement(
          'h2',
          { 'class': 'listcontainer' },
          'No information available.'
        ) : React.createElement('h5', null),
        filter.length > 0 ? React.createElement(
          'h2',
          { 'class': 'listcontainer' },
          'Results'
        ) : React.createElement('h5', null),
        filter.map(function (obj) {
          return React.createElement(MethodCard, { result: obj });
        })
      );
    }
  }]);

  return MethodList;
}(React.Component);

/* card component of the list */


var MethodCard = function (_React$Component4) {
  _inherits(MethodCard, _React$Component4);

  function MethodCard() {
    _classCallCheck(this, MethodCard);

    return _possibleConstructorReturn(this, (MethodCard.__proto__ || Object.getPrototypeOf(MethodCard)).apply(this, arguments));
  }

  _createClass(MethodCard, [{
    key: 'render',
    value: function render() {
      var images = this.props.result.image.split("/");
      if (this.props.result.method == "n/a") {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            { 'class': 'listcontainer' },
            'No information available.'
          )
        );
      }
      return React.createElement(
        'div',
        { 'class': 'rct-comp-div rct-method-card' },
        React.createElement(
          'div',
          { 'class': 'rct-card-img' },
          images.map(function (img) {
            return React.createElement('img', { src: "images/ref/" + img.trim() });
          })
        ),
        React.createElement(
          'div',
          { 'class': 'rct-card-txt' },
          React.createElement(
            'h3',
            null,
            this.props.result.method
          ),
          this.props.result.description.split('<br>').map(function (it, i) {
            return React.createElement(
              'p',
              { key: 'x' + i },
              it
            );
          }),
          React.createElement(
            'p',
            null,
            React.createElement(
              'a',
              { href: "docs/" + this.props.result.link },
              'Find out more'
            )
          )
        )
      );
    }
  }]);

  return MethodCard;
}(React.Component);

/* parent element */


var ControlMethods = function (_React$Component5) {
  _inherits(ControlMethods, _React$Component5);

  function ControlMethods(props) {
    _classCallCheck(this, ControlMethods);

    var _this7 = _possibleConstructorReturn(this, (ControlMethods.__proto__ || Object.getPrototypeOf(ControlMethods)).call(this, props));

    _this7.state = {
      data: undefined,
      example: "",
      selected: {
        /* this is where you add the selected fields for the options*/
        location: " ",
        facility: " ",
        construction: " "
      }
    };
    /* because of the async nature of jsx, need to ensure data is fetched before updating state*/
    _this7.UpdateData = _this7.UpdateData.bind(_this7);
    _this7.onChangeElem = _this7.onChangeElem.bind(_this7);
    return _this7;
  }

  /* function that updates state.selected with selected values of dropdowns */


  _createClass(ControlMethods, [{
    key: 'onChangeElem',
    value: function onChangeElem(val, column) {
      var selTemp = this.state.selected;
      console.log(val);
      selTemp[column] = val;
      this.setState({
        selected: selTemp
      });
      console.log(this.state.selected);
    }

    /* grabs data from csv database */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      Papa.parse("data/VegeSheetUrel.csv", {
        download: true,
        header: true,
        delimiter: "|",
        skipEmptyLines: true,
        complete: this.UpdateData
      });
    }
  }, {
    key: 'UpdateData',
    value: function UpdateData(result) {
      var tempdat = result.data;
      this.setState({
        data: tempdat
      });
      console.log(this.state.data);
    }
    /* the if statement in render makes sure data is fetched before displaying */

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.data ? React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            null,
            React.createElement(DropdownMult, { title: 'Treatment Location', onChangeElem: this.onChangeElem, data: this.state.data, column: 'location' }),
            React.createElement(DropdownMult, { title: 'Aesthetic Considerations', onChangeElem: this.onChangeElem, data: this.state.data, column: 'facility' }),
            React.createElement(DropdownMult, { title: 'Construction Type', onChangeElem: this.onChangeElem, data: this.state.data, column: 'construction' })
          ),
          React.createElement(MethodList, { data: this.state.data, selected: this.state.selected })
        ) : React.createElement(
          'div',
          null,
          React.createElement(
            'h5',
            null,
            'Loading...'
          )
        )
      );
    }
  }]);

  return ControlMethods;
}(React.Component);

var domContainer = document.querySelector('#react-component');
ReactDOM.render(React.createElement(ControlMethods, null), domContainer);