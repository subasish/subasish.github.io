if (typeof TTI ==  "undefined") { var TTI = {}; }
TTI.Storage = function(prefix) {
  if (!prefix) { throw('configuration error: set TTI.Storage needs prefix'); 
    return false;
  };
  var self = {};
  self.setItem = function(k,v) {
    return localStorage.setItem(prefix + k,v);
  };
  self.getItem = function(k,cb) {
    var result = localStorage.getItem(prefix + k);
    if (cb && result) { cb(result); }
    return result;
  };
  
  self.removeItem = function(k) {
    return localStorage.removeItem(prefix + k);
  };
  
  
  self.clear = function() {
    localStorage.clear();
  }
  
  return self;
};