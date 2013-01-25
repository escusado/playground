var project = {
  
  //conf
  stage: {
    w: $(window).width()-10,
    h: $(window).height()-10
  },
  
  //control vars
  frame : 0,
  stop  : false,

  start: function(){
    console.log('init app');

    _.bindAll(this);

    this.timeStamp = new Date().getTime();

    this.stage = new Kinetic.Stage({
      container: 'container',
      width: this.stage.w,
      height: this.stage.h
    });

    this.controller = new Controller( this.stage );

    this.startAnimation();
  },

  startAnimation: function(){
    //setup loop
    var project = this;

    (function animloop(){
      if( project.stop ){
        return;
      }
      requestAnimFrame(animloop);
      project.update();
    })();
  },

  update : function(){
    // this.stop = true;
    // $('#container').trigger('update');

    this.controller.update( new Date().getTime() - this.timeStamp );

    this.render();
  },

  render: function(){
    this.stage.draw();
  }


};

$(document).ready(function(){
  project.start();
});