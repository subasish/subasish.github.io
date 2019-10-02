TTI.DistressCategory = function(spec) {
  var self = TTI.PubSub({});
  self.spec = spec;
  
  self.getDistresses = function() {
    var specs = dataStore.data.select(function(o){
      return o.dataType == 'distress' && o.distressCategory == spec.id;
    });
    var result = specs.map(function(o){
      return TTI.Distress(o);
    });
    return result;
  };
  
  
  self.parent = function() {
    var parentSpec = dataStore.data.detect(function(o){
      return o.dataType == 'distressCategory' && spec.parent && spec.parent == o.id;
    });
    if (!parentSpec) { return false; }
    return TTI.DistressCategory(parentSpec);
  };
  
  self.children = function() {
    var specs = dataStore.data.select(function(o){
      return o.dataType == 'distressCategory' && o.parent == spec.id;
    });
    var result = specs.map(function(o){
      return TTI.DistressCategory(o);
    });
    return result;
  }; 
  
  
  self.imageScore = function(o) {
    ///console.log('imageScore o',o);
    
    var comment = o.spec.distress.spec.comment;
    if (comment.match(/low/i)) {  return -1; }
    if (comment.match(/medi/i)) {  return 0; }
    if (comment.match(/hig/i)) {  return 1; }  
    return 0;
  };
  
  self.getImages = function(hash) {
    var result = [];

    if (!hash) {
      hash = {};
    }
    
    var children = self.children();

    if (children.length == 0) {
      self.getDistresses().each(function(distress){
        distress.getImages().each(function(image){
        
          //console.log('image??####',image);
        
        
          if (!hash[image.spec.filename]) {
            hash[image.spec.filename] = true;
            result.push(image);
          }
        });
      });
      
      
      var sorted = result.sort(TTI.sorter(self.imageScore));
      
      return sorted;
    }

    result = [];
    children.each(function(child){
      var images = child.getImages(hash);
      images.each(function(image){
        result.push(image);
      });
    });
    
    return result;
  };
  return self;
};