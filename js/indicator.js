ò_ó.Describe.Interface('IndicatorsHandler',{
  classType: 'controller',
  defaultClass:'SmartCityIndicatorsHandler',
  renderTo:function(){}, 
});


ò_ó.Describe.Controller('SmartCityIndicatorsHandler' ,{
  Implements:['IndicatorsHandler'],
  
  builder: function(priv,params){
	priv.popUpHandler  = ò_ó.Create('PopUpHandler', {renderFrame:params.popUpFrame},params.popUpHandler); 
    

   
    priv.indicatorsDescriptions = params.indicators ? params.indicators : [];
    priv.indicatorsArray = [];
    
    priv.publ.loadIndicators();

    priv.ΦlistenEvent(priv.view,'click','onClick',priv.publ);
  },
  
  view:{
    name:'SmartCityIndicatorsHandlerView'
  },
  
  publ : function(publ,priv,params){// si se quiere hacer herencia prototipada poner prototype: objetoPrototipo

      publ.loadIndicators = function(){
        var numberOfIndicators = priv.indicatorsDescriptions.length;
        priv.view.cleanDomElement();
        priv.indicatorsArray = [];
        
        for (var i = 0;i <numberOfIndicators; i++){
          var newIndicator = ò_ó.Create.Controller('SmartCityIndicator',priv.indicatorsDescriptions[i]);
          priv.indicatorsArray.push(newIndicator);
          newIndicator.renderTo(priv.view.getDomElement());
          newIndicator.setViewPosition();
        }
      };
           
      publ.renderTo = function(element){
        priv.view.renderTo(element);
      };
      
      publ.getView = function(){
        return priv.view;
      };

      publ.onClick = function(event) {
	    var objectClicked = ò_ó.getObjectFromDomElement(event.target);
	    objectClicked.onClick(priv.publ,event);  
   	  };

   	  publ.openIndicatorInfoPanel = function(reportInfo,event) {
   	  	priv.popUpHandler.showPopUp(reportInfo,{x:event.clientX,y:event.clientY}); 
   	  };

      publ.rotateIndicators = function(rotation){
      	var numberOfIndicators = priv.indicatorsArray.length;

      	for (var i = 0;i <numberOfIndicators; i++){
          priv.indicatorsArray[i].setRotation(rotation);
        }
      }
      
  }
});

ò_ó.Describe.View('SmartCityIndicatorsHandlerView',{
  
  builder: function(priv,params){
  	 $(priv.mainDomElement).click(function(event) {
       priv.publ.ΦfireEvent('click',event);
    });
  },
  
  mainDomElement:{
    template: '<div class="indicatorsContainer"></div>'
  },
  
  publ : function(publ,priv,params){

  }
});


ò_ó.Describe.Interface('Indicator',{
  classType: 'controller',
  defaultClass:'SmartCityIndicator',
  renderTo:function(){}, 
  setViewPosition:function(){},
});


ò_ó.Describe.Controller('SmartCityIndicator' ,{
  builder: function(priv,params){
     priv.situation =  ò_ó.Create.Model('Position2DModel',params);
     priv.information =  ò_ó.Create.Model('IndicatorInformation',params);


  },
  
  view:{
    name: 'SmartCityIndicatorView'
  },
  
  publ : function(publ,priv,params){// si se quiere hacer herencia prototipada poner prototype: objetoPrototipo
 
      publ.renderTo = function(element){
         priv.view.renderTo(element);
      };
      publ.setViewPosition = function(){
        priv.view.setLocation(priv.situation.getPosition());
      };
      publ.onClick = function(parentEntity,event){
        parentEntity.openIndicatorInfoPanel(priv.information.getReport(),event); 
      };
      publ.getLocation = function(){
        return priv.situation.getPosition();
      };
      publ.setRotation = function(rotation){
      	priv.situation.rotation = rotation;
      	priv.view.rotate(rotation);
      };

      publ.getIndicatorInformation = function(){
      	return priv.information;
      };
 
  }
});


ò_ó.Describe.View('SmartCityIndicatorView' ,{
  builder: function(priv,params){
    priv.controller = params.controller;
    priv.tl =  new TimelineMax();

	$(priv.mainDomElement).mouseenter(function(event) {
       TweenMax.to(priv.mainDomElement,0.2,{ scale:1.4,transformOrigin:"50% 95%", ease:Sine.easeOut});
    });
    $(priv.mainDomElement).mouseleave(function(event) {
       TweenMax.to(priv.mainDomElement,0.2,{ scale:1,transformOrigin:"50% 95%", ease:Sine.easeOut});
    });

  },
  
  mainDomElement:{
    template: '<div class="indicatorView"></div>'
  },
  
  publ : function(publ,priv,params){

      publ.setLocation = function(params){
        TweenMax.to(priv.mainDomElement,0.3,{ x:       params.coordinates.x,
                                              y:       params.coordinates.y});
      };
      publ.hide = function(){
        TweenMax.to(priv.mainDomElement,0.3,{ opacity:0,transformOrigin:"50% 50%", ease:Sine.easeOut});
      };
      publ.show = function(){
        TweenMax.to(priv.mainDomElement,0.3,{ opacity:1,transformOrigin:"50% 50%", ease:Sine.easeOut});
      };
      publ.rotate = function(rotation){
      	priv.tl.clear();
      	priv.tl.to(priv.mainDomElement, 0.05, { rotationZ:rotation,  transformOrigin:"50% 95% ", ease:Sine.easeOut});
      }

  }
});


ò_ó.Describe.Model('Position2DModel',{
  builder: function(priv,params){
    priv.coordinates = params.coordinates ? params.coordinates : {x:100,y:100};
    priv.rotation = params.rotation ? params.rotation : 0;
   },
  
  publ : function(publ,priv,params){
 
      publ.getPosition= function(){
        return {coordinates:priv.coordinates, rotation:priv.rotation};
      };

  }
});


ò_ó.Describe.Model('IndicatorInformation',{
  builder: function(priv,params){
    priv.intensity    = params.intensity ? params.intensity : 0;
    priv.performance  = params.performance ? params.performance : 0;
    priv.production   = params.production ? params.production : 0;
   },
  
  publ : function(publ,priv,params){
 
      publ.getReport = function(){
        return {intensity:priv.intensity, 
        	performance:priv.performance,
        	production :priv.production 
        };
      };
  }
});

ò_ó.Describe.Interface('PopUpHandler',{
  classType: 'controller',
  defaultClass:'SmartCityPopUpHandler',
  show:function(){}, 
  hide:function(){}, 
});


ò_ó.Describe.Controller('SmartCityPopUpHandler' ,{
  builder: function(priv,params){
     priv.renderToFrame = params.renderFrame ? params.renderFrame : $('body');
     priv.view.renderTo(priv.renderToFrame);
  },
  
  view:{
    name: 'SmartCityPopUpView'
  },
  
  publ : function(publ,priv,params){
 
      publ.showPopUp = function(information,coordinates){
        priv.view.setPosition(coordinates);       
         priv.view.printInformation(information);
      };

      publ.setViewPosition = function(){
        priv.view.setLocation(priv.situation.getPosition());
      };

      publ.onClick = function(parentEntity){
        parentEntity.openIndicatorInfoPanel(priv.information.getReport()); 
      };

      publ.getLocation =function(){
        return priv.situation.getPosition();
      };

      publ.setRotation = function(rotation){
      	priv.situation.rotation = rotation;
      	priv.view.rotate(rotation);
      };

      publ.getIndicatorInformation = function(){
      	return priv.information;
      };
 
  }
});



ò_ó.Describe.View('SmartCityPopUpView' ,{
  

  builder: function(priv,params){
    priv.controller = params.controller;
    priv.tl =  new TimelineMax();

  },
  
  mainDomElement:{
    template: '<div class="popUpView"></div>'
  },
  
  publ : function(publ,priv,params){
  	  var repositionDelay =	 0.6;

      publ.setPosition = function(coordinates){
      	priv.tl.to(priv.mainDomElement,repositionDelay/3,{ opacity:0,transformOrigin:"50% 50%", ease:Sine.easeOut});
      	
      	priv.tl.to(priv.mainDomElement,repositionDelay/3,{delay:repositionDelay/3, opacity:1,transformOrigin:"50% 50%", ease:Sine.easeOut});

        TweenMax.to(priv.mainDomElement,repositionDelay,{ x:       coordinates.x,
                                              			y:       coordinates.y});
      };

      publ.printInformation = function(information){
      	setTimeout(function(){
      		var pieceOfInfo;
      		priv.mainDomElement.empty();
			// INEFICIENTE no hacer append de cada elemento por separado
      		for (pieceOfInfo in information){
      			priv.mainDomElement.append(ò_ó.Create.Template('IndicatorInfoPopUpLine',
      				{title: pieceOfInfo,
      				 info: information[pieceOfInfo]
      				}));
      		} 
		}, repositionDelay*500);
      }

      publ.hide = function(){
        TweenMax.to(priv.mainDomElement,0.3,{ opacity:0,transformOrigin:"50% 50%", ease:Sine.easeOut});
      };
      publ.show = function(){
        TweenMax.to(priv.mainDomElement,0.3,{ opacity:1,transformOrigin:"50% 50%", ease:Sine.easeOut});
      };
  }
});


ò_ó.Describe.Template('IndicatorInfoPopUpLine',{
	builder: function(params){
		var title =	params.title ? params.title : 'noTitle',
			info =	params.info ? params.info : 'noInfo';

		return ('<div class="indicatorInfoPopUp-Line">'+
					'<div class="indicatorInfoPopUp-Title">'+title+'</div>'+
					'<div class="indicatorInfoPopUp-Info">'+info+'</div>'+
				'</div>');
	} 
});