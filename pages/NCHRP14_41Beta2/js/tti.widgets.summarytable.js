TTI.Widgets.SummaryCommon = function(spec) {

  var self = TTI.PubSub({});
  self.spec = spec;


  self.rowDataForHit = function(hit) {
    var rowData = [
      {
        label: 'Recommended',
        treatmentSlug: 'best',
        treatmentDesc: hit.spec.treatment.best,
      },{
        label: 'Acceptable',
        treatmentSlug: 'accept',
        treatmentDesc: hit.spec.treatment.accept,
      }
    ];
    return rowData;      
  };


  self.chooseImageForHitRow = function(hit,row) {
    var images = TTI.getPCICurveImagesForTags(
      hit.spec.surfaceType,
      TTI.tagify(hit.spec.distressDesc),
      TTI.tagify(row.treatmentDesc),
      TTI.pciCurveImages
    );
    var result = images.pop();
    return result;
  };


  self.getPCICurveImagesForCandidates = function(candidates){
    var result = [];
    
    var done = {};
    
    
    candidates.forEach(function(hit){
      var rows = self.rowDataForHit(hit);
      rows.forEach(function(row) {
        var image = self.chooseImageForHitRow(hit,row);
        if (image && ! done[image.hash]) {
          done[image.hash] = true;
          result.push(image);
        }
      });
    });
    return result;  
  };

  return self;

};



TTI.Widgets.SummaryTable = function(spec) {
  var self = TTI.Widgets.SummaryCommon(spec);
  var candidates = [];
  var wrap = false;
  
  
  self.getPCICurveImages = function() {
    return self.getPCICurveImagesForCandidates(candidates);
  };
  

  self.refresh = function(){
    wrap.empty();
    candidates.forEach(function(o,index){
      self.renderHit(o,index);
    });
  };
      
  self.update = function(them) {
    candidates = them;
    self.refresh();
  };
  
  
  self.renderOn = function(o) {
    wrap = o;
    self.refresh();
  };






  self.getHeaderRow = function() {
  

  }

      self.showBenefitLightbox = function() {
      
        campfire.publish('show-lightbox',function(wrap){
          wrap.append(DOM.h4('Relative Benefit and Benefit/Cost'));
          wrap.append(TTI.benefitHTML);
        });
      };




      self.renderHit = function(hit,index) {



        var h5 = DOM.h5(hit.spec.distressDesc);
        wrap.append(h5);

        var responsiveDiv = DOM.div().addClass('table-responsive');
        wrap.append(responsiveDiv);

        
        var table = DOM.table().addClass('table table-bordered table-condensed');

        var thead = DOM.thead();
        var headRow = DOM.tr();
        thead.append(headRow);

        var thCost = DOM.th('Cost Basis').addClass('th-inverse th-cost');
        var thRelativeBenefit = DOM.th('Relative Benefit ').addClass('th-inverse th-relative-benefit');
        
        
        
        var thBenefitCost = DOM.th('Benefit/Cost ').addClass('th-inverse th-benefit-cost');


        headRow.append(DOM.th('&nbsp;').addClass('th-inverse'));      
        headRow.append(DOM.th('Treatment').addClass('th-inverse'));
        
        if (!spec.final) {
          headRow.append(thCost);
          
          var infoRelativeBenefit = DOM.i().addClass('fa fa-info-circle');
          infoRelativeBenefit.click(self.showBenefitLightbox);



          var infoBenefitCost = DOM.i().addClass('fa fa-info-circle');
          infoBenefitCost.click(self.showBenefitLightbox);


          
          thRelativeBenefit.append(infoRelativeBenefit);
          thBenefitCost.append(infoBenefitCost);
          
          
          headRow.append(thRelativeBenefit);
          headRow.append(thBenefitCost);
          //headRow.append(DOM.th('Relative Benefit').addClass('th-inverse'));
          ///headRow.append(DOM.th('Benefit/Cost <br /> (higher = better)').addClass('th-inverse'));
        }
        
        
        table.append(thead);
        
        
        
        
        
        var tbody = DOM.tbody();
        table.append(tbody);
        responsiveDiv.append(table);



        ///--- DEFAULT VALUES ---
        thCost.text('Cost Basis'); //default

        var rowData = self.rowDataForHit(hit);


        rowData.each(function(row){


          var pciCurveImage = false;

          var tmpRow = DOM.tr();
          tmpRow.append(DOM.th(row.label));
          var descCell = DOM.td();

          descCell.append(row.treatmentDesc);

          var chosenImage = self.chooseImageForHitRow(hit,row);
          
          if (chosenImage) {
            console.log('push!!!');
            pciCurveImage = TTI.assemblePCICurveImage(chosenImage,row.treatmentDesc);
            pciCurveImage.attr('title',row.treatmentDesc);
            pciCurveImage.click(function(){
              self.publish('image-clicked',{ url: chosenImage.url(), title: row.treatmentDesc });
            });
            descCell.append(pciCurveImage);
          }
          tmpRow.append(descCell);


          var costCell = DOM.td();////.addClass('value-cell');
          var costInput = DOM.input().attr('type','text').addClass('form-control cost-input');
          costInput.keypress(TTI.cellValidator);
          
          
          var costPerUnitLabel = DOM.span();

          var benefitCell = DOM.td().addClass('value-cell');
          var benefitCostCell = DOM.td().addClass('value-cell');


          costCell.append('$ ');
          costCell.append(costInput);
          costCell.append(costPerUnitLabel);


          if (!spec.final) {
            tmpRow.append(costCell);
            tmpRow.append(benefitCell);
            tmpRow.append(benefitCostCell);
          }

          tbody.append(tmpRow);


          //cost object
          var cost = TTI.lookupCost(hit.spec.surfaceType,hit.spec.distressDesc,row.treatmentDesc);
          var costBasis = cost.unitCost;
          var origCostBasis = costBasis;
          var scaleFactor = 1.0;

          var ballpark = false;

          costInput.val(costBasis);

          costPerUnitLabel.html(TTI.formatCostBasis(cost));

          //benefit
          var benefit = TTI.lookupBenefit(hit.spec.surfaceType,hit.spec.distressDesc,row.treatmentDesc);
          benefitCell.text(Math.round(benefit.benefit));

          //benefit/cost
          var denomCost = costBasis * cost.unit;
          var benefitCost = benefit.benefit / denomCost;
          
          benefitCostCell.text(accounting.toFixed(benefitCost,2));
        
          costInput.change(function(){
            costBasis = parseFloat(this.value);
            scaleFactor = costBasis / origCostBasis;
            
            //console.log('scaleFactor',scaleFactor);
            ///console.log('costBasis',costBasis);
            self.publish('recalc');
          });
          
          var length = 0;
          var width = 0;
          
          var TCO = 0;


          hit.spec.treatment[row.treatmentSlug + 'CostBasis'] = costBasis;
          hit.spec.treatment[row.treatmentSlug + 'TCO'] = TCO;
          hit.spec.treatment[row.treatmentSlug + 'Benefit'] = Math.round(benefit.benefit);
          hit.spec.treatment[row.treatmentSlug + 'BenefitCost'] = benefitCost;


          self.subscribe('recalc',function(o){
            
            if (o && o.length && o.width) {
              ballpark = true;
              length = o.length;
              width = o.width;
            }

            denomCost = costBasis * cost.unit;
            benefitCost = benefit.benefit / denomCost;
            benefitCostCell.text(accounting.toFixed(benefitCost,2));

            if (ballpark) {
              //////////thCost.html('Ballpark<br />Cost Estimate');
              TCO = TTI.estimateCost(length,width,cost,scaleFactor);
              console.log('TCO',TCO);
            }
            
            //save off some things for reporting in the PDF //FIXME
            hit.spec.treatment[row.treatmentSlug + 'CostBasis'] = costBasis;
            hit.spec.treatment[row.treatmentSlug + 'TCO'] = TCO;
            hit.spec.treatment[row.treatmentSlug + 'Benefit'] = Math.round(benefit.benefit);
            hit.spec.treatment[row.treatmentSlug + 'BenefitCost'] = benefitCost;
            
            if (ballpark) {
              self.publish('ballpark-update',candidates);
            }
            
            
            /***
            var myGuru = TTI.gurus.detect(function(guru){
              return guru.hit.hash == hit.hash;
            
            });
            myGuru.hit = hit;
            ///console.log('my guru',myGuru);
            ***/
          });

        });

      };



  return self;
};



TTI.Widgets.FinalSummaryTable = function(spec) {
  var self = TTI.Widgets.SummaryCommon(spec);
  var candidates = [];
  var wrap = false;
  

  ////var waiter = TTI.Widgets.Procrastinator({ timeout: 300 });




      self.refresh = function(){
        wrap.empty();
        candidates.forEach(function(o,index){
          self.renderHit(o,index);
        });
      };
      
      self.update = function(them) {
        candidates = them;
        self.refresh();
      };
      
      
      self.renderOn = function(o) {
        wrap = o;
        self.refresh();
      };


      self.renderHit = function(hit,index) {

        var h5 = DOM.h5(hit.spec.distressDesc);
        wrap.append(h5);

        var responsiveDiv = DOM.div().addClass('table-responsive');
        wrap.append(responsiveDiv);

        
        var table = DOM.table().addClass('table table-bordered table-condensed');

        var thead = DOM.thead();
        var headRow = DOM.tr();
        thead.append(headRow);

        ////var thCost = DOM.th('Cost Basis').addClass('th-inverse th-cost');

        headRow.append(DOM.th('Treatments').addClass('th-inverse').attr('colspan',2));
        
        table.append(thead);
        
        
        
        var tbody = DOM.tbody();
        table.append(tbody);
        responsiveDiv.append(table);


        ///--- DEFAULT VALUES ---
        /////thCost.text('Cost Basis'); //default

        var rowData = self.rowDataForHit(hit);

        rowData.each(function(row){


          var pciCurveImage = false;

          var tmpRow = DOM.tr();
          tmpRow.append(DOM.th(row.label));
          var descCell = DOM.td();

          descCell.append(row.treatmentDesc);



          var chosenImage = self.chooseImageForHitRow(hit,row);
          if (chosenImage) {
            pciCurveImage = TTI.assemblePCICurveImage(chosenImage,row.treatmentDesc);
            pciCurveImage.attr('title',row.treatmentDesc);
            pciCurveImage.click(function(){
              self.publish('image-clicked',{ url: chosenImage.url(), title: row.treatmentDesc });
            });
            descCell.append(pciCurveImage);
          }
          tmpRow.append(descCell);


          var costCell = DOM.td();////.addClass('value-cell');
          var costInput = DOM.input().attr('type','text').addClass('form-control cost-input');
          var costPerUnitLabel = DOM.span();

          var benefitCell = DOM.td().addClass('value-cell');
          var benefitCostCell = DOM.td().addClass('value-cell');


          costCell.append('$ ');
          costCell.append(costInput);
          costCell.append(costPerUnitLabel);



          tbody.append(tmpRow);


          //cost object
          var cost = TTI.lookupCost(hit.spec.surfaceType,hit.spec.distressDesc,row.treatmentDesc);
          var costBasis = cost.unitCost;
          var origCostBasis = costBasis;
          var scaleFactor = 1.0;

          var ballpark = false;

          costInput.val(costBasis);

          costPerUnitLabel.html(TTI.formatCostBasis(cost));

          //benefit
          var benefit = TTI.lookupBenefit(hit.spec.surfaceType,hit.spec.distressDesc,row.treatmentDesc);
          benefitCell.text(Math.round(benefit.benefit));

          //benefit/cost
          var denomCost = costBasis * cost.unit;
          var benefitCost = benefit.benefit / denomCost;
          
          benefitCostCell.text(accounting.toFixed(benefitCost,2));
        
          costInput.change(function(){
            costBasis = parseFloat(this.value);
            scaleFactor = costBasis / origCostBasis;
            
            //console.log('scaleFactor',scaleFactor);
            ///console.log('costBasis',costBasis);
            self.publish('recalc');
          });
          
          var length = 0;
          var width = 0;
          
          var TCO = 0;


          hit.spec.treatment[row.treatmentSlug + 'CostBasis'] = costBasis;
          hit.spec.treatment[row.treatmentSlug + 'TCO'] = TCO;
          hit.spec.treatment[row.treatmentSlug + 'Benefit'] = Math.round(benefit.benefit);
          hit.spec.treatment[row.treatmentSlug + 'BenefitCost'] = benefitCost;


          self.subscribe('recalc',function(o){
            
            if (o && o.length && o.width) {
              ballpark = true;
              length = o.length;
              width = o.width;
            }

            denomCost = costBasis * cost.unit;
            benefitCost = benefit.benefit / denomCost;
            benefitCostCell.text(accounting.toFixed(benefitCost,2));

            if (ballpark) {
              //////////thCost.html('Ballpark<br />Cost Estimate');
              TCO = TTI.estimateCost(length,width,cost,scaleFactor);
              console.log('TCO',TCO);
            }
            
            //save off some things for reporting in the PDF //FIXME
            hit.spec.treatment[row.treatmentSlug + 'CostBasis'] = costBasis;
            hit.spec.treatment[row.treatmentSlug + 'TCO'] = TCO;
            hit.spec.treatment[row.treatmentSlug + 'Benefit'] = Math.round(benefit.benefit);
            hit.spec.treatment[row.treatmentSlug + 'BenefitCost'] = benefitCost;
            
            if (ballpark) {
              self.publish('ballpark-update',candidates);
            }
            
            
            /***
            var myGuru = TTI.gurus.detect(function(guru){
              return guru.hit.hash == hit.hash;
            
            });
            myGuru.hit = hit;
            ///console.log('my guru',myGuru);
            ***/
          });

        });

      };



  return self;
};
