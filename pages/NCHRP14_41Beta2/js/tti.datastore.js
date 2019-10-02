TTI.DataStore = function(spec) {
  var self = TTI.PubSub({});
  
  var data = spec.data;
  self.data = data;
  self.spec = spec;


  
  self.getAllDistresses = function() {
    var resultSpecs = data.select(function(o){
      if (o.dataType != 'distress') { return false; }
      return true;
    });

    var result = resultSpecs.map(function(o){
      return TTI.Distress(o);
    });
    return result;
  };
  
  self.getDistressesForSurfaceType = function(surfaceTypeDescription) {
    var st = data.detect(function(o){
      return o.dataType == 'surfaceType' && o.desc == surfaceTypeDescription;
    });
    var resultSpecs = data.select(function(o){
      if (o.dataType != 'distress') { return false; }
      if (o.surfaceType != st.id) { return false; }
      return true;
    });

    var result = resultSpecs.map(function(o){
      return TTI.Distress(o);
    });
    
    return result;
  };


  self.getAllDistressCategories = function() {
    var categorySpecs = data.select(function(o){
      return o.dataType == 'distressCategory'; 
    });
    var result = categorySpecs.map(function(o){
      return TTI.DistressCategory(o);
    });
    return result;
  };
  
  self.getDistressCategories = function(parent) {
    var st = data.detect(function(o){
      return o.dataType == 'surfaceType' && o.desc == TTI.sticky.surfaceType;
    });

    var categorySpecs = data.select(function(o){
      if (o.dataType != 'distressCategory') { return false; }
      if (o.surfaceType != st.id) { return false; }
      if (parent && o.parent != parent.spec.id) { return false; } //if we are asking for children of parent, reject non-children
      if (!parent && o.parent) { return false; }/// if we're not asking for children, reject children
      
      return true;
      ///return o.dataType == 'distressCategory' && o.surfaceType == st.id;
    });
    
    var result = categorySpecs.map(function(o){
      return TTI.DistressCategory(o);
    });
    return result;
  };


  return self;
};