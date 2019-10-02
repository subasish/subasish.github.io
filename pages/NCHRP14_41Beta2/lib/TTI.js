Boolean.prototype.isBoolean = function () {
    throw new Error("Use isBoolean without parentheses!  Example: if (x.isBoolean)...");
    return true;
};
Function.prototype.isFunction = function () {
    throw new Error("Do not use isFunction with parentheses!  Example: if (x.isFunction)...");
    return true;
};
if (!Array.prototype.count) {
    Array.prototype.count = "Do not use count on arrays, dammit!";
}
if (!Array.prototype.all) {
    Array.prototype.all = function (fn) {
        var result = true;
        this.forEach(function (item) { if (!fn(item))
            result = false; });
        return result;
    };
}
if (!Array.prototype.sum) {
    Array.prototype.sum = function (fn) {
        var sum = 0;
        this.forEach(function (item) { return sum += fn(item); });
        return sum;
    };
}
if (!Array.prototype.distinct) {
    Array.prototype.distinct = function () {
        var result = new Array();
        for (var i = 0; i < this.length; i++)
            if (this[i])
                if (result.indexOf(this[i]) === -1)
                    result.push(this[i]);
        return result;
    };
}
if (!Array.prototype.select) {
    Array.prototype.select = function (fn) {
        var newItems = new Array();
        this.forEach(function (item) { return newItems.push(fn(item)); });
        return newItems;
    };
}
if (!Array.prototype.max) {
    Array.prototype.max = function (fn) {
        var maxItem;
        var maxValue;
        if (this.length > 0) {
            maxItem = this[0];
            maxValue = fn(maxItem);
            for (var i = 1; i < this.length; i++) {
                var itemValue = fn(this[i]);
                if (itemValue > maxValue) {
                    maxValue = itemValue;
                    maxItem = this[i];
                }
            }
        }
        return maxItem;
    };
}
if (!Array.prototype.min) {
    Array.prototype.min = function (fn) {
        var maxItem;
        var maxValue;
        if (this.length > 0) {
            maxItem = this[0];
            maxValue = fn(maxItem);
            for (var i = 1; i < this.length; i++) {
                var itemValue = fn(this[i]);
                if (itemValue < maxValue) {
                    maxValue = itemValue;
                    maxItem = this[i];
                }
            }
        }
        return maxItem;
    };
}
if (!Array.prototype.clone) {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
}
if (!Array.prototype.pushMany) {
    Array.prototype.pushMany = function (items) {
        [].push.apply(this, items);
        return this;
    };
}
if (!Array.prototype.removeWhere) {
    Array.prototype.removeWhere = function (fn) {
        var removedItems = new Array();
        for (var i = this.length - 1; i >= 0; i--) {
            var item = this[i];
            if (fn(item)) {
                removedItems.push(item);
                this.remove(i);
            }
        }
        return removedItems;
    };
}
if (!Array.prototype.where) {
    Array.prototype.where = function (fn) {
        return this.filter(function (item) { return fn(item); });
    };
}
if (!Array.prototype.insert) {
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
        return this;
    };
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function (index, count) {
        if (!count)
            count = 1;
        this.splice(index, count);
        return this;
    };
}
if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (fn) {
        var result = null;
        if (fn) {
            for (var i = 0; i < this.length; i++) {
                var item = this[i];
                if (fn(item)) {
                    result = item;
                    break;
                }
            }
        }
        else {
            if (this.any())
                result = this[0];
        }
        return result;
    };
}
if (!Array.prototype.any) {
    Array.prototype.any = function (fn) {
        if (fn)
            return this.some(fn) != null;
        else
            return this.length > 0;
    };
}
if (!Node.prototype.getElement) {
    Node.prototype.getElement = function (name) {
        return this.getElementsByTagName(name)[0];
    };
}
if (!Node.prototype.getValue) {
    Node.prototype.getValue = function (valueName) {
        var value;
        var elements = this.getElementsByTagName(valueName);
        if (elements.length == 0)
            value = this.getAttributeValue(valueName);
        else if (elements[0].childNodes.length > 0)
            value = elements[0].childNodes[0].nodeValue;
        return value;
    };
}
if (!Node.prototype.getAttributeValue) {
    Node.prototype.getAttributeValue = function (attributeName) {
        var value;
        var item = this.attributes.getNamedItem(attributeName);
        if (item)
            value = item.value;
        return value;
    };
}
if (!String.prototype.left) {
    String.prototype.left = function (count) {
        return this.substring(0, count);
    };
}
if (!String.prototype.right) {
    String.prototype.right = function (count) {
        return this.substring(this.length - count, this.length);
    };
}
if (!String.prototype.isString) {
    /** Do not use with parentheses.  Example if (x.isString) */
    String.prototype.isString = function () {
        throw new Error("Use isString without parentheses!  Example: if (x.isString)...");
        return true;
    };
}
if (!String.prototype.getField) {
    String.prototype.getField = function (index, delimeter) {
        if (delimeter === void 0) { delimeter = " "; }
        return this.split(delimeter)[index];
    };
}
if (!String.prototype.contains) {
    String.prototype.contains = function (searchString) {
        return this.indexOf(searchString) != -1;
    };
}
if (!String.prototype.nthIndexOf) {
    String.prototype.nthIndexOf = function (searchString, n) {
        var indexOf = -1;
        while (n-- && indexOf++ < this.length)
            indexOf = this.indexOf(searchString, indexOf);
        return indexOf;
    };
}
if (!String.prototype.insert) {
    String.prototype.insert = function (index, value) {
        if (index > 0)
            return this.substring(0, index) + value + this.substring(index, this.length);
        else
            return value + this;
    };
}
if (!String.prototype.removeNonAlphanumericCharacters) {
    String.prototype.removeNonAlphanumericCharacters = function (replaceEachWith) {
        //Faster than the regEx version!
        var result = "";
        for (var i = 0; i < this.length; i++) {
            var code = this.charCodeAt(i);
            var char1 = this.charAt(i);
            var cc = char1.charCodeAt(0);
            if ((cc > 47 && cc < 58) ||
                (cc > 64 && cc < 91) ||
                (cc > 96 && cc < 123))
                result += this.charAt(i);
            else if (replaceEachWith)
                result += replaceEachWith;
        }
        return result;
    };
}
if (!String.prototype.removeControlCharacters) {
    String.prototype.removeControlCharacters = function (replaceEachWith) {
        //Faster than the regEx version!
        var result = "";
        for (var i = 0; i < this.length; i++) {
            var code = this.charCodeAt(i);
            var char1 = this.charAt(i);
            var cc = char1.charCodeAt(0);
            if (cc < 32) {
                if (replaceEachWith)
                    result += replaceEachWith;
            }
            else
                result += this.charAt(i);
        }
        return result;
    };
}
if (!String.prototype.htmlEncode) {
    String.prototype.htmlEncode = function () {
        return $('<div/>').text(this).html();
    };
}
if (!String.prototype.htmlDecode) {
    String.prototype.htmlDecode = function () {
        return $('<div/>').html(this).text();
    };
}
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (searchValue, replacementValue) {
        if (replacementValue === void 0) { replacementValue = ""; }
        return this.split(searchValue).join(replacementValue);
    };
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (value) {
        return this.indexOf(value) == 0;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (value) {
        return this.substring(this.length - value.length) === value;
    };
}
if (!String.prototype.trimLeft) {
    String.prototype.trimLeft = function () {
        var theString = this;
        while (theString.charAt(0) === ' ')
            theString = theString.substring(1, theString.length);
        return theString;
    };
}
if (!String.prototype.trimRight) {
    String.prototype.trimRight = function () {
        var theString = this;
        while (theString.charAt(theString.length - 1) === ' ')
            theString = theString.substring(0, theString.length - 1);
        return theString;
    };
}
if (!Number.prototype.isNumber) {
    Number.prototype.isNumber = function () {
        throw new Error("Use isNumber without parentheses!  Example: if (x.isNumber)...");
        return true;
    };
}
if (!Number.prototype.round) {
    Number.prototype.round = function (numberOfDecimalPlaces) {
        if (!numberOfDecimalPlaces)
            numberOfDecimalPlaces = 0;
        return +this.toFixed(numberOfDecimalPlaces);
    };
}
var Month;
(function (Month) {
    Month[Month["January"] = 0] = "January";
    Month[Month["February"] = 1] = "February";
    Month[Month["March"] = 2] = "March";
    Month[Month["April"] = 3] = "April";
    Month[Month["May"] = 4] = "May";
    Month[Month["June"] = 5] = "June";
    Month[Month["July"] = 6] = "July";
    Month[Month["August"] = 7] = "August";
    Month[Month["September"] = 8] = "September";
    Month[Month["October"] = 9] = "October";
    Month[Month["November"] = 10] = "November";
    Month[Month["December"] = 11] = "December";
})(Month || (Month = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek || (DayOfWeek = {}));
var DaysOfWeek;
(function (DaysOfWeek) {
    DaysOfWeek[DaysOfWeek["None"] = 0] = "None";
    DaysOfWeek[DaysOfWeek["Sunday"] = 1] = "Sunday";
    DaysOfWeek[DaysOfWeek["Monday"] = 2] = "Monday";
    DaysOfWeek[DaysOfWeek["Tuesday"] = 4] = "Tuesday";
    DaysOfWeek[DaysOfWeek["Wednesday"] = 8] = "Wednesday";
    DaysOfWeek[DaysOfWeek["Thursday"] = 16] = "Thursday";
    DaysOfWeek[DaysOfWeek["Friday"] = 32] = "Friday";
    DaysOfWeek[DaysOfWeek["Saturday"] = 64] = "Saturday";
    DaysOfWeek[DaysOfWeek["All"] = 127] = "All";
    DaysOfWeek[DaysOfWeek["Weekday"] = 62] = "Weekday";
    DaysOfWeek[DaysOfWeek["Weekend"] = 65] = "Weekend";
})(DaysOfWeek || (DaysOfWeek = {}));
var DateTimePart;
(function (DateTimePart) {
    DateTimePart[DateTimePart["None"] = 0] = "None";
    DateTimePart[DateTimePart["Millisecond"] = 1] = "Millisecond";
    DateTimePart[DateTimePart["Milliseconds"] = 2] = "Milliseconds";
    DateTimePart[DateTimePart["Second"] = 3] = "Second";
    DateTimePart[DateTimePart["Seconds"] = 4] = "Seconds";
    DateTimePart[DateTimePart["Minute"] = 5] = "Minute";
    DateTimePart[DateTimePart["Minutes"] = 6] = "Minutes";
    DateTimePart[DateTimePart["Hour"] = 7] = "Hour";
    DateTimePart[DateTimePart["Hours"] = 8] = "Hours";
    DateTimePart[DateTimePart["Day"] = 9] = "Day";
    DateTimePart[DateTimePart["Days"] = 10] = "Days";
    DateTimePart[DateTimePart["Month"] = 11] = "Month";
    DateTimePart[DateTimePart["Months"] = 12] = "Months";
    DateTimePart[DateTimePart["Year"] = 13] = "Year";
    DateTimePart[DateTimePart["Years"] = 14] = "Years";
})(DateTimePart || (DateTimePart = {}));
if (!Date.prototype.clone) {
    Date.prototype.clone = function () {
        return new Date(this.getTime());
    };
}
if (!Date.prototype.getDateOnly) {
    Date.prototype.getDateOnly = function () {
        var d = this.clone();
        d.setHours(0, 0, 0, 0);
        return d;
    };
}
if (!Date.prototype.getTimeOfDay) {
    Date.prototype.getTimeOfDay = function () {
        return new TTI.TimeSpan({
            milliseconds: this.getMilliseconds(),
            seconds: this.getSeconds(),
            minutes: this.getMinutes(),
            hours: this.getHours()
        });
    };
}
if (!Date.prototype.getMonthName) {
    Date.prototype.getMonthName = function () {
        return Month[this.getMonth()];
    };
}
if (!Date.prototype.getDayName) {
    Date.prototype.getDayName = function () {
        return DayOfWeek[this.getDay()];
    };
}
if (!Date.prototype.age) {
    Date.prototype.age = function () {
        return new TTI.TimeSpan({ totalMilliseconds: Math.abs(new Date().getTime() - this.getTime()) });
    };
}
if (!Date.prototype.add) {
    Date.prototype.add = function (value, part) {
        if (typeof value === "number") {
            if (!part)
                part = DateTimePart.Milliseconds;
            var nValue = value;
            switch (part) {
                case DateTimePart.Millisecond:
                case DateTimePart.Milliseconds:
                    this.setTime(this.getTime() + nValue);
                    break;
                case DateTimePart.Second:
                case DateTimePart.Seconds:
                    this.add(nValue * TTI.TimeSpan.MillisecondsPerSecond);
                    break;
                case DateTimePart.Minute:
                case DateTimePart.Minutes:
                    this.add(nValue * TTI.TimeSpan.MillisecondsPerMinute);
                    break;
                case DateTimePart.Hour:
                case DateTimePart.Hours:
                    this.add(nValue * TTI.TimeSpan.MillisecondsPerHour);
                    break;
                case DateTimePart.Day:
                case DateTimePart.Days:
                    this.add(nValue * TTI.TimeSpan.MillisecondsPerDay);
                    break;
                case DateTimePart.Month:
                case DateTimePart.Months:
                    var currentMonth = this.getMonth();
                    this.setMonth(this.getMonth() + nValue);
                    if (this.getMonth() != ((currentMonth + nValue) % 12))
                        this.setDate(0);
                    break;
                case DateTimePart.Year:
                case DateTimePart.Years:
                    this.add(nValue, TTI.TimeSpan.MillisecondsPerYear); //TODO account for leap years
                    break;
                default:
                    throw new Error("Unsupported DatTimePart");
            }
        }
        else if (value instanceof TTI.TimeSpan)
            this.add(value.totalMilliseconds);
        else {
            var tValue = new TTI.TimeSpan(value);
            this.add(tValue.totalMilliseconds);
        }
        return this;
    };
}
if (!Date.prototype.subtract) {
    Date.prototype.subtract = function (value, part) {
        if (typeof value === "number")
            this.add(-value, part);
        else if (value instanceof TTI.TimeSpan)
            this.add(-value.totalMilliseconds);
        else {
            var tValue = new TTI.TimeSpan(value);
            this.add(-tValue.totalMilliseconds);
        }
        return this;
    };
}
if (!Date.prototype.dayIs) {
    Date.prototype.dayIs = function (daysOfWeek) {
        return (Math.pow(2, this.getDay()) & daysOfWeek) > 0;
    };
}
if (!Date.prototype.toUTCMilliseconds) {
    Date.prototype.toUTCMilliseconds = function () {
        return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
    };
}
if (!Date.prototype.toODataDateString) {
    Date.prototype.toODataDateString = function () {
        var month = this.getMonth() + 1;
        var monthString = month.toString();
        if (month < 10)
            monthString = "0" + month;
        var date = this.getDate();
        var dateString = date.toString();
        if (date < 10)
            dateString = "0" + date;
        return this.getFullYear() + "-" + monthString + "-" + dateString;
    };
}
/*********************************************************************/
$.fn.setScale = function (newScale) {
    return this.each(function () {
        $(this).css({
            '-webkit-transform': 'scale(' + newScale + ')',
            '-moz-transform': 'scale(' + newScale + ')',
            '-ms-transform': 'scale(' + newScale + ')',
            '-o-transform': 'scale(' + newScale + ')',
            'transform': 'scale(' + newScale + ')'
        });
    });
};
$.fn.animatedRotate = function (startAngle, endAngle, duration, easing, complete) {
    return this.each(function () {
        var elem = $(this);
        $({ deg: startAngle }).animate({ deg: endAngle }, {
            duration: duration,
            easing: easing,
            step: function (now) {
                elem.css({
                    '-moz-transform': 'rotate(' + now + 'deg)',
                    '-webkit-transform': 'rotate(' + now + 'deg)',
                    '-o-transform': 'rotate(' + now + 'deg)',
                    '-ms-transform': 'rotate(' + now + 'deg)',
                    'transform': 'rotate(' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Extensions.ts"/>
var TTI;
(function (TTI) {
    var Types;
    (function (Types) {
        Types.Boolean = typeof true;
        Types.Number = typeof 0;
        Types.String = typeof "";
        Types.Object = typeof null;
        Types.Null = typeof null; // == "object", go figure
        Types.Undefined = typeof undefined;
        Types.Function = typeof {};
    })(Types = TTI.Types || (TTI.Types = {}));
    function dispose(target) {
        if (target)
            target.dispose();
    }
    TTI.dispose = dispose;
    function clone(source, depth) {
        if (depth === void 0) { depth = 0; }
        if (depth < 0)
            return source;
        switch (typeof source) {
            case Types.Undefined:
            case Types.Null:
            case Types.String:
            case Types.Boolean:
            case Types.Number:
            case Types.Function:
                return source; // return primitives as is.
        }
        var result;
        if (source instanceof Array) {
            result = source.slice();
            if (depth > 0) {
                for (var i = 0; i < result.length; i++)
                    if (i in result)
                        result[i] = clone(result[i], depth - 1);
            }
        }
        else {
            result = {};
            if (depth > 0)
                for (var k in source)
                    result[k] = clone(source[k], depth - 1);
        }
        return result;
    }
    TTI.clone = clone;
    function copyTo(source, target) {
        for (var k in source)
            target[k] = source[k];
    }
    TTI.copyTo = copyTo;
    function doAsync(fn, timeoutMilliseconds) {
        setTimeout(fn, timeoutMilliseconds);
    }
    TTI.doAsync = doAsync;
    function runningInBrowser() {
        return document.URL.startsWith('http://') || document.URL.startsWith('https://');
    }
    TTI.runningInBrowser = runningInBrowser;
    function createGuid() {
        var d = new Date().getTime();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
    TTI.createGuid = createGuid;
    var IsAbstractError = (function () {
        function IsAbstractError() {
            this.name = "IsAbstractError";
            this.message = "This is an abstract method";
        }
        return IsAbstractError;
    })();
    TTI.IsAbstractError = IsAbstractError;
    var DeviceNotReadyError = (function () {
        function DeviceNotReadyError() {
            this.name = "DeviceNotReadyError";
            this.message = "The device is not ready yet, dammit!";
        }
        return DeviceNotReadyError;
    })();
    TTI.DeviceNotReadyError = DeviceNotReadyError;
    var NotSupportedError = (function () {
        function NotSupportedError() {
            this.name = "NotSupportedError";
            this.message = "Not supported.";
        }
        return NotSupportedError;
    })();
    TTI.NotSupportedError = NotSupportedError;
    var Enumerable = (function () {
        function Enumerable() {
        }
        Object.defineProperty(Enumerable.prototype, "itemAdded", {
            get: function () { return this.mItemAdded = Event.get(this.mItemAdded); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enumerable.prototype, "itemRemoved", {
            get: function () { return this.mItemRemoved = Event.get(this.mItemRemoved); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enumerable.prototype, "changed", {
            get: function () { return this.mChanged = Event.get(this.mChanged); },
            enumerable: true,
            configurable: true
        });
        Enumerable.prototype.onItemAdded = function (item) {
            Event.raise(this.mItemAdded, item);
            Event.raise(this.mChanged, item);
        };
        Enumerable.prototype.onItemRemoved = function (item) {
            if (this.mItemRemoved)
                this.mItemRemoved.raise(item);
            if (this.mChanged)
                this.mChanged.raise(item);
        };
        Enumerable.prototype.distinct = function () {
            var result = new Array();
            for (var i = 0; i < this.length; i++)
                if (this[i])
                    if (result.indexOf(this[i]) === -1)
                        result.push(this[i]);
            return result;
        };
        Enumerable.prototype.forEach = function (fn) {
            throw new IsAbstractError();
        };
        Enumerable.prototype.max = function (fn) {
            var maxItem;
            var maxItemValue;
            this.forEach(function (item) {
                var itemValue = fn(item);
                if ((!maxItem) || (itemValue > maxItemValue)) {
                    maxItem = item;
                    maxItemValue = itemValue;
                }
            });
            return maxItem;
        };
        Enumerable.prototype.min = function (fn) {
            var minItem;
            var minItemValue;
            this.forEach(function (item) {
                var itemValue = fn(item);
                if ((!minItem) || (itemValue < minItemValue)) {
                    minItem = item;
                    minItemValue = itemValue;
                }
            });
            return minItem;
        };
        Enumerable.prototype.select = function (fn) {
            var newItems = new Array();
            this.forEach(function (item) { return newItems.push(fn(item)); });
            return newItems;
        };
        Enumerable.prototype.sum = function (fn) {
            var sum = 0;
            this.forEach(function (item) { return sum += fn(item); });
            return sum;
        };
        Enumerable.prototype.add = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            throw new IsAbstractError();
        };
        Enumerable.prototype.addRange = function (items) {
            var _this = this;
            items.forEach(function (item) { return _this.add(item); });
            return this;
        };
        Enumerable.prototype.remove = function (item) {
            throw new IsAbstractError();
        };
        Enumerable.prototype.removeWhere = function (fn) {
            var _this = this;
            var itemsToRemove = this.where(fn);
            itemsToRemove.forEach(function (item) { return _this.remove(item); });
            return this;
        };
        Enumerable.prototype.removeAll = function () {
            var _this = this;
            var array = this.toArray();
            array.forEach(function (item) { return _this.remove(item); });
            return this;
        };
        /** Same as RemoveAll */
        Enumerable.prototype.clear = function () {
            return this.removeAll();
        };
        Object.defineProperty(Enumerable.prototype, "count", {
            get: function () {
                throw new IsAbstractError();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enumerable.prototype, "length", {
            get: function () { return this.count; },
            enumerable: true,
            configurable: true
        });
        Enumerable.prototype.contains = function (item) {
            throw new IsAbstractError();
        };
        Enumerable.prototype.where = function (fn) {
            throw new IsAbstractError();
        };
        Enumerable.prototype.toArray = function () {
            var itemArray = new Array();
            this.forEach(function (item) { return itemArray.push(item); });
            return itemArray;
        };
        Enumerable.prototype.toString = function () {
            return "[" + this.toArray().toString() + "]";
        };
        Enumerable.prototype.orderBy = function (fn) {
            var items = this.toArray().sort(function (a, b) {
                var fa = fn(a);
                var fb = fn(b);
                if (fa > fb)
                    return 1;
                else if (fa < fb)
                    return -1;
                else
                    return 0;
            });
            return new List(items);
        };
        Enumerable.prototype.firstOrDefault = function (fn) {
            var result = null;
            this.forEach(function (item) {
                if (fn) {
                    if (fn(item)) {
                        result = item;
                        return false;
                    }
                }
                else {
                    result = item;
                    return false;
                }
            });
            return result;
        };
        Enumerable.prototype.any = function (fn) {
            if (fn)
                return this.firstOrDefault(fn) != null;
            else
                return this.count > 0;
        };
        Enumerable.prototype.all = function (fn) {
            var result = true;
            this.forEach(function (item) { if (!fn(item))
                result = false; });
            return result;
        };
        return Enumerable;
    })();
    TTI.Enumerable = Enumerable;
    var List = (function (_super) {
        __extends(List, _super);
        function List(items) {
            _super.call(this);
            this.items = new Array();
            if (items)
                this.items = items;
        }
        List.fromArray = function (array) {
            return new List(array);
        };
        List.prototype.forEach = function (fn) {
            for (var i = 0; i < this.items.length; i++) {
                var brk = fn(this.items[i]);
                if (brk === false)
                    break;
            }
        };
        List.prototype.add = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!this.contains(item)) {
                    this.items.push(item);
                    _super.prototype.onItemAdded.call(this, item);
                }
            }
            return this;
        };
        List.prototype.remove = function (item) {
            if (typeof item === "number")
                this.items.remove(item);
            else {
                var index = this.items.indexOf(item);
                if (index > -1) {
                    this.items.remove(index);
                    _super.prototype.onItemRemoved.call(this, item);
                }
            }
            return this;
        };
        List.prototype.toArray = function () {
            return this.items.clone();
        };
        Object.defineProperty(List.prototype, "count", {
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.contains = function (item) {
            var index = this.items.indexOf(item);
            return (index > -1);
        };
        List.prototype.where = function (fn) {
            return List.fromArray(this.items.filter(function (item) { return fn(item); }));
        };
        return List;
    })(Enumerable);
    TTI.List = List;
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection() {
            _super.apply(this, arguments);
            this.items = {};
            this.mCount = 0;
        }
        Object.defineProperty(Collection.prototype, "count", {
            get: function () {
                return this.mCount;
            },
            enumerable: true,
            configurable: true
        });
        Collection.prototype.add = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (this.contains(item))
                    throw new Error("Collection already contains item with key " + item.getCollectionKey());
                else {
                    this.items[item.getCollectionKey()] = item;
                    this.mCount++;
                    _super.prototype.onItemAdded.call(this, item);
                }
            }
            return this;
        };
        Collection.prototype.contains = function (item) {
            return this.containsKey(item.getCollectionKey());
        };
        Collection.prototype.containsKey = function (key) {
            return this.items[key] !== undefined;
        };
        Collection.prototype.get = function (key) {
            return this.items[key];
        };
        Collection.prototype.forEach = function (fn) {
            for (var id in this.items) {
                var brk = fn(this.items[id]);
                if (brk === false)
                    break;
            }
        };
        Collection.prototype.remove = function (item) {
            this.removeByKey(item.getCollectionKey());
            return this;
        };
        Collection.prototype.removeByKey = function (key) {
            if (this.containsKey(key)) {
                var item = this.items[key];
                delete this.items[key];
                this.mCount--;
                _super.prototype.onItemRemoved.call(this, item);
            }
            return this;
        };
        Collection.prototype.where = function (fn) {
            var items = new Collection();
            this.forEach(function (item) { if (fn(item))
                items.add(item); });
            return items;
        };
        Collection.prototype.toList = function () {
            return new List(this.toArray());
        };
        return Collection;
    })(Enumerable);
    TTI.Collection = Collection;
    var EventHandler = (function () {
        function EventHandler(handler, context, onDisposeCallback) {
            this.handler = handler;
            this.context = context;
            this.onDisposeCallback = onDisposeCallback;
        }
        EventHandler.prototype.dispose = function () {
            if (this.onDisposeCallback)
                this.onDisposeCallback(this);
            this.dispose = null;
        };
        return EventHandler;
    })();
    TTI.EventHandler = EventHandler;
    var Event = (function () {
        function Event() {
        }
        //context = An optional context to call the handler in.
        Event.prototype.addHandler = function (handler, context) {
            var _this = this;
            if (!this.handlers)
                this.handlers = new Array();
            var newHandler = new EventHandler(handler, context, function (h) { return _this.removeHandler(h); });
            this.handlers.push(newHandler);
            if (this.onHandlerAdded)
                this.onHandlerAdded(newHandler, context);
            return newHandler;
        };
        //context = An optional scope to call the handler in.
        //When the event occurs, the handler will be notified and then removed
        Event.prototype.addOnceHandler = function (handler, context) {
            var _this = this;
            if (!this.onceHandlers)
                this.onceHandlers = new Array();
            var newHandler = new EventHandler(handler, context, function (h) { return _this.removeHandler(h); });
            this.onceHandlers.push(newHandler);
            if (this.onHandlerAdded)
                this.onHandlerAdded(newHandler);
            return newHandler;
        };
        Event.prototype.removeHandler = function (handler) {
            //Using an array, even though there will only ever be one matching handler, because it simplifies the remove code below
            var removedHandlers = new Array();
            if (handler instanceof EventHandler) {
                if (this.handlers)
                    removedHandlers.pushMany(this.handlers.removeWhere(function (h) { return h === handler; }));
                if (this.onceHandlers)
                    removedHandlers.pushMany(this.handlers.removeWhere(function (h) { return h === handler; }));
            }
            else {
                if (this.handlers)
                    removedHandlers.pushMany(this.handlers.removeWhere(function (h) { return h.handler === handler; }));
                if (this.onceHandlers)
                    removedHandlers.pushMany(this.handlers.removeWhere(function (h) { return h.handler === handler; }));
            }
            if (this.onHandlerRemoved && removedHandlers.any())
                this.onHandlerRemoved(removedHandlers[0]);
        };
        Event.prototype.removeAllhandlers = function () {
            this.handlers = null;
            this.onceHandlers = null;
            if (this.onHandlerRemoved)
                this.onHandlerRemoved(null);
        };
        Event.invokeHandler = function (eventArgs, handler, context) {
            if (context)
                handler.call(context, eventArgs);
            else
                handler(eventArgs);
        };
        Event.prototype.raise = function (eventArgs) {
            if (this.handlers)
                this.handlers.forEach(function (handler) { return Event.invokeHandler(eventArgs, handler.handler, handler.context); });
            if (this.onceHandlers) {
                this.onceHandlers.forEach(function (handler) { return Event.invokeHandler(eventArgs, handler.handler, handler.context); });
                this.onceHandlers = null;
            }
        };
        Object.defineProperty(Event.prototype, "handlerCount", {
            get: function () {
                var count = 0;
                if (this.handlers)
                    count += this.handlers.length;
                if (this.onceHandlers)
                    count += this.onceHandlers.length;
                return count;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.dispose = function () {
            this.removeAllhandlers();
            this.onHandlerAdded = null;
            this.onHandlerRemoved = null;
        };
        //Raise if not null
        Event.raise = function (event, eventArgs) {
            if (eventArgs === void 0) { eventArgs = null; }
            if (event)
                event.raise(eventArgs);
        };
        //Ensures that the returned event is not null
        Event.get = function (event, onHandlerAdded, onHandlerRemoved) {
            if (!event) {
                event = new Event();
                event.onHandlerAdded = onHandlerAdded;
                event.onHandlerRemoved = onHandlerRemoved;
            }
            return event;
        };
        Event.dispose = function (event) {
            if (event)
                event.dispose();
        };
        return Event;
    })();
    TTI.Event = Event;
    var Queue = (function () {
        function Queue() {
            this.queue = new Array();
            this.offset = 0;
        }
        Object.defineProperty(Queue.prototype, "length", {
            get: function () {
                return (this.queue.length - this.offset);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Queue.prototype, "isEmpty", {
            get: function () {
                return (this.queue.length == 0);
            },
            enumerable: true,
            configurable: true
        });
        Queue.prototype.enqueue = function (item) {
            this.queue.push(item);
        };
        /** Dequeues an item and returns it. If the queue is empty, undefined is returned.  */
        Queue.prototype.dequeue = function () {
            return this.queue.shift();
        };
        /** Returns the item at the front of the queue (without dequeuing it). If the queue is empty, undefined is returned. */
        Queue.prototype.peek = function () {
            return this.isEmpty ? undefined : this.queue[this.offset];
        };
        return Queue;
    })();
    TTI.Queue = Queue;
    var Timer = (function () {
        function Timer(duration, callback) {
            if (!(duration instanceof TimeSpan))
                duration = new TimeSpan(duration);
            this.timerId = setTimeout(function (that) { Event.raise(that.mElapsed); that.dispose(); }, duration.totalMilliseconds, this);
            if (callback)
                this.elapsed.addHandler(callback);
        }
        Object.defineProperty(Timer.prototype, "elapsed", {
            get: function () { return this.mElapsed = Event.get(this.mElapsed); },
            enumerable: true,
            configurable: true
        });
        Timer.prototype.dispose = function () {
            clearTimeout(this.timerId);
            Event.dispose(this.mElapsed);
        };
        return Timer;
    })();
    TTI.Timer = Timer;
    var Interval = (function () {
        function Interval(duration, callback) {
            if (!(duration instanceof TimeSpan))
                duration = new TimeSpan(duration);
            this.intervalId = setInterval(function (that) { return Event.raise(that.mElapsed); }, duration.totalMilliseconds, this);
            if (callback)
                this.elapsed.addHandler(callback);
        }
        Object.defineProperty(Interval.prototype, "elapsed", {
            get: function () { return this.mElapsed = Event.get(this.mElapsed); },
            enumerable: true,
            configurable: true
        });
        Interval.prototype.dispose = function () {
            clearInterval(this.intervalId);
            Event.dispose(this.mElapsed);
        };
        return Interval;
    })();
    TTI.Interval = Interval;
    var TimeSpan = (function () {
        function TimeSpan(duration) {
            var value;
            if (duration.totalMilliseconds) {
                if (TTI.isNumber(duration.totalMilliseconds))
                    this.totalMilliseconds = duration.totalMilliseconds;
                else
                    this.totalMilliseconds = duration.totalMilliseconds.value;
            }
            else if (duration.totalSeconds) {
                if (TTI.isNumber(duration.totalSeconds))
                    value = duration.totalSeconds;
                else
                    value = duration.totalMilliseconds.value;
                this.totalMilliseconds = value * TimeSpan.MillisecondsPerSecond;
            }
            else if (duration.totalMinutes) {
                if (TTI.isNumber(duration.totalMinutes))
                    value = duration.totalMinutes;
                else
                    value = duration.totalMinutes.value;
                this.totalMilliseconds = value * TimeSpan.MillisecondsPerMinute;
            }
            else if (duration.totalHours) {
                if (TTI.isNumber(duration.totalHours))
                    value = duration.totalHours;
                else
                    value = duration.totalHours.value;
                this.totalMilliseconds = value * TimeSpan.MillisecondsPerHour;
            }
            else if (duration.totalDays) {
                if (TTI.isNumber(duration.totalDays))
                    value = duration.totalDays;
                else
                    value = duration.totalDays.value;
                this.totalMilliseconds = value * TimeSpan.MillisecondsPerDay;
            }
            else {
                this.totalMilliseconds = 0;
                if (duration.milliseconds)
                    this.totalMilliseconds += duration.milliseconds;
                if (duration.seconds)
                    this.totalMilliseconds += duration.seconds * TimeSpan.MillisecondsPerSecond;
                if (duration.minutes)
                    this.totalMilliseconds += duration.minutes * TimeSpan.MillisecondsPerMinute;
                if (duration.hours)
                    this.totalMilliseconds += duration.hours * TimeSpan.MillisecondsPerHour;
                if (duration.days)
                    this.totalMilliseconds += duration.days * TimeSpan.MillisecondsPerDay;
                if (duration.years)
                    this.totalMilliseconds += duration.years * TimeSpan.MillisecondsPerYear;
            }
        }
        Object.defineProperty(TimeSpan.prototype, "years", {
            get: function () { return Math.floor(this.totalMilliseconds / TimeSpan.MillisecondsPerYear); },
            set: function (value) { throw new Error("May not be set"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "days", {
            get: function () { return Math.floor((this.totalMilliseconds % TimeSpan.MillisecondsPerYear) / TimeSpan.MillisecondsPerDay); },
            set: function (value) { throw new Error("May not be set"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "hours", {
            get: function () { return Math.floor((this.totalMilliseconds % TimeSpan.MillisecondsPerDay) / TimeSpan.MillisecondsPerHour); },
            set: function (value) { throw new Error("May not be set"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "minutes", {
            get: function () { return Math.floor((this.totalMilliseconds % TimeSpan.MillisecondsPerHour) / TimeSpan.MillisecondsPerMinute); },
            set: function (value) { throw new Error("May not be set"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "seconds", {
            get: function () { return Math.floor((this.totalMilliseconds % TimeSpan.MillisecondsPerMinute) / TimeSpan.MillisecondsPerSecond); },
            set: function (value) { throw new Error("May not be set"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "milliseconds", {
            get: function () { return this.totalMilliseconds % TimeSpan.MillisecondsPerSecond; },
            set: function (value) { throw new Error("May not be set"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalSeconds", {
            get: function () { return this.totalMilliseconds / TimeSpan.MillisecondsPerSecond; },
            set: function (value) { this.totalMilliseconds = value * TimeSpan.MillisecondsPerSecond; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalMinutes", {
            get: function () { return this.totalMilliseconds / TimeSpan.MillisecondsPerMinute; },
            set: function (value) { this.totalMilliseconds = value * TimeSpan.MillisecondsPerMinute; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalHours", {
            get: function () { return this.totalMilliseconds / TimeSpan.MillisecondsPerHour; },
            set: function (value) { this.totalMilliseconds = value * TimeSpan.MillisecondsPerHour; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalDays", {
            get: function () { return this.totalMilliseconds / TimeSpan.MillisecondsPerDay; },
            set: function (value) { this.totalMilliseconds = value * TimeSpan.MillisecondsPerDay; },
            enumerable: true,
            configurable: true
        });
        TimeSpan.prototype.valueOf = function () {
            return this.totalMilliseconds;
        };
        TimeSpan.prototype.add = function (value) {
            if (!(value instanceof TimeSpan))
                value = new TimeSpan(value);
            this.totalMilliseconds += value.totalMilliseconds;
            return this;
        };
        TimeSpan.prototype.subtract = function (value) {
            if (!(value instanceof TimeSpan))
                value = new TimeSpan(value);
            this.totalMilliseconds -= value.totalMilliseconds;
            return this;
        };
        TimeSpan.prototype.equals = function (value) {
            if (!(value instanceof TimeSpan))
                value = new TimeSpan(value);
            return this.totalMilliseconds == value.totalMilliseconds;
        };
        TimeSpan.prototype.toString = function () {
            return JSON.stringify(this);
        };
        TimeSpan.fromString = function (value) {
            return new TimeSpan(JSON.parse(value));
        };
        TimeSpan.MillisecondsPerSecond = 1000;
        TimeSpan.MillisecondsPerMinute = TimeSpan.MillisecondsPerSecond * 60;
        TimeSpan.MillisecondsPerHour = TimeSpan.MillisecondsPerMinute * 60;
        TimeSpan.MillisecondsPerDay = TimeSpan.MillisecondsPerHour * 24;
        TimeSpan.MillisecondsPerYear = TimeSpan.MillisecondsPerDay * 365;
        return TimeSpan;
    })();
    TTI.TimeSpan = TimeSpan;
    function getEnumNames(e) {
        return Object.keys(e).filter(function (v) { return isNaN(parseInt(v, 10)); });
    }
    TTI.getEnumNames = getEnumNames;
    function getEnumValues(e) {
        return Object.keys(e).map(function (v) { return parseInt(v, 10); }).filter(function (v) { return !isNaN(v); });
    }
    TTI.getEnumValues = getEnumValues;
    /** Returns the name of the enum at the specified index.  */
    /* Example:
        enum Numbers { zero, one, two, three, four }
        getErnumFromIndex(Numbers, 3)  returns "three"
    */
    function getEnumFromIndex(theEnum, index) {
        return TTI.getEnumNames(theEnum)[index];
    }
    TTI.getEnumFromIndex = getEnumFromIndex;
    /** Returns the index of the enum with the specified name */
    /* Example:
        enum Numbers { zero, one, two, three, four }
        getIndexFromEnumName(Numbers, "three")  returns 3
    */
    function getIndexFromEnumName(theEnum, name) {
        var names = TTI.getEnumNames(theEnum);
        for (var i = 0; i < names.length; i++) {
            if (names[i] == name)
                return i;
        }
    }
    TTI.getIndexFromEnumName = getIndexFromEnumName;
    var NameItemPair = (function () {
        function NameItemPair(name, item) {
            this.item = item;
            this.name = name;
        }
        NameItemPair.prototype.getCollectionKey = function () {
            return this.name;
        };
        return NameItemPair;
    })();
    TTI.NameItemPair = NameItemPair;
    function isString(value) {
        return typeof value === "string";
    }
    TTI.isString = isString;
    function isNumber(value) {
        return typeof value === "number";
    }
    TTI.isNumber = isNumber;
    function isBoolean(value) {
        return typeof value === typeof true;
    }
    TTI.isBoolean = isBoolean;
    function isFunction(value) {
        return typeof value === "function";
    }
    TTI.isFunction = isFunction;
    var QueryString = (function (_super) {
        __extends(QueryString, _super);
        function QueryString(value) {
            _super.call(this);
            if (value)
                this.parse(value);
        }
        /** Examples: parse(document.location.search), parse(targetWindow.location.search) */
        QueryString.prototype.parse = function (queryString) {
            var _this = this;
            if (queryString.charAt(0) === '?')
                queryString = queryString.substring(1);
            queryString.split('&').forEach(function (keyValuePair) {
                var parts = keyValuePair.split('=');
                if (parts.length === 2) {
                    var value = decodeURIComponent(parts[1]).replace(/\+/g, ' ');
                    var valueName = parts[0];
                    var item = new NameItemPair(valueName, value);
                    if (_this.containsKey(valueName))
                        _this[valueName] = value;
                    else
                        _this.add(new NameItemPair(valueName, value));
                }
            });
        };
        QueryString.prototype.toString = function () {
            var value = "";
            if (this.any) {
                this.forEach(function (item) {
                    if (value.length == 0)
                        value = "?";
                    else
                        value += "&";
                    value += item.name + "=" + encodeURIComponent(item.item).replaceAll("'", "&apos");
                });
            }
            return value;
        };
        return QueryString;
    })(TTI.Collection);
    TTI.QueryString = QueryString;
    var Cookies = (function () {
        function Cookies() {
        }
        Cookies.set = function (cookieName, value, expirationDate) {
            if (!expirationDate)
                expirationDate = new Date(3000, 1); //Effectivly infinite
            document.cookie = cookieName + "=" + encodeURI(value) + "; expires=" + expirationDate.toUTCString();
        };
        Cookies.get = function (cookieName) {
            var cookie;
            cookieName += "=";
            if (document.cookie.length > 0) {
                var offset = document.cookie.indexOf(cookieName);
                if (offset >= 0) {
                    offset += cookieName.length;
                    var end = document.cookie.indexOf(";", offset);
                    if (end == -1)
                        end = document.cookie.length;
                    cookie = decodeURI(document.cookie.substring(offset, end));
                }
            }
            return cookie;
        };
        Cookies.delete = function (name) {
            Cookies.set(name, "", new Date().subtract(1));
        };
        return Cookies;
    })();
    TTI.Cookies = Cookies;
})(TTI || (TTI = {}));
/// <reference path="TTI.ts"/>
var TTI;
(function (TTI) {
    var Setting = (function () {
        function Setting(valueName, getDefaultValue, fromString) {
            this.valueName = valueName;
            this.getDefaultValue = getDefaultValue;
            this.fromString = fromString;
            if ((getDefaultValue == null) && (!fromString))
                throw new Error("A non-null default value function must be specified when fromString is not specified");
        }
        Object.defineProperty(Setting.prototype, "updated", {
            get: function () { return this.mUpdated = TTI.Event.get(this.mUpdated); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Setting.prototype, "value", {
            get: function () {
                if (this.mValue == null) {
                    var valueString = localStorage.getItem(this.valueName);
                    if (valueString) {
                        if (this.fromString)
                            this.mValue = this.fromString(valueString);
                        else {
                            switch (typeof this.getDefaultValue) {
                                case "object":
                                    this.mValue = JSON.parse(valueString); //Does not work like it should.  Still a json object.  Dammit. Dammit. Dammit.
                                    break;
                                case "boolean":
                                    this.mValue = Setting.toBoolean(valueString);
                                    break;
                                case "number":
                                    this.mValue = Setting.toNumber(valueString);
                                    break;
                                default:
                                    this.mValue = valueString;
                                    break;
                                    break;
                            }
                        }
                    }
                    else if (this.getDefaultValue !== undefined) {
                        if (TTI.isFunction(this.getDefaultValue))
                            this.mValue = this.getDefaultValue();
                        if (this.mValue != null)
                            localStorage.setItem(this.valueName, this.mValue.toString());
                    }
                }
                return this.mValue;
            },
            set: function (newValue) {
                this.mValue = newValue;
                if (newValue == null)
                    localStorage.removeItem(this.valueName);
                else {
                    var valueString = this.mValue.toString();
                    localStorage.setItem(this.valueName, valueString);
                    TTI.Trace.writeLine(TTI.TraceLevel.Info, "Setting.setValue", this.valueName + " set to " + valueString);
                }
                TTI.Event.raise(this.mUpdated, this);
            },
            enumerable: true,
            configurable: true
        });
        Setting.toBoolean = function (valueString) {
            return valueString == "true";
        };
        Setting.toNumber = function (valueString) {
            return +valueString;
        };
        /** Force the value to be written.  Useful for objects where a property is modified. */
        Setting.prototype.save = function () {
            this.value = this.value;
        };
        Setting.prototype.clear = function () {
            localStorage.removeItem(this.valueName);
            TTI.Event.raise(this.mUpdated, this);
        };
        return Setting;
    })();
    TTI.Setting = Setting;
})(TTI || (TTI = {}));
/// <reference path="Setting.ts"/>
/// <reference path="TTI.ts"/>
var TTI;
(function (TTI) {
    (function (TraceLevel) {
        /** Output no messages. */
        TraceLevel[TraceLevel["Off"] = 0] = "Off";
        /** Output error messages. */
        TraceLevel[TraceLevel["Error"] = 1] = "Error";
        /** Output warnings and error messages. */
        TraceLevel[TraceLevel["Warning"] = 2] = "Warning";
        /** Output informational messages, warnings, and error messages. */
        TraceLevel[TraceLevel["Info"] = 3] = "Info";
        /** Output all messages. */
        TraceLevel[TraceLevel["Verbose"] = 4] = "Verbose";
    })(TTI.TraceLevel || (TTI.TraceLevel = {}));
    var TraceLevel = TTI.TraceLevel;
    var Trace = (function () {
        function Trace() {
        }
        Object.defineProperty(Trace, "messageAdded", {
            get: function () { return Trace.mMessageAdded = TTI.Event.get(Trace.mMessageAdded); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Trace, "level", {
            get: function () { return Trace.mLevel.value; },
            set: function (value) {
                if (Trace.level != value) {
                    Trace.mLevel.value = value;
                    Trace.writeLine(TraceLevel.Info, "Trace.setLevel", "level set to " + TraceLevel[value]);
                }
            },
            enumerable: true,
            configurable: true
        });
        Trace.writeLine = function (level, source, message) {
            var messageString;
            if (TTI.isString(message))
                messageString = message;
            else
                messageString = JSON.stringify(message);
            Trace.writeLine2({ level: level, source: source, message: messageString });
        };
        Trace.writeLine2 = function (traceMessage) {
            if (traceMessage.level != TraceLevel.Off) {
                if (!traceMessage.timestamp)
                    traceMessage.timestamp = new Date();
                var message = traceMessage.timestamp.toLocaleTimeString() + "  " + traceMessage.source + "  " + traceMessage.message;
                switch (traceMessage.level) {
                    case TraceLevel.Info:
                        console.info(message);
                        break;
                    case TraceLevel.Warning:
                        console.warn(message);
                        break;
                    case TraceLevel.Error:
                        console.error(message);
                        break;
                    case TraceLevel.Verbose:
                        console.log(message);
                        break;
                }
                if (traceMessage.level <= Trace.level)
                    TTI.Event.raise(this.mMessageAdded, traceMessage);
            }
        };
        Trace.mLevel = new TTI.Setting("Trace.level", function () { return TraceLevel.Info; });
        return Trace;
    })();
    TTI.Trace = Trace;
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var Scenario = (function () {
            function Scenario(id, allRemediations) {
                this.id = id;
                this.allRemediations = allRemediations;
            }
            Scenario.prototype.updateRemediations = function () {
                var _this = this;
                this.remediations = new TTI.List();
                this.remediations.addRange(this.allRemediations);
                if (this.airportClass != undefined && this.airportClass != Acrp.AirportClass.Unspecified)
                    this.remediations.removeWhere(function (r) { return (r.airportClass != _this.airportClass) && (r.airportClass != Acrp.AirportClass.Unspecified); });
                if (this.surfaceMaterial != undefined && this.surfaceMaterial != Acrp.SurfaceMaterial.Unspecified)
                    this.remediations.removeWhere(function (r) { return (r.surfaceMaterial != _this.surfaceMaterial) && (r.surfaceMaterial != Acrp.SurfaceMaterial.Unspecified); });
                if (this.climate)
                    this.remediations.removeWhere(function (r) { return !r.climate.equals(_this.climate); });
                if (this.distressType)
                    this.remediations.removeWhere(function (r) { return r.distressType != _this.distressType; });
                if (this.distressQuantity && this.distressQuantity.length > 0)
                    this.remediations.removeWhere(function (r) { return (r.distressQuantity != _this.distressQuantity) && (r.distressQuantity && r.distressQuantity.length > 0); });
                if (this.distressSeverity != undefined && this.distressSeverity != Acrp.Severity.Unspecified)
                    this.remediations.removeWhere(function (r) { return (r.distressSeverity != _this.distressSeverity) && (r.distressSeverity != Acrp.Severity.Unspecified); });
            };
            return Scenario;
        })();
        Acrp.Scenario = Scenario;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
/// <reference path="TTI/Extensions.ts"/>
/// <reference path="TTI/Trace.ts"/>
/// <reference path="Scenario.ts"/>
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var App = (function () {
            function App() {
            }
            App.initialize = function () {
                App.states = new Acrp.States("data/ClimaticZones.csv", function () {
                    populateStatesList();
                    App.downloadJson("data/asphalt.json", function (items) {
                        createRemediations(items, Acrp.SurfaceMaterial.Asphalt);
                        App.downloadJson("data/concrete.json", function (items) {
                            createRemediations(items, Acrp.SurfaceMaterial.Concrete);
                            App.hookupStickySelectBoxes();
                            App.addScenario();
                        });
                    });
                });
                TTI.Acrp;
                Acrp.Controls.surfaceMaterialList.val((Acrp.Cookies.surfaceMaterial || Acrp.SurfaceMaterial.Concrete).toString());
                Acrp.Controls.surfaceMaterialList.change(function () { return Acrp.Cookies.surfaceMaterial = parseInt(Acrp.Controls.surfaceMaterialList.val()); });
                Acrp.Controls.airportClassList.val((Acrp.Cookies.airportClass || Acrp.AirportClass.Regional).toString());
                Acrp.Controls.airportClassList.change(function () { return Acrp.Cookies.airportClass = parseInt(Acrp.Controls.airportClassList.val()); });
                function populateStatesList() {
                    var html;
                    App.states.forEach(function (state) { return html += "<option value=\"" + state.name + "\">" + state.name + "</option>"; });
                    Acrp.Controls.stateList.append(html);
                    Acrp.Controls.stateList.val(Acrp.Cookies.state || "");
                    Acrp.Controls.stateList.change(function () {
                        var selectedState = App.states.firstOrDefault(function (state) { return state.name == Acrp.Controls.stateList.val(); });
                        Acrp.Cookies.state = selectedState.name;
                        populateCountiesList();
                    });
                    populateCountiesList();
                    Acrp.Controls.countyList.change(function () { return Acrp.Cookies.county = Acrp.Controls.countyList.val(); });
                    function populateCountiesList() {
                        var state = App.states.firstOrDefault(function (state) { return state.name == Acrp.Controls.stateList.val(); });
                        var html = '<option value="" disabled selected>County</option>';
                        if (state && state.counties) {
                            state.counties.forEach(function (county) { return html += "<option value=\"" + county.name + "\">" + county.name + "</option>"; });
                            Acrp.Controls.countyList.html(html);
                            Acrp.Controls.countyList.val(Acrp.Cookies.county || "");
                        }
                        else {
                            Acrp.Controls.countyList.html('<option value="" disabled selected>All Counties</option>');
                            Acrp.Cookies.county = "";
                        }
                    }
                }
                function createRemediations(items, surfaceMaterial) {
                    items.forEach(function (item) {
                        var remediation = new Acrp.Remediation();
                        remediation.surfaceMaterial = surfaceMaterial;
                        remediation.climate = new Acrp.Climate();
                        remediation.climate.condition = item.wetDry.toLowerCase() == "wet" ? Acrp.ClimateCondition.Wet : Acrp.ClimateCondition.Dry;
                        remediation.climate.temperature = item.freezeNoFreeze.toLowerCase() == "freeze" ? Acrp.ClimateTemperature.Freeze : Acrp.ClimateTemperature.NoFreeze;
                        remediation.airportClass = Acrp.AirportClass[item.category];
                        if (item.amount)
                            remediation.distressQuantity = item.amount.replaceAll(",", "").replaceAll("-", "").trim();
                        remediation.distressDescription = item.distressDesc;
                        if (item.severity) {
                            switch (item.severity.left(1)) {
                                case "H":
                                    remediation.distressSeverity = Acrp.Severity.High;
                                    break;
                                case "L":
                                    remediation.distressSeverity = Acrp.Severity.Low;
                                    break;
                                case "M":
                                    remediation.distressSeverity = Acrp.Severity.Medium;
                                    break;
                                default:
                                    remediation.distressSeverity = Acrp.Severity.Unspecified;
                                    break;
                            }
                        }
                        else
                            remediation.distressSeverity = Acrp.Severity.Unspecified;
                        var distressType = item.distressType.replaceAll(",", "").replaceAll("-", "").trim();
                        if (distressType.length > 0)
                            remediation.distressType = distressType;
                        remediation.acceptableTreatment = item.treatment.accept;
                        remediation.bestTreatment = item.treatment.best;
                        App.remediations.add(remediation);
                    });
                }
            };
            App.downloadString = function (url, callback) {
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "text",
                    success: callback,
                    error: function (error) { alert(("Error downloading \"" + url + "\": ") + JSON.stringify(error)); }
                });
            };
            App.downloadJson = function (url, callback) {
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    success: callback,
                    error: function (error) { alert(("Error downloading \"" + url + "\": ") + JSON.stringify(error)); }
                });
            };
            App.addScenario = function (afterId) {
                if (afterId === void 0) { afterId = null; }
                var scenario = new Acrp.Scenario(App.nextScenarioId++, App.remediations);
                App.scenarois.add(scenario);
                var scenaroiList = $('#scenarioList');
                var scenarioListItemPrototype = $("#scenarioListItem_id_");
                var html = scenarioListItemPrototype[0].outerHTML.replaceAll("display: none;").replaceAll("_id_", scenario.id.toString());
                if (afterId == null)
                    $(html).insertAfter(scenarioListItemPrototype);
                else
                    $(html).insertAfter("#scenarioListItem" + afterId);
                scenario.climate = App.getSelectedClimate();
                scenario.airportClass = parseInt(Acrp.Controls.airportClassList.val());
                scenario.surfaceMaterial = parseInt(Acrp.Controls.surfaceMaterialList.val());
                App.showScenarioTitle(scenario);
                App.hookupScenarioSelectBoxes(scenario);
                App.updateScenarioSelectBoxes(scenario);
                return scenario;
            };
            App.hookupStickySelectBoxes = function () {
                onStickySelectBoxChange(); //Initialize the prototypeScenario
                Acrp.Controls.airportClassList.change(onStickySelectBoxChange);
                Acrp.Controls.surfaceMaterialList.change(onStickySelectBoxChange);
                Acrp.Controls.stateList.change(onStickySelectBoxChange);
                Acrp.Controls.countyList.change(onStickySelectBoxChange);
                function onStickySelectBoxChange() {
                    var surfaceMaterial = parseInt(Acrp.Controls.surfaceMaterialList.val());
                    var airportClass = parseInt(Acrp.Controls.airportClassList.val());
                    var selectedClimate = App.getSelectedClimate();
                    App.scenarois.forEach(function (scenario) {
                        scenario.climate = selectedClimate;
                        scenario.surfaceMaterial = surfaceMaterial;
                        scenario.airportClass = airportClass;
                        App.updateRemediations(scenario);
                        App.updateScenarioSelectBoxes(scenario);
                    });
                }
            };
            App.getSelectedClimate = function () {
                var value;
                var state = App.states.firstOrDefault(function (s) { return s.name == Acrp.Controls.stateList.val(); });
                if (state) {
                    value = state.climate;
                    if (!value) {
                        var countyName = Acrp.Controls.countyList.val();
                        if (countyName) {
                            var county = state.counties.firstOrDefault(function (c) { return c.name == Acrp.Controls.countyList.val(); });
                            value = county.climate;
                        }
                    }
                }
                return value;
            };
            App.updateScenarioSelectBoxes = function (scenario) {
                var remediations = App.remediations.where(function (r) { return r.climate.equals(scenario.climate) && r.airportClass == scenario.airportClass && r.surfaceMaterial == scenario.surfaceMaterial; });
                var distressTypeList = Acrp.Controls.distressTypeList(scenario.id);
                var selectedDistressType = distressTypeList.val();
                var distressTypeSelectBoxOptionsString = "<option></option>";
                var distressTypes = remediations.select(function (r) { return r.distressType; }).distinct();
                distressTypes.forEach(function (dt) { return distressTypeSelectBoxOptionsString += "<option value=\"" + dt + "\">" + dt + "</option>"; });
                distressTypeList.html(distressTypeSelectBoxOptionsString);
                distressTypeList.val(selectedDistressType);
                if (selectedDistressType && selectedDistressType.length > 0)
                    remediations.removeWhere(function (r) { return r.distressType != selectedDistressType; });
                var distressQuantityList = Acrp.Controls.distressQuantityList(scenario.id);
                var selectedDistressQuantity = distressQuantityList.val();
                var distressQuantitySelectBoxOptionsString = "<option></option>";
                var distressQuantities = remediations.select(function (r) { return r.distressQuantity; }).distinct();
                distressQuantities.forEach(function (dt) { return distressQuantitySelectBoxOptionsString += "<option value=\"" + dt + "\">" + dt + "</option>"; });
                distressQuantityList.html(distressQuantitySelectBoxOptionsString);
                distressQuantityList.val(selectedDistressQuantity);
            };
            App.hookupScenarioSelectBoxes = function (scenario) {
                Acrp.Controls.distressTypeList(scenario.id).change(updateScenario);
                Acrp.Controls.distressQuantityList(scenario.id).change(updateScenario);
                Acrp.Controls.distressSeverityList(scenario.id).change(updateScenario);
                updateScenario();
                function updateScenario() {
                    scenario.distressQuantity = Acrp.Controls.distressQuantityList(scenario.id).val();
                    scenario.distressType = Acrp.Controls.distressTypeList(scenario.id).val();
                    scenario.distressSeverity = parseInt(Acrp.Controls.distressSeverityList(scenario.id).val());
                    App.updateRemediations(scenario);
                    App.updateScenarioSelectBoxes(scenario);
                }
            };
            App.updateRemediations = function (scenario) {
                scenario.updateRemediations();
                var html;
                switch (scenario.remediations.length) {
                    case 0:
                        html = "There are no recommendations for the specified criteria.";
                        break;
                    case 1:
                        var remediation = scenario.remediations.firstOrDefault();
                        html = "<strong>Recommeded Treatment: </strong>" + remediation.bestTreatment + "</br><strong>Acceptable Treatment: </strong>" + remediation.acceptableTreatment;
                        break;
                    default:
                        html = scenario.remediations.length + " possible recommendations.  Please continue filtering";
                        break;
                }
                $("#remediations" + scenario.id).html(html);
            };
            App.removeScenario = function (id) {
                App.scenarois.removeWhere(function (scenario) { return scenario.id == id; });
                $("#scenarioListItem" + id).remove();
                if (App.scenarois.count == 0)
                    App.addScenario();
            };
            App.editScenarioTitle = function (id) {
                var scenario = App.scenarois.firstOrDefault(function (scenario) { return scenario.id == id; });
                scenario.title = prompt("Specify a title for this scenario.", scenario.title ? scenario.title : "");
                App.showScenarioTitle(scenario);
            };
            App.showScenarioTitle = function (scenario) {
                var titleElement = $("#scenarioTitle" + scenario.id);
                titleElement.text(scenario.title ? scenario.title : "");
                if (scenario.title && scenario.title.length > 0)
                    titleElement.show();
                else
                    titleElement.hide();
            };
            App.downloadPdf = function () {
            };
            App.remediations = new TTI.List();
            App.scenarois = new TTI.List();
            App.nextScenarioId = 0;
            return App;
        })();
        Acrp.App = App;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var Climate = (function () {
            function Climate() {
            }
            Climate.prototype.equals = function (value) {
                if (!value)
                    return false;
                else {
                    var conditiionsAreEqual = (value.condition == this.condition) || (this.condition == Acrp.ClimateCondition.WetAndDry) || (value.condition == Acrp.ClimateCondition.WetAndDry);
                    var temperaturesAreEqual = (value.temperature == this.temperature) || (value.temperature == Acrp.ClimateTemperature.FreezeAndNoFreeze) || (this.temperature == Acrp.ClimateTemperature.FreezeAndNoFreeze);
                    return conditiionsAreEqual && temperaturesAreEqual;
                }
            };
            return Climate;
        })();
        Acrp.Climate = Climate;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        (function (Severity) {
            Severity[Severity["Unspecified"] = 0] = "Unspecified";
            Severity[Severity["Low"] = 1] = "Low";
            Severity[Severity["Medium"] = 2] = "Medium";
            Severity[Severity["High"] = 3] = "High";
        })(Acrp.Severity || (Acrp.Severity = {}));
        var Severity = Acrp.Severity;
        (function (AirportClass) {
            AirportClass[AirportClass["Unspecified"] = 0] = "Unspecified";
            AirportClass[AirportClass["Basic"] = 1] = "Basic";
            AirportClass[AirportClass["Local"] = 2] = "Local";
            AirportClass[AirportClass["Regional"] = 3] = "Regional";
            AirportClass[AirportClass["National"] = 4] = "National";
        })(Acrp.AirportClass || (Acrp.AirportClass = {}));
        var AirportClass = Acrp.AirportClass;
        (function (SurfaceMaterial) {
            SurfaceMaterial[SurfaceMaterial["Unspecified"] = 0] = "Unspecified";
            SurfaceMaterial[SurfaceMaterial["Concrete"] = 1] = "Concrete";
            SurfaceMaterial[SurfaceMaterial["Asphalt"] = 2] = "Asphalt";
        })(Acrp.SurfaceMaterial || (Acrp.SurfaceMaterial = {}));
        var SurfaceMaterial = Acrp.SurfaceMaterial;
        (function (ClimateCondition) {
            ClimateCondition[ClimateCondition["Unspecified"] = 0] = "Unspecified";
            ClimateCondition[ClimateCondition["Dry"] = 1] = "Dry";
            ClimateCondition[ClimateCondition["Wet"] = 2] = "Wet";
            ClimateCondition[ClimateCondition["WetAndDry"] = 4] = "WetAndDry";
        })(Acrp.ClimateCondition || (Acrp.ClimateCondition = {}));
        var ClimateCondition = Acrp.ClimateCondition;
        (function (ClimateTemperature) {
            ClimateTemperature[ClimateTemperature["Unspecified"] = 0] = "Unspecified";
            ClimateTemperature[ClimateTemperature["Freeze"] = 1] = "Freeze";
            ClimateTemperature[ClimateTemperature["NoFreeze"] = 2] = "NoFreeze";
            ClimateTemperature[ClimateTemperature["FreezeAndNoFreeze"] = 4] = "FreezeAndNoFreeze";
        })(Acrp.ClimateTemperature || (Acrp.ClimateTemperature = {}));
        var ClimateTemperature = Acrp.ClimateTemperature;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var Controls = (function () {
            function Controls() {
            }
            Object.defineProperty(Controls, "airportClassList", {
                get: function () { return $("#airportClassList"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Controls, "surfaceMaterialList", {
                get: function () { return $("#surfaceMaterialList"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Controls, "stateList", {
                get: function () { return $("#stateList"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Controls, "countyList", {
                get: function () { return $("#countyList"); },
                enumerable: true,
                configurable: true
            });
            Controls.distressTypeList = function (scenarioId) { return $("#distressTypeList" + scenarioId); };
            Controls.distressQuantityList = function (scenarioId) { return $("#distressQuantityList" + scenarioId); };
            Controls.distressSeverityList = function (scenarioId) { return $("#distressSeverityList" + scenarioId); };
            return Controls;
        })();
        Acrp.Controls = Controls;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var Cookies = (function () {
            function Cookies() {
            }
            Object.defineProperty(Cookies, "state", {
                get: function () { return TTI.Cookies.get("State"); },
                set: function (value) { TTI.Cookies.set("State", value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Cookies, "county", {
                get: function () { return TTI.Cookies.get("County"); },
                set: function (value) { TTI.Cookies.set("County", value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Cookies, "surfaceMaterial", {
                get: function () {
                    var value;
                    var valueString = TTI.Cookies.get("SurfaceMaterial");
                    if (valueString)
                        value = parseInt(valueString);
                    return value;
                },
                set: function (value) { TTI.Cookies.set("SurfaceMaterial", value.toString()); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Cookies, "airportClass", {
                get: function () {
                    var value;
                    var valueString = TTI.Cookies.get("AirportClass");
                    if (valueString)
                        value = parseInt(valueString);
                    return value;
                },
                set: function (value) { TTI.Cookies.set("AirportClass", value.toString()); },
                enumerable: true,
                configurable: true
            });
            return Cookies;
        })();
        Acrp.Cookies = Cookies;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var County = (function () {
            function County() {
            }
            County.prototype.getCollectionKey = function () { return this.name; };
            return County;
        })();
        Acrp.County = County;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var Remediation = (function () {
            function Remediation() {
            }
            return Remediation;
        })();
        Acrp.Remediation = Remediation;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var State = (function () {
            function State() {
            }
            State.prototype.getCollectionKey = function () {
                return this.name;
            };
            return State;
        })();
        Acrp.State = State;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
var TTI;
(function (TTI) {
    var Acrp;
    (function (Acrp) {
        var States = (function (_super) {
            __extends(States, _super);
            function States(dataFileUrl, initializationCompleteCallback) {
                _super.call(this);
                var that = this;
                States.downloadString(dataFileUrl, function (data) {
                    parseClimaticZones(data);
                    if (initializationCompleteCallback)
                        initializationCompleteCallback();
                });
                function parseClimaticZones(data) {
                    var lines = data.split("\r\n");
                    var previousStateName;
                    for (var i = 1; i < lines.where(function (l) { return l.length > 0; }).length; i++) {
                        var parts = lines[i].split(",");
                        var stateName = parts[0];
                        var state = that.get(stateName);
                        if (!state) {
                            if (stateName.length > 0) {
                                state = new Acrp.State();
                                state.name = stateName;
                                that.add(state);
                                previousStateName = stateName;
                            }
                            else
                                state = that.get(previousStateName);
                        }
                        var climate = new Acrp.Climate();
                        climate.condition = Acrp.ClimateCondition[parts[3]];
                        climate.temperature = Acrp.ClimateTemperature[parts[4]];
                        if (parts[5]) {
                            var condition = Acrp.ClimateCondition[parts[5]];
                            if (condition != climate.condition)
                                climate.condition = Acrp.ClimateCondition.WetAndDry;
                        }
                        if (parts[6]) {
                            var temperature = Acrp.ClimateTemperature[parts[6]];
                            if (temperature != climate.temperature)
                                climate.temperature = Acrp.ClimateTemperature.FreezeAndNoFreeze;
                        }
                        var countyName = parts[2];
                        if (countyName.length > 0) {
                            if (!state.counties)
                                state.counties = new TTI.Collection();
                            var county = new Acrp.County();
                            county.name = countyName;
                            county.climate = climate;
                            state.counties.add(county);
                        }
                        else
                            state.climate = climate;
                    }
                }
            }
            States.prototype.getClimate = function (stateName, countyName) {
                var climate;
                var state = this.get(stateName);
                if (state) {
                    if (state.counties && countyName) {
                        var county = state.counties.get(countyName);
                        if (county)
                            climate = county.climate;
                    }
                    else
                        climate = state.climate;
                }
                return climate;
            };
            States.downloadString = function (url, callback) {
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "text",
                    success: callback,
                    error: function (error) { alert(("Error downloading \"" + url + "\": ") + JSON.stringify(error)); }
                });
            };
            return States;
        })(TTI.Collection);
        Acrp.States = States;
    })(Acrp = TTI.Acrp || (TTI.Acrp = {}));
})(TTI || (TTI = {}));
//# sourceMappingURL=TTI.js.map