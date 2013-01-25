Class('Cell')({
  prototype : {
    transitionTime : 6*1000,
    color_init     : parseInt("FF", 16),
    color_final    : parseInt("00", 16),
    
    init : function( size , pos){
      //setup

      console.log('? inited');


      this.elem = new Kinetic.Rect({
        x: size*pos,
        y: 0,
        width: size,
        height: size,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 1
      });

    },

    update : function( time ){
      this.time = time;
      // this.calculateColor();
      console.log('updated: '+this.calculateColor() );
    },

    calculateColor : function(){

      var yourNum = Math.ceil( ( this.color_final - this.color_init ) * (this.time/this.transitionTime) );
      var initial_color = yourNum.toString(16);
      return ( initial_color < 10 ? '0' : '' ) + initial_color;
      
    },

    getElem : function(){
      return this.elem;
    }

  }//proto
});