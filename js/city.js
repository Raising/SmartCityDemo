ò_ó.Describe.Controller('CityController',{

  builder: function(priv,params){
    priv.indicatorsHandler  = ò_ó.Create('IndicatorsHandler', {indicators:params.indicators},params.indicatorsHandler); 
   
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

    publ.openIndicatorInfoPanel = function(reportInfo){

    }
  }
});


ò_ó.Describe.View('CityView',{
  
  builder: function(priv,params){
    priv.controller = params.controller;    

   

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