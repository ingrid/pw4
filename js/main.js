require.config({
  baseUrl:"jam/",
});

var p;

require(["jam", "../lib/sylvester", "../js/proto", "../js/util", "../js/board"], function(jam, syl, proto, util, board){
  jam.config({dataDir:"data/"});

  var g = new jam.Game(489, 489, document.body);

  var main = function() {
	var s = g.root.scene;
    var b = new board({
      x: 0,
      y: 0,
      w: 8,
      h: 8,
      e: 60,
      border: 1,
      bg_color: "rgb(200, 200, 200)",
      border_color: "rgb(255, 255, 255)",
      s: s
    });

    g.bgColor = 'rgb(255, 255, 255)';

    s.on("render", function(dt){
      if (jam.Input.justPressed("MOUSE_LEFT")){
        var co = jam.Input.mouse;
        console.log(b.getCoord(co.x, co.y));
      }
/** /
      var fake_laser = [
        {
          x: 1,
          y: 2
        },
        {
          x: 3,
          y: 4
        },
        {
          x: 6,
          y: 6
        }
      ];

      b.drawLaser(fake_laser, g._context, 255, 0, 0);
      /**/
    });

    g.run();
  };

  var preload = function() {
	jam.showPreloader(main);
  };

  preload();

  /**/
  window.setTimeout(function(){
    window.console.log = function(){
    };
  }, 3000);
  /**/
});
