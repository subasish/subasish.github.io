TTI.Distress = function(spec) {
  var self = TTI.PubSub({});
  self.spec = spec;
  
  self.getSurfaceType = function() {
    var record = dataStore.data.detect(function(o){
      return o.dataType == 'surfaceType' && o.id == spec.surfaceType;
    });
    return record;
  };
  
  self.getCategory = function() {
    var record = dataStore.data.detect(function(o){
      return o.dataType == 'distressCategory' && o.id == spec.distressCategory;
    });
    return TTI.DistressCategory(record);
  };
  
  self.breadcrumbInner = function() {
    var names = [];
    names.push(spec.comment);
    var category = self.getCategory();
    while (category) {
      names.push(category.spec.desc);
      category = category.parent();
    };
    names.reverse();
    var result = names.join(' &raquo; ');
    return result;
  }
  
  

  self.getImages = function() {
    var record = dataStore.data.detect(function(o){
      return o.dataType == 'distressImage' && o.distress == spec.id;
    });
    
    var conjured = record.images.map(function(o){
    
      if (!o.match(/jpg|png$/i)) {
        o += '.jpg';
      }
    
    
      var spec = {
        filename: o,
        comment: record.comment,
        description: record.comment,
        distress: self
      };
      return TTI.DistressImage(spec); 
    });
    return conjured;
  };

  return self;  
};