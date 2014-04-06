define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var tile = function(x, y, s, c){
	jam.Sprite.call(this, x, y);

    var img = new proto.sq(s, c);

    this.setImage(img.toDataURL(), s, s);

  };

  tile.prototype = new jam.Sprite(0, 0);

  tile.prototype.setColor = function(c){
    var img = new proto.sq(this.width, c);
    this.setImage(img.toDataURL(), this.width, this.height);
  }

  var board = function(o){
    this.w = o.w;
    this.h = o.h;
    this.border = o.border;
    this.e = o.e;
    var i, j, t;
    var sx, sy;
    this.tiles = [];
    for (i = 0; i < o.w; i++){
      this.tiles[i] = [];
      for (j = 0; j < o.h; j++){
        sx = o.border + (i * o.e) + (i * o.border);
        sy = o.border + (j * o.e) + (j * o.border);

        t = new tile(sx, sy, o.e, o.bg_color);

        this.tiles[i][j] = t;
        o.s.add(t);
      }
    }

  };

  board.prototype.getCoord = function(x, y){
    var i, j, t;
    for (i = 0; i < this.w; i++){
      for (j = 0; j < this.h; j++){
        t = this.tiles[i][j]
        if (x > t.x && x < t.x + t.width && y > t.y && y < t.y + t.height){
          return {
            x: i,
            y: j
          };
        }
      }
    }
  };

  board.prototype.color = function(x, y, r, g, b){
    var color;
    if (g == undefined){
      color = r;
    } else {
      color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    this.tiles[x][y].setColor(color);
  };

  board.prototype.drawLaser = function(path, ctx, r, g, b){
    var color;
    if (g == undefined){
      color = r;
    } else {
      color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    var i;
    var lx, ly;
    var ix = this.border + (path[0].x * this.e) + (path[0].x * this.border) - Math.floor(this.e/2);
    var iy = this.border + (path[0].y * this.e) + (path[0].y * this.border) - Math.floor(this.e/2);
    ctx.moveTo(ix, iy);
    for (i = 0; i < path.length; i++){
      lx = this.border + (path[i].x * this.e) + (path[i].x * this.border) - Math.floor(this.e/2);
      ly = this.border + (path[i].y * this.e) + (path[i].y * this.border) - Math.floor(this.e/2);

      ctx.lineTo(lx, ly);
    }
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  return board;
});
