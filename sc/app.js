/* Config *********************************************************************/
var conf = {
  port      : 3001,
  imgDir    : 'img',
  mongoPort : 27017,
  mongoIp   : '127.0.0.1',
  mongoDB   : 'trashcan', //database name
  mongoColl : 'images'    //collection name
};

var user_id = '72c6ae4ae439d253d88a81db48ee9e20';

/* Dependencies & Setup *******************************************************/
var express     = require('express'),
    http        = require('http-get'),
    fs          = require('fs'),
    _           = require('underscore'),
    clc         = require('cli-color');
    
//setup express app at 'process' level
app = express();

app.engine('html', require('ejs').renderFile);

//log colors
var log = {
  red  : function(msj){ console.log( clc.red(msj) ); },
  yel  : function(msj){ console.log( clc.yellow(msj) ); },
  blu  : function(msj){ console.log( clc.blue(msj) ); },
  grn  : function(msj){ console.log( clc.green(msj) ); }
};

/* App ************************************************************************/
var trashCan = {

  start: function(){
    var trashCan = this;

    //fix context on all functions to trashCan object
    _.bindAll(this);

    //setup express app
    app.use(express.bodyParser()); //auto-parse POST requests

    // Allow CORS
    app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });


    this.setupRouter();

  },

  setupRouter: function(){

    app.get('/'          , this.home);

    app.get('/callback.html' , function(req, res){
      console.log('render callbakc');
      res.render('./callback.html');
    });

    app.get('/download', this.processFile);
    // app.get('/remove/:id', this.removeImage);
    // app.get('/get/:id'   , this.getImage);

    log.yel('\nReady!\n > listening on port: '+conf.port);
    app.listen(conf.port);
  },

  //Actions
  home: function(req, res){
    console.log('render index');
    res.render('./index.html');
  },

  processFile: function(req, res){
    //https://api.soundcloud.com/tracks/291/stream
    var track_url = 'https://api.soundcloud.com/tracks/5667089/stream?client_id='+user_id;

    var filename = 'track.mp3';

    this.downloadFile(track_url ,filename, function(data){
      debugger
      res.end(data);
    });
  },

  downloadFile: function(fileURL, localFile, callback){

      log.grn(' > trying to download image: '+fileURL+' ...');

      http.get({url: fileURL} , './files/'+localFile, function(err, download){
        if (err) { throw err; }

        log.grn(' > image downloaded at: '+download.file);
        callback(download);
      });

    }

}; //trashCan...

//Init app
trashCan.start();
