ò_ó.Describe.Interface('IndicatorsHandler',{
  classType: 'controller',
  defaultClass:'SmartCityIndicatorsHandler',
  renderTo:function(){}, 
});


ò_ó.Describe.Controller('SmartCityIndicatorsHandler' ,{
  Implements:['IndicatorsHandler'],
  
  builder: function(priv,params){
    priv.indicatorsDescriptions = params.indicators ? params.indicators : [];
    priv.indicatorsArray = [];
    
    priv.publ.loadIndicators();
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
      publ.onClick = function(parentEntity){
        parentEntity.relativeMovement(priv.publ.getLocation());
        parentEntity.setDisplacementVisibility(false);
      };
      publ.getLocation =function(){
        return priv.situation.getPositionDisplacementFormat();
      };
      publ.setRotation = function(rotation){
      	priv.situation.rotation = rotation;
      	priv.view.rotate(rotation);
      }
 
  }
});


ò_ó.Describe.View('SmartCityIndicatorView' ,{
  builder: function(priv,params){
    priv.controller = params.controller;
 //     new TimelineMax().to(priv.mainDomElement, 1.6, { rotationX:60,  transformOrigin:"50% 60% ", ease:Bounce.easeOut});

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
      	 new TimelineMax().to(priv.mainDomElement, 0.6, { rotationZ:rotation,  transformOrigin:"50% 95% ", ease:Sine.easeOut});
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