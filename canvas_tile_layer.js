function CanvasTileLayer(canvasSetupCallback, filter, tileOptions) {
    this.tileOptions = tileOptions;
    this.tileSize = new google.maps.Size(256,256);
    this.maxZoom = 19;
    this.name = "Tile #s";
    this.alt = "Canvas tile layer";
    this.tiles = {};
    this.canvasSetupCallback = canvasSetupCallback;
    this.filter = filter;
}


CanvasTileLayer.prototype.setupCanvas = function (canvas, coord, zoom) {
    var image = new Image();  
    var ctx = canvas.getContext('2d');
    var yVal = coord.y;
    if(this.tileOptions.adjustForGoogleMapsV3){
        bound = Math.pow(2, zoom);
        yVal = (bound - coord.y - 1);
    }
    image.src = this.tileOptions.baseUrl + zoom + "/"+ coord.x + "/" + yVal +".png";
    
    canvas.image = image;
    $(image).load(function() { 
        //ctx.globalAlpha = 0.5;
        ctx.drawImage(image, 0, 0);  
        App.heightLayer.filter_tile(canvas, [App.threshold, App.prevThreshold]);
    });

    if(this.canvasSetupCallback) {
        this.canvasSetupCallback(canvas, coord, zoom);
    }
}

// create a tile with a canvas element
CanvasTileLayer.prototype.create_tile_canvas = function(coord, zoom, ownerDocument) {
      
      // create canvas and reset style
      var canvas = ownerDocument.createElement('canvas');
      canvas.style.border = "none";
      canvas.style.margin= "0";
      canvas.style.padding = "0";

      // prepare canvas and context sizes
      var ctx = canvas.getContext('2d');
      ctx.width = canvas.width = this.tileSize.width;
      ctx.height = canvas.height = this.tileSize.height;
    
      //set unique id 
      var tile_id = coord.x + '_' + coord.y + '_' + zoom;
      canvas.setAttribute('id', tile_id);
      if(tile_id in this.tiles) {
        delete this.tiles[tile_id];
      }
      this.tiles[tile_id] = canvas;

      this.setupCanvas(canvas, coord, zoom);

      return canvas;

}

CanvasTileLayer.prototype.filter_tile = function(canvas, args) {
    var ctx = canvas.getContext('2d');
    ctx.drawImage(canvas.image, 0, 0);  
    var I = ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.filter.apply(this, [I.data, ctx.width, ctx.height].concat(args));
    ctx.putImageData(I,0,0);
}

// render visible tiles on a canvas, return a canvas object
// map: map where tiles are rendering
CanvasTileLayer.prototype.composed = function(map, w, h) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.width = canvas.width = w || $(map).width();
    ctx.height = canvas.height = h || $(map).height();
    for(var i in this.tiles) {
        var t = this.tiles[i];
        var mpos = $(map).offset();
        var pos = $(t).offset();
        ctx.drawImage(t, pos.left - mpos.left, pos.top - mpos.top);
    }
    return canvas;
}

CanvasTileLayer.prototype.filter_tiles = function() {
    var args = [];
    for (var i in arguments) {
        args.push(arguments[i]);
    }
    for(var c in this.tiles) {
        this.filter_tile(this.tiles[c], args);
    }
}
CanvasTileLayer.prototype.getTile = function(coord, zoom, ownerDocument) {
  // could be called directly...
  return this.create_tile_canvas(coord, zoom, ownerDocument);
};

CanvasTileLayer.prototype.releaseTile = function(tile) {
    var id = tile.getAttribute('id');
    delete this.tiles[id];
};
