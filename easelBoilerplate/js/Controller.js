Class('Controller')({
  prototype : {

    init : function( stage ){
      //setup
      this.stage = stage;
      
      this.layer = new Kinetic.Layer();

      this.elements = [];

      for(var i = 0; i < 10; i++){

        var cell = new Cell(10, i);
        this.elements.push( cell );
        
        //add to stage
        this.layer.add( cell.getElem() );
      }

      this.stage.add( this.layer );

    },

    update : function( time ){

      this.elements.forEach(function(el, i){
        el.update( time );
      });

    }

  }//proto
});