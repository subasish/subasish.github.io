TTI.Scenario = function(spec) {
  var self = TTI.PubSub({});
  self.spec = spec;
  
  
  self.bestTreatmentUnitCost = function() {
    var result = TTI.lookupUnitCost(spec.surfaceType,spec.distressDesc,spec.treatment.best);
    return result;
  };
  self.acceptTreatmentUnitCost = function() {
    var result = TTI.lookupUnitCost(spec.surfaceType,spec.distressDesc,spec.treatment.accept);
    return result;
  };

  self.bestTreatmentBenefit = function() {
    var result = TTI.lookupBenefit(spec.surfaceType,spec.distressDesc,spec.treatment.best);
    return result;
  };
  self.acceptTreatmentBenefit = function() {
    var result = TTI.lookupBenefit(spec.surfaceType,spec.distressDesc,spec.treatment.accept);
    return result;
  };
  
  
  self.getDistress = function() {
    var resultSpec = dataStore.data.detect(function(o){
      return o.id == spec.distress;
    });
    return TTI.Distress(resultSpec);
  };
  
  
  self.distressTags = function() {
    var result = TTI.tagify(spec.distressDesc + ' ' + spec.severity + ' ' + spec.amount);
    return result;
  };
  
  self.bestTreatmentTags = function() {
    var result = TTI.tagify(spec.treatment.best);
    return result;
  };
  
  self.acceptTreatmentTags = function() {
    var result = TTI.tagify(spec.treatment.accept);
    return result;
  };


  self.distressImages = function() {
    var distress = self.getDistress();
    return distress.getImages();
  };

  self.WASdistressImages = function() {
    var distressTags = self.distressTags();
    return TTI.getImagesForTags(distressTags,TTI.distressImages);
  };



  /***
  self.getPCICurveImages = function(filename) {
    var them = [];
    if (filename == 'Do Nothing') { return them; }
    
    var image = TTI.PCICurveImage({
      filename: filename,
    });
    them.push(image);
    return them;
  };

  self.bestPCICurveImages = function() {
    return self.getPCICurveImages(spec.treatment.bestPCICurveImage);
  };

  self.acceptPCICurveImages = function() {
    return self.getPCICurveImages(spec.treatment.acceptPCICurveImage);
  };
  ******/
  
  return self;
};
