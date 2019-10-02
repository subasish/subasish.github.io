if (typeof TTI == "undefined") { var TTI = {}; }
if (typeof TTI.Widgets == "undefined") { TTI.Widgets = {}; }

TTI.Widgets.Lightbox = function (spec) {
    
    var showing = false;

    var self = TTI.PubSub({});    
    var wrap = DOM.div();    
    
    
    ////console.log('spec',spec);
    
    
    wrap.addClass('tti-widgets-lightbox');

    wrap.css('display','none');
    wrap.css('position', 'absolute');
    wrap.css('top', '0%'); 
    wrap.css('height', '100%');
    wrap.css('width', '100%');

    var overlay = DOM.div();
    overlay.addClass('overlay');

    overlay.css('display', 'none');
    overlay.css('position', 'absolute');
    overlay.css('top', '0px');
    overlay.css('height', '100%');
    overlay.css('width', '100%');
    overlay.css('background', '#000');
    /////overlay.css('opacity', 0.5);

    var box = DOM.div().addClass('box');
    /////box.addClass('content');

    box.css('display', 'none');
    box.css('position', 'absolute');
    ///box.css('top', '200px');
    //box.css('left', spec.left || '12%');

    if (typeof spec.left != "undefined") {
      box.css('left', spec.left);
    }    
    if (typeof spec.width != "undefined") {
      box.css('width', spec.width);
    }    

    box.css('top', spec.top || '12%');
    box.css('height',spec.height || 'auto');


    box.css('background', 'white');
    box.css('opacity', '1.0');
    box.css('z-index', 152);
    ///box.css('padding', '1em');
    ///box.css('font-size', '1.5em');
    ///box.html(spec.content.html());
    box.append(spec.content);///////.html());


    var close = DOM.div();
    close.addClass('close');
    close.css('position', 'absolute');
    close.css('background', 'black');
    close.css('color', 'white');
    close.css('padding', '0.3em');
    close.css('cursor', 'pointer');
    close.html('close');


    self.toggle = function() {
      if (showing) {
        self.hide();
      }
      else {
        self.show(); 
      }    
    };
    self.show = function () {
        showing = true;
        wrap.show();
        wrap.css('z-index', 151);
        wrap.css('top', '0%');
        
        overlay.height(jQuery(document).height());
        overlay.fadeIn();


        /**
        var doc = document.documentElement, body = document.body;
        var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
        var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
        box.css('top',top + 'px');
        ***/
        if (typeof spec.scrollTopCallback != "undefined") {
          box.css('top', spec.scrollTopCallback());
        }
        else {
          box.css('top', spec.top || '12%');      
        }
        
        
        
        box.fadeIn();
        overlay.css('z-index', 151);
        self.publish('show',null);
    };
    self.hide = function () {
        showing = false;
        overlay.fadeOut();
        box.fadeOut();
        wrap.css('z-index', 0);
        /////////wrap.css('top', '1000%');
        overlay.css('z-index', 0);
        wrap.hide();
        self.publish('hide',null);
    }
    wrap.append(overlay);
    wrap.append(box);
    box.append(close);


    jQuery(document.body).append(wrap);
    /////box.click(self.hide);
    overlay.click(self.hide);
    close.click(self.hide);
    return self;
};
