if (typeof TTI ==  "undefined") { var TTI = {}; }

    TTI.Guru = function(spec) {
    
      var self = TTI.PubSub({});
      self.hit = false;

      var allChoicesByDim = { };
      var allChoicesArray = [];

      var selectedChoiceByDim = {};

      //init to false, followed by anything sticky
      orderedDimensions.each(function(od){
        var dimension = od.property;
        selectedChoiceByDim[dimension] = false;
        
        if (TTI.sticky[dimension]) {
          selectedChoiceByDim[dimension] = TTI.sticky[dimension];
        }
      });

      
      ///var ul = DOM.ul().addClass('hits');
      
      var moreInfo = DOM.a('More information on this distress').addClass('more-info');
      moreInfo.attr('href','distresses.htm').attr('target','_blank');

      var hitCount = DOM.div().addClass('hit-count noprint');


      var categoryWrap = DOM.div().addClass('category-wrap col-md-3');
      var distressesWrap = DOM.div().addClass('distresses col-md-5');
      var thumbs = DOM.div().addClass('thumbs col-md-4 photobox');

      self.refresh = function() {
        
        var hits = TTI.getStickyScenarios();
        var keys = Object.keys(selectedChoiceByDim);
        keys.each(function(dimension){
          hits = hits.select(function(hit){
            var selected = selectedChoiceByDim[dimension];
            if (!selected) { return true; }          
            return hit.spec[dimension] == selected;
          });
        });


        ///console.log('hits',hits.length,hits);


        if (hits.length == 0) {
          self.hit = false;
          self.publish('zero-hits');
        }
        else if (hits.length == 1) {
          hitCount.text(hits.length + ' match');
          self.hit = hits[0];
          self.publish('single-hit',self.hit);
        }
        else {
          self.hit = false;
          self.publish('multiple-hits');
        }
      };
      
      
      self.choiceItemsForDimension = function(dimension,sample) {
        ///console.log('sample',sample);

          var choices = sample.map(function(o){ 
            return o.spec[dimension]; 
          });
          var uniq = choices.unique();
          var choiceItems = uniq.map(function(o){ return { label: o, object: o }; });
          
          var filtered = choiceItems.reject(function(o){  return o.object == false; });
          filtered.unshift({ label: '-- Choose one --', object: false });
          return filtered;
      }
      
      
      self.renderWizardOn = function(wrap,sample) {
        wrap.empty();
        
        wrap.append(DOM.h5('<strong>' + spec.position + '.1</strong> Identify a Distress').addClass('noprint'));
        var parents = dataStore.getDistressCategories();
        var ul = DOM.ul().addClass('noprint');
        parents.each(function(parent){

          var li = DOM.li().addClass('category parent-category');
          
          
          
          
          li.append(DOM.span(parent.spec.desc).addClass('desc'));
          var slug = TTI.slugify(parent.spec.desc);
          li.click(function(e){ ///PARENT CLICK
            e.stopPropagation();
            /////console.log('PARENT!!!!!',parent.spec.desc);
            selectedChoiceByDim.distress = false;
            self.refresh();



            var tags = TTI.tagify(parent.spec.desc);
            var candidates = parent.getImages();///////[];///////TTI.getImagesForTags(tags,TTI.distressImages);
            self.updateThumbnails(candidates);    
          });


          var children = dataStore.getDistressCategories(parent);
          var childUL = DOM.ul().addClass('noprint');
          children.each(function(childCat){
          
            ///////console.log('childCat',childCat);
            ////console.log('distresses',childCat.getDistresses());

          
          
            var st = dataStore.data.detect(function(o){
              return o.dataType == 'surfaceType' && o.id == childCat.spec.surfaceType;
            });
          
            var li = DOM.li().addClass('category child-category');  
            li.append(childCat.spec.desc);
            var slug = TTI.slugify(st.desc + '-' + parent.spec.desc + '-' + childCat.spec.desc);

            var btnHelp = DOM.i().addClass('fa fa-info-circle display-none');
            
            li.hover(function(){
              btnHelp.removeClass('display-none');
            },function(){
              btnHelp.addClass('display-none');
            });
            
            
            btnHelp.click(function(){
                jQuery.ajax({
                  type: 'GET',
                  url: 'data/help.' + slug + '.txt', 
                  success: function(msg) {
                    self.publish('show-lightbox',function(wrap){
                      wrap.append(DOM.h4(parent.spec.desc + ' &raquo; ' + childCat.spec.desc));
                      wrap.append(DOM.p(msg).addClass('help-text'));
                    });
                  }
                });
              });
            
            
            
            
            
            li.append('&nbsp;');
            li.append(btnHelp);

            li.click(function(e){ // child click
              e.stopPropagation();

              selectedChoiceByDim.distress = false;
              self.refresh();

            
              
              wrap.find('li.selected').removeClass('selected');
              li.addClass('selected');
            
              var tags = TTI.tagify(childCat.spec.desc);
              
              
              
              var candidates = childCat.getImages();/////[];//TTI.getImagesForTags(tags,TTI.distressImages);
              self.updateThumbnails(candidates);    
            
              
              
              
              var distresses = dataStore.getDistressesForSurfaceType(TTI.sticky.surfaceType).select(function(o){
                return o.spec.distressCategory == childCat.spec.id;
              
              
              });
              
              
              

              distressesWrap.empty(); 
              distressesWrap.append(DOM.h5('<strong>' + spec.position + '.2</strong> Select an Amount & Severity').addClass('noprint'));

              var distressUL = DOM.ul();
              distresses.each(function(distress){
                var li = DOM.li(distress.spec.comment).addClass('distress');
                
                var btnHelp = DOM.i().addClass('fa fa-info-circle display-none');
            
                li.hover(function(){
                  btnHelp.removeClass('display-none');
                },function(){
                  btnHelp.addClass('display-none');
                });
                
                btnHelp.click(function(){
                  self.publish('show-lightbox',function(wrap){
                    wrap.append(DOM.h4(distress.spec.comment));
                    wrap.append(DOM.p(distress.spec.distressDesc).addClass('help-text'));
                  });
                });
                
                
                
    
                li.append('&nbsp;');
                li.append(btnHelp);

                
                
                li.click(function(e){
                  e.stopPropagation();
                  
                  li.siblings().removeClass('selected');
                  li.addClass('selected');
                  
                  
                  //////TTI.sticky.distress = distress.id;
                  selectedChoiceByDim.distress = distress.spec.id;
                  ///console.log('****distress**',distress.spec.id);
                  self.refresh();
                  
                  var tags = TTI.tagify(distress.spec.comment);
                  
                  var candidates = distress.getImages();   ///TTI.getImagesForTags(tags,TTI.distressImages);
                  self.updateThumbnails(candidates);    

                });
                distressUL.append(li);
              });
              distressesWrap.append(distressUL);
            });
            
            
            childUL.append(li);
          });
          li.append(childUL);
          ul.append(li);
        });
        wrap.append(ul);
        ////console.log('categories',categories,dataStore);
      };
      
      self.renderControlsOn = function(wrap,sample) {
        var controls = DOM.ul().addClass('controls');
        orderedDimensions.forEach(function(od,i){
          var dimension = od.property;
          
          /////var isSticky = od.sticky;
          
          var choiceItems = self.choiceItemsForDimension(dimension,sample);
          var dropdown = DOM.select();
          choiceItems.each(function(choice){
            if (!choice.label || choice.label.length == 0) { return false; }
            ///console.log('>>>>' + choice.label + '<<<<<');
            
            var opt = DOM.option(choice.label);
            
            if (selectedChoiceByDim[dimension] == choice.object) {
              opt.attr('selected',true);
            }

            ///console.log('dimension',dimension,'sticky[dimension]',sticky[dimension],'choice.object',choice.object);
            /***
            if (TTI.sticky[dimension] && TTI.sticky[dimension] == choice.object) {
              opt.attr('selected',true);
            }
            ***/
            
            dropdown.append(opt);
          });
          
          dropdown.change(function(){
            var selected = choiceItems[this.selectedIndex].object;
            selectedChoiceByDim[dimension] = selected;
            self.publish('dropdown-change');
            self.publish('dropdown-change-' + dimension,selected);
            self.refresh();
          });
          
          
          /////console.log('dimension',dimension,'choiceItems.length',choiceItems.length,choiceItems);
          
          
          
          
          var control = DOM.li().addClass('control');
          control.append(DOM.label(od.label));
          control.append(DOM.br());
          control.append(dropdown);
          controls.append(control);



          if (choiceItems.length > 1) {
            dropdown.attr('disabled',false);
            ////control.show();
          }
          else {
            dropdown.attr('disabled',true);
            ///control.hide();
          }
          
        });
        
        /////console.log('wrap',wrap);


        controls.append(DOM.div('&nbsp;').css('clear','both'));


        
        wrap.empty();
        wrap.append(controls);
        wrap.append(DOM.div('&nbsp;').css('clear','both'));
      };
      
      self.renderOn = function(wrap) {
        //console.log('renderOn called');
      
        var inner = DOM.div().addClass('guru-inner');
        
        var close = DOM.div('<i class="fa fa-close"></i> remove').addClass('distress-remove pull-right noprint');
        close.click(function(){
          ////wrap.remove(inner);
          inner.remove();
          self.publish('remove');
        });
        
        inner.append(close);
        
        var title = DOM.div().addClass('guru-title');
        title.append('Distress #' + spec.position);
        inner.append(title);
        
        var breadcrumb = DOM.div('breadcrumb!!').addClass('onlyprint pull-right');
        self.subscribe('single-hit',function(o){
          console.log('SINGHIT',o);
          var d = o.getDistress();
          var inner = d.breadcrumbInner();
          breadcrumb.html(inner);
        });
        
        inner.append(breadcrumb);
        
        
        inner.append(DOM.div('&nbsp;').addClass('clear-both noprint'));
        
        inner.append(categoryWrap);
        inner.append(distressesWrap);
        inner.append(thumbs);
        inner.append(DOM.div().addClass('clear-both no-height'));

        ///inner.append(hitCount);

        wrap.append(inner);

        
        self.update();  
        ///self.refresh();
      };
    
      self.update = function(s) {
        selectedChoiceByDim = {}; //reset... important!!!
        self.hit = false;
        var keys = Object.keys(TTI.sticky);
        keys.each(function(dimension){
          if (TTI.sticky[dimension]) {
            selectedChoiceByDim[dimension] = TTI.sticky[dimension];
          }
        });


        categoryWrap.empty();
        distressesWrap.empty();
        thumbs.empty();
        
        var candidates = TTI.getStickyScenarios();
        self.renderWizardOn(categoryWrap,candidates);
        self.refresh();
      };

      self.updateThumbnails = function(them) { //them is an array of TTI.Image or TTI.DistressImage
        thumbs.empty();
        
        thumbs.append(DOM.i('click to enlarge photo').addClass('noprint'));
        
        if (them.length > 10) { return false; }
        them.each(function(image){
        
          ////
          var url = image.url();
          var aWrap = DOM.a();
          var caption = DOM.div().addClass('caption');
          var captionInner = image.spec.distress.breadcrumbInner();
          caption.html(captionInner);
          var img = DOM.img().attr('src',url);
          aWrap.append(img);
          aWrap.append(caption);
          img.click(function(){
            campfire.publish('image-clicked',{ url: url, title: captionInner });
          });
          thumbs.append(aWrap);        
        });
      };


      self.subscribe('dropdown-change',function(o){
        ///console.log('dropdown change',o);
        var full = '';
        if (selectedChoiceByDim.distressType) { full += selectedChoiceByDim.distressType + ' ';} 
        if (selectedChoiceByDim.amount) { full += selectedChoiceByDim.amount + ' ';} 
        if (selectedChoiceByDim.severity) { full += selectedChoiceByDim.severity + ' ';} 
        
        console.log('full',full);
        
        var tags = TTI.tagify(full);
        console.log('tags',tags);


        var candidates = [];///////TTI.getImagesForTags(tags,TTI.distressImages);
        self.updateThumbnails(candidates);    
        
        if (selectedChoiceByDim.distressType) {
          var linkTarget = TTI.tagify(selectedChoiceByDim.distressType).join('-');
          ///console.log('linkTarget',linkTarget);
          moreInfo.attr('href','distresses.htm#' + linkTarget);
        }
        
        //////moreInfo.attr('href')        
        
        
      });

      self.subscribe('single-hit',function(o){
        ////console.log('SING',o);
        var full = o.spec.distressDesc;        
        ///console.log('full',full);        
        var tags = TTI.tagify(full);
        /////console.log('tags',tags);


        var candidates = o.distressImages(); 
        ///console.log('candidates',candidates);
        self.updateThumbnails(candidates);
        if (selectedChoiceByDim.distressType) {
          var linkTarget = TTI.tagify(selectedChoiceByDim.distressType).join('-');
          ///console.log('linkTarget',linkTarget);
          moreInfo.attr('href','distresses.htm#' + linkTarget);
        }
        //////moreInfo.attr('href')        
      });
      
      return self;
    };



