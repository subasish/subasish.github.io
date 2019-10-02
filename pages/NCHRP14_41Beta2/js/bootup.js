

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
};


if (typeof TTI ==  "undefined") { var TTI = {}; }

TTI.storage = TTI.Storage('ACRP::'); //has IE shim.

TTI.cache = {};


TTI.chunkify = function(ary,chunkSize) {
  var chunks = [];
  var aryCopy = ary.select(function(o){ return true; }); 
  while (aryCopy.length > chunkSize) {
    chunks.push(aryCopy.splice(0,chunkSize));
  }
  chunks.push(aryCopy);
  return chunks;
};


    TTI.precision = function(value,digits) {
      var coeff = Math.pow(10,digits);
      return Math.round(value * coeff) / coeff;
    };
    
  TTI.sorter = function(selectorFunc) {
    var sortFunc = function(a,b) {
      var sA = selectorFunc(a);
      var sB = selectorFunc(b);
      if (sA < sB) { return -1; }
      if (sA > sB) { return 1; }
      return 0;
    };
    return sortFunc;
  };
  

TTI.keycodes = {
    TAB: 9,
    PERIOD: 46,
    DOWN: 40,
    UP: 38,
    LEFT: 37,
    RIGHT: 39
};  
  
TTI.cellValidator = function(e) {
    ////console.log('AA asdfasdf e.keyCode',e.keyCode,e);
    if (e.keyCode == TTI.keycodes.TAB) {
        return true;
    }
    var c = e.which;
    ///console.log('c',c);

    var periodMatch = this.value.match(/\./);

    /////console.log('periodMatch',periodMatch);

    //deny multiple periods before accepting periods
    if (c == TTI.keycodes.PERIOD && periodMatch) {
        return false;
    }
    //now accept (a single) period
    if (e.keyCode == TTI.keycodes.PERIOD) {
        return true;
    }
    if (c < 48 || c > 57) {
        return false;
    }
    return true;
};  
  
  

  TTI.wrap = function(str,len) {
    function helper(accum,len) {
      if (str.length < len) { return [str]; }
      var lastLine = accum.pop();
      var words = lastLine.split(/\ +/);
      var remainder = [];
      
      while (words.join(" ").length > len) {
        remainder.unshift(words.pop());
      }
      var part1 = words.join(" ");
      var part2 = remainder.join(" "); 
      accum.push(part1);
      accum.push(part2);
      
      if (part2.length > len) {
        helper(accum,len);
      }
    }
    var lines = [str];
    helper(lines,len);  
    return lines;
  };
  


TTI.replaceWordChars = function(text) {
    var s = text;
    // smart single quotes and apostrophe
    s = s.replace(/[\u2018\u2019\u201A]/g, "\'");
    // smart double quotes
    s = s.replace(/[\u201C\u201D\u201E]/g, "\"");
    // ellipsis
    s = s.replace(/\u2026/g, "...");
    // dashes
    s = s.replace(/[\u2013\u2014]/g, "-");
    // circumflex
    s = s.replace(/\u02C6/g, "^");
    // open angle bracket
    s = s.replace(/\u2039/g, "<");
    // close angle bracket
    s = s.replace(/\u203A/g, ">");
    // spaces
    s = s.replace(/[\u02DC\u00A0]/g, " ");


    //91 ec 236, left single quote
    //92 ed 237, right single quote
    
    //single quotes
    s = s.replace(/\u00ec/,"'");
    s = s.replace(/\u00ed/,"'");

    //93 ee 238, left double quote
    //94 ef 239, right double quote

    //double quotes
    s = s.replace(/\u00ee/,"\"");
    s = s.replace(/\u00ef/,"\"");
    
    
   //another right apos 
    s = s.replace(/\u2018/,"'");
    s = s.replace(/\u2019/,"'");

    
    return s;
};



TTI.inspectMSText = function(raw) {
  console.log('inspecting!!');
  var thresh = 128;
  var map = {
    '\u00ed': ""
  };
  for (var i = 0; i < raw.length; i++) { 
    var charCode = raw.charCodeAt(i);
    var char = raw.charAt(i);    
    if (charCode > thresh) {
      console.log('raw',raw[i],char,charCode);   
    }
  }
};


TTI.scrollTop = function() {
  var doc = document.documentElement, body = document.body;
  var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
  var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);

  /////console.log('scrollTop, top is',top);

  return top;
};


TTI.documentWidth = function() {
var w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

/*
var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
*/
  return w;
}


TTI.prettyDate = function(when) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];    

  return '{month} {d}, {hourMin}'.supplant({
    month: months[when.getMonth()],
    d: when.getDate(),
    h: when.getHours(),
    hourMin: TTI.formatAMPM(when)
  });
  
};


TTI.formatAMPM = function(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};





TTI.slugify = function(str) {
  var result = str.toLowerCase();
  result = result.replace(/\//g,'-');
  result = result.replace(/\./g,'-');
  result = result.replace(/\:/g,'-');
  result = result.replace(/\ /g,'-');
  result = result.replace(/\&/g,'-');
  result = result.replace(/-/g,'-');
  result = result.replace(/--/g,'-');
  result = result.replace(/__/g,'-');
  result = result.replace(/\_\_/g,'-');

  return result;  
};


function aliases(a,aliases) {
  var common = a.intersect(aliases);
  if (common.length > 0) { return aliases; }
  return [];
};

TTI.tagify = function(input) {

  if (!input) { return []; }

  var temp = input.toLowerCase();
  
  //split some things apart
  temp = temp.replace(/cornerbrk/,'corner break');
  temp = temp.replace(/crossstitch/,'cross stitch');

  
  var parts = temp.split(/\/|\+|\ |\-|\,|\.|\(|\)|\_/);
  var noblanks = parts.reject(function(o){ return o.length == 0; });


  aliases(noblanks,['pcc','concrete']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['ac','asphalt']).each(function(alias){
    noblanks.push(alias);
  });

  aliases(noblanks,['lo','low','lowsev','losev']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['med','mod','modsev','medsev','medium','moderate']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['hi','high','highsev','hisev']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['sev','severity']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['panel','slab']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['brk','break']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['rough','roughness']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['wave','wavelength']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['shatter','shattered']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['fault','faults','faulted','faulting']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['patch','patches','patched','patching']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['alligator','fatigue']).each(function(alias){
    noblanks.push(alias);
  });

  aliases(noblanks,['stitch','stitching']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['grind','grinding']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['groove','grooving']).each(function(alias){
    noblanks.push(alias);
  });

  aliases(noblanks,['stabilize','stabilization']).each(function(alias){
    noblanks.push(alias);
  });
  aliases(noblanks,['recon','reconstruct']).each(function(alias){
    noblanks.push(alias);
  });


  aliases(noblanks,['ol','overlay']).each(function(alias){
    noblanks.push(alias);
  });



  
  //now that things are uniform, remove tags with low information...
  noblanks = noblanks.reject(function(o){ return o == 'and'; }); 
  noblanks = noblanks.reject(function(o){ return o == 'severity'; }); 


  var result = noblanks.unique(); //important! remove duplicates
  return result;
};

TTI.import = function(url,callback) {
    jQuery.ajax({
      type: 'GET',
      url: url,
      success: callback,
      error: function(e) { console.log('ERROR ',e); }
    });
};

TTI.importJSON = function(url,callback) {
    jQuery.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: callback
    });
};

TTI.toDataURI = function(content) {
    var result = 'data:text/html;base64,' + Base64.encode(content);
    return result;
};

TTI.fromDataURI = function(s) {
  var parts = s.split(/base64,/);
  if (parts.length < 2) { return "cannot parse"; }
  var base64 = parts[1];
  var content = Base64.decode(base64);
  return content;
};

TTI.scrollToTop = function() {
 $("html, body").animate({ scrollTop: 0 }, "slow");
};

TTI.moneyToFloat = function(currency) {
  var number = Number(currency.replace(/[^0-9\.]+/g,""));
  return number;
};

TTI.v1computeTCO = function(lft,wft,costPerSquareYard){
  var sqft = lft*wft;
  var sqyd = sqft/9;
  var result = sqyd*costPerSquareYard;
  return result;
};

TTI.estimateCost = function(lft,wft,costObject,scaleFactor){
  var sqft = lft*wft;
  
  var denominator = {
    asphalt: 5000,
    concrete: 8000
  };
  
  var d = denominator[costObject.surfaceType];

  var result = (sqft / d) * costObject.cost * scaleFactor;  
  
  return result; 
};


TTI.formatCostBasis = function(costObject) {
  //console.log('costObject',costObject);
  
  
  if (!costObject.treatmentDesc) { return 'N/A'; }
  
  var unit = 'sq yd';
  
  if (costObject.treatmentDesc.match(/crack.*joint.*seal/i)) {
    unit = 'linear ft';
  }
  if (costObject.treatmentDesc.match(/joint.*seal/i)) {
    unit = 'linear ft';
  }
  if (costObject.treatmentDesc.match(/crack.*seal/i)) {
    unit = 'linear ft';
  }
  
  /////////console.log('treatment',costObject)
  
  /////var formatted = accounting.formatMoney(costObject.unitCost,'$',2) + ' / '  + unit;
  
  var formatted = ' / ' + unit;
  return formatted;
}


var campfire = TTI.PubSub({});


var orderedDimensions = [
  { label: 'Distress Type', property: 'distressType' },
  { label: 'Distress Amount', property: 'amount' },
  { label: 'Distress Severity', property: 'severity' },
];
   


TTI.scenarios = [];
TTI.costs = [];
TTI.benefits = [];
TTI.gurus = [];
TTI.distressImages = [];
TTI.pciCurveImages = [];
TTI.pictures = [];
TTI.winners = [];
  
    TTI.PCICurveImage = function(spec) {
    var self = TTI.Image(spec);
    self.url = function() {
      return 'images/pci-curves/' + spec.filename;
    };
  
    self.distressTags = function() {
      var parts = spec.filename.split(/\./);
      var subset = parts.splice(2);
      var joined = subset.join(',');
      var result = TTI.tagify(joined);      
      return result;    
    };
  
    self.treatmentTags = function() {
      var parts = spec.filename.split(/\./);
      var subset = parts.splice(1,1);
      var joined = subset.join(',');
      var result = TTI.tagify(joined);      
      return result;    
    };
    
    self.surfaceType = function() {
      var parts = spec.filename.split(/\.|\ /);
      var st = parts[0];
      ////console.log(st,'st');
      if (st == 'AC') { return 'asphalt'; }
      if (st == 'PCC') { return 'concrete'; }
      return st;
    }
    
  
    return self;  
  };  
  
  
  
    
    
TTI.lookupCost = function(surfaceType,distress,treatment) {
  /////console.log('TTI.lookupUnitCost surfaceType=',surfaceType,'distress=',distress,'treatment=',treatment);


  if (distress.match(/20/)) {
    console.log('20');
  }


  if (treatment == 'Do Nothing') { 
    return { cost: 0, unit: 0, unitCost: 0, row: 0, column: '' }; 
  }

  var sorted, last;

  var distressTags = TTI.tagify(distress);
  var treatmentTags = TTI.tagify(treatment);


  var distressTagsScore = function(o) {
    var oTags = TTI.tagify(o.distressDesc);
    var common = oTags.intersect(distressTags);
    common = common.unique();
    var extraTagCount = oTags.length - common.length; //extra tags in the hit.
    var score = (10 * common.length) - extraTagCount; //penalize the rank of extra tags somewhat, Not to the order of mangitude that we rank common tags though.
    return score;
  }

  var treatmentTagsScore = function(o) {
    var oTags = TTI.tagify(o.treatmentDesc);
    var common = oTags.intersect(treatmentTags);
    common = common.unique();
    var extraTagCount = oTags.length - common.length; //extra tags in the hit.
    var score = (10 * common.length) - extraTagCount; //penalize the rank of extra tags somewhat, Not to the order of mangitude that we rank common tags though.
    return score;
  }

  
  var candidates = TTI.costs.select(function(o){ return o.surfaceType == surfaceType;  });

  sorted = candidates.sort(TTI.sorter(distressTagsScore));
  
  var debug = sorted.map(function(o) { return [ distressTagsScore(o), o]; });
  ////console.log('debug sorted',debug,'distressTags',distressTags);
  
  
  last = sorted[sorted.length-1];      
  candidates = candidates.select(function(o){ return o.row == last.row; });

  ///console.log('candidates pass1',candidates);      
    
    
  //pass #2, further whittle down by treatment tag score.

  
  sorted = candidates.sort(TTI.sorter(treatmentTagsScore));
  ///console.log('sorted',sorted);      
  last = sorted[sorted.length-1];
  var result = last;
  
  return last;
  
  //console.log('result',result);
  ///console.log('dtags',distressTags,'ttags',treatmentTags);    
};




TTI.lookupBenefit = function(surfaceType,distress,treatment) {
  ///console.log('TTI.lookupBenefit surfaceType=',surfaceType,'distress=',distress,'treatment=',treatment);

  if (treatment == 'Do Nothing') { 
    return { benefit: 0, row: 0, column: '' }; 
  }

  var sorted, last;

  var distressTags = TTI.tagify(distress);
  var treatmentTags = TTI.tagify(treatment);


  var distressTagsScore = function(o) {
    var oTags = TTI.tagify(o.distressDesc);
    var common = oTags.intersect(distressTags);
    common = common.unique();
    var extraTagCount = oTags.length - common.length; //extra tags in the hit.
    var score = (10 * common.length) - extraTagCount; //penalize the rank of extra tags somewhat, Not to the order of mangitude that we rank common tags though.
    return score;
  }

  var treatmentTagsScore = function(o) {
    var oTags = TTI.tagify(o.treatmentDesc);
    var common = oTags.intersect(treatmentTags);
    common = common.unique();
    var extraTagCount = oTags.length - common.length; //extra tags in the hit.
    var score = (10 * common.length) - extraTagCount; //penalize the rank of extra tags somewhat, Not to the order of mangitude that we rank common tags though.
    return score;
  }

  
  var candidates = TTI.benefits.select(function(o){ return o.surfaceType == surfaceType;  });

  sorted = candidates.sort(TTI.sorter(distressTagsScore));
  
  var debug = sorted.map(function(o) { return [ distressTagsScore(o), o]; });
  //console.log('debug sorted',debug,'distressTags',distressTags);
  
  
  last = sorted[sorted.length-1];      
  candidates = candidates.select(function(o){ return o.row == last.row; });

  ///console.log('candidates pass1',candidates);      
  
  sorted = candidates.sort(TTI.sorter(treatmentTagsScore));
  ///console.log('sorted',sorted);      
  last = sorted[sorted.length-1];
  var result = last;
  
  return last;
  
  //console.log('result',result);
  ///console.log('dtags',distressTags,'ttags',treatmentTags);    
};


  TTI.Image = function(spec) {
    var self = TTI.PubSub({});
    self.spec = spec;
    
    self.allTags = function() {
      var result = [];
      
      result = result.concat(TTI.tagify(spec.filename));
      result = result.concat(TTI.tagify(spec.description));
      result = result.concat(TTI.tagify(spec.extraTags));
      return result;
    };
    self.url = function() {
      return 'implementors responsibility';//////////images/distresses/' + spec.filename;
    };
    
    return self;  
  };
  
  
  TTI.DistressImage = function(spec) {
    var self = TTI.Image(spec);
    self.url = function() {
      return 'images/distresses/' + spec.filename;
    };
  
    return self;  
  };




    TTI.getImagesForTags = function(tags,candidates) {

        var tagsScore = function(o) {
          var oTags = o.allTags(); //TTI.Image has allTags function
          ///console.log('oTags',oTags);
          var common = oTags.intersect(tags);
          common = common.unique();
          var extraTagCount = oTags.length - common.length; //extra tags in the hit.
          var score = (20 * common.length) - extraTagCount; //penalize the rank of extra tags somewhat, Not to the order of mangitude that we rank common tags though.
          
          if (common.length > 0) {
            /////console.log('oTags',oTags,'common',common,'score',score);
          }
          
          return score;
        };

        sorted = candidates.sort(TTI.sorter(tagsScore));
        var debug = sorted.map(function(o) { return [ tagsScore(o), o]; });
        //console.log('getImagesForTags, debug sorted',debug,'tags',tags);
        
        var last = sorted[sorted.length-1];      
        var lastScore = tagsScore(last);
        
        ////console.log('lastScore',lastScore);
        
        if (lastScore <= 0) {
          return [];
        }
        
        
        //return all with same highest score as last
        candidates = candidates.select(function(o){ return tagsScore(o) == lastScore; });
        return candidates;
    };
    
    
    
      TTI.assemblePCICurveImage = function(image,title) {
        if (!image) { return false; } 
        var img = DOM.img().addClass('pci-curve');
        img.attr('src',image.url());
        
         return img;
      };
    
    
    
    
    TTI.getPCICurveImagesForTags = function(surfaceType,distressTags,treatmentTags,candidates) {

        var tagsScore = function(o) {
          var score = 0;
          var common = [];
          var extraTagCount = 0;
          var oTags = [];


          if (o.surfaceType() !== surfaceType) {
            return -1; //wrong surfaceType
          }
          //treatment tags are more important when finding the right PCI Curve image
          oTags = o.treatmentTags();
          common = oTags.intersect(treatmentTags);
          common = common.unique();
          extraTagCount = oTags.length - common.length;
          score = score + (30 * common.length) - extraTagCount; //penalize the rank of extra tags somewhat, Not to the order of mangitude that we rank common tags though.

          if (score <= 0) {
            return score; //if you haven't found anything by treatment alone, forget it...
          }

          oTags = o.distressTags();
          common = oTags.intersect(distressTags);
          common = common.unique();
          extraTagCount = oTags.length - common.length;
          score = score + (20 * common.length) - extraTagCount; //penalize the rank of extra tags somewhat, Not to the order of mangitude that we rank common tags though.

          return score;
        };

        sorted = candidates.sort(TTI.sorter(tagsScore));
        var debug = sorted.map(function(o) { return [ tagsScore(o), o]; });
        /////console.log('getImagesForTags, debug sorted',debug,'distressTags',distressTags,'treatmentTags',treatmentTags);
        
        var last = sorted[sorted.length-1];      
        var lastScore = tagsScore(last);
        
        if (lastScore <=0) {
          //forget it
          return []; // no candidates
        }
        
        
        //return all with same highest score as last
        candidates = candidates.select(function(o){ return tagsScore(o) == lastScore; });
        return candidates;
    };


  function fight(surfaceType,candidates) {
  
  
  
  }


    TTI.getStickyScenarios = function() {
      var result = TTI.scenarios;
      
      
      var fields = Object.keys(TTI.sticky);
      
      fields.forEach(function(field) {
        result = result.select(function(scenario){
          if (! TTI.sticky[field]) { return true; }
          return scenario.spec[field] == TTI.sticky[field];
        });
      });
      
      return result;
    };

    
    
