ò_ó.Describe.Controller('CityController',{

  builder: function(priv,params){
    priv.indicatorsHandler  = ò_ó.Create('IndicatorsHandler', {indicators:params.indicators},params.indicatorsHandler); 
    //
    
    priv.ΦlistenEvent(priv.view,'click','onClick',priv.publ);
    priv.ΦlistenEvent(priv.view,'rotated','onRotated',priv.publ);
    priv.indicatorsHandler.renderTo(priv.view.getDomElement());
  },
  
  view: { name: 'CityView',
    //      params: params.viewParams
  },
  
  publ: function(publ,priv,params){
    
    publ.renderTo = function(element){
      priv.view.renderTo($(element));
    };

    publ.refreshIndicators = function(){
       priv.indicatorsHandler.refresh();
    };
    
    publ.onClick = function(event) {
      var objectClicked = ò_ó.getObjectFromDomElement(event.target);
      //TODO, modify what is oppened and what not.
      if (objectClicked.getObjectType() === 'CityController'){ // the object is itself
        priv.indicatorsHandler.toggleVisibility(); // shall we open a menu instead of only togle movements optiones visibilitiy
      }
      else{
        objectClicked.onClick(priv.publ);  
      }
    };
    
    publ.onRotated = function(rotation) {
      priv.indicatorsHandler.rotateIndicators(-1 * rotation);
    };
    
    
    publ.onHoverIn = function(){
      console.log('hoverin');
    };
    
    publ.onHoverOut = function(){
     console.log('hoverout');
    };
    
    publ.setDisplacementVisibility= function(visibility){
      priv.indicatorsHandler.toggleVisibility(visibility);
    };
  }
});


ò_ó.Describe.View('CityView',{
  
  builder: function(priv,params){
    priv.controller = params.controller;    

    $(priv.mainDomElement).click(function(event) {
       priv.publ.ΦfireEvent('click',event);
    });

    Draggable.create(priv.mainDomElement, {type: "rotation",     throwProps: true,
      onDrag: function(){
        priv.publ.ΦfireEvent('rotated',this.rotation);
      }
    });
  },
  
  mainDomElement:{
    template: '<div class="CityContainer"></div>'
  },
  
  publ : function(publ,priv,params){
   
  }
});