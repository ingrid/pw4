// A collection of helpful snippets for prototyping in jam.

define(["jam"], function(jam) {
  var proto = {};
  proto.rect = function(w, h, r, g, b) {
    var color;
    if (g == undefined){
      color = r;
    } else {
      color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);

    return canvas;
  };

  proto.sq = function(s, r, g, b) {
    return proto.rect(s, s, r, g, b);
  };

  proto.cir = function(r, r, g, b) {

  };

  proto.text = function(x, y, txt){
    jam.Sprite.call(this, x, y);

    this.text = txt || "";
    this.font = "";
    this.color = ""
    this.alpha = 1.0;

    this.render = function(context, camera){
	  if(!this.visible) { return; }

      context.save();

	  if(this.alpha !== 1.0){ context.globalAlpha = this.alpha; }

      context.font = this.font;
      context.fillStyle = this.color;

      context.fillText(this.text,
                       this.x,
                       this.y);

	context.restore();
    };
  };

  proto.text.prototype = new jam.Sprite(0, 0);

  return proto;
});
