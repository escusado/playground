var project = {
  start: function(){
    console.log('>>>');
    _.bindAll(this);

    //create layer
    this.layer = new collie.Layer({
      width: $(window).outerWidth(),
      height: $(window).outerHeight()
    });

    // collie.ImageManager.add({
    //   logo: "http://jindo.dev.naver.com/collie/img/small/logo.png"
    // },this.createObjects);

    this.createObjects();

  },

  createObjects: function(){
    
    this.logo = new collie.MovableObject({
      x: "center",
      y: "center",
      backgroundImage: "logo",
      velocityRotate: 50
    }).addTo( this.layer );

    this.render();
  },

  render: function(){
    collie.Renderer.addLayer( this.layer );
    collie.Renderer.load( document.getElementById("container") );
    collie.Renderer.start();
  }
};

$(document).ready(function(){
  project.start();
});