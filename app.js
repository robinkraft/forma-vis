// optimized version for threshold rendering
function CanvasTileLayerThreshold (canvasSetupCallback, filterCallback, tileOptions) {

    // Call the parent construction... because this prototype is an extention of CanvasTileLayer
    CanvasTileLayer.call(this, canvasSetupCallback, filterCallback, tileOptions);
    this.threshold = 0;
}

CanvasTileLayerThreshold.prototype = new CanvasTileLayer();

CanvasTileLayerThreshold.prototype.filter_tiles = function() {
    var new_threshold = arguments[0];
    CanvasTileLayer.prototype.filter_tiles.apply(this, arguments)
    this.threshold = new_threshold;
}

CanvasTileLayerThreshold.prototype.filter_tile = function(canvas, args) {
    var new_threshold = args[0];
    var ctx = canvas.getContext('2d');
    if(new_threshold != this.threshold) {
        ctx.drawImage(canvas.image, 0, 0);  
    }
    var I = ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.filter.apply(this, [I.data, ctx.width, ctx.height].concat(args));
    ctx.putImageData(I,0,0);
}


function objectMerge(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}


var App = function(config) {
        var me = {
            initialThreshold: 0,
            threshold: 0,
            prevThreshold: 0,
            config: {
                slider: {
                    min: 0,
                    max: 100,
                    onSlideFunc: null
                },
                tiles: {
                    baseUrl: "/proxy/mountainbiodiversity.org/env/z",
                    adjustForGoogleMapsV3: false
                },
                map: {
                    zoom: 3,
                    center: new google.maps.LatLng(41.850033,-87.6500523),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                canvasSetupCallback: null
            }
        };

        me.filter = function(image_data, w, h, threshold, oldThreshold) {
            var components = 4; //rgba
            var pixel_pos;
            // console.log('calling filter with threshold: ' + threshold);
            for(var i=0; i < w; ++i) {
                for(var j=0; j < h; ++j) {
                    var pixel_pos = (j*w + i) * components;
                    if(image_data[pixel_pos] < threshold) {
                        image_data[pixel_pos] = image_data[pixel_pos + 1] = image_data[pixel_pos + 2] = 0;
                        image_data[pixel_pos + 3] = 0;
                    }
                }
            }
        };

        me.init = function(layer, customConfig) {
            if(customConfig){ 
                this.config.map     = objectMerge(this.config.map, customConfig.map);
                this.config.tiles   = objectMerge(this.config.tiles, customConfig.tiles);
                this.config.slider  = objectMerge(this.config.slider, customConfig.slider);
                if(customConfig.filterTileCallback){
                    this.filter = customConfig.filterTileCallback;
                }
            }
          
            var map = new google.maps.Map(document.getElementById("map"), this.config.map);
            this.heightLayer = layer || new CanvasTileLayerThreshold(this.config.canvasSetupCallback, this.filter, this.config.tiles);
            map.overlayMapTypes.insertAt(0, this.heightLayer);
            this.map = map;
            this.setup_ui();
        }

        me.setup_ui = function() {
            var that = this;
            $("#slider").slider({
                min: that.config.slider.min,
                max: that.config.slider.max,
                slide: function(event, ui) {  
                    if(that.config.slider.onSlideFunc){
                        that.config.slider.onSlideFunc.call(this, ui.value);
                    }
                    
                    // TODO: accommodate in demo: $("#slider_value").html(7889*ui.value/100.0 + " meters");
                    that.threshold = ui.value;
                    that.heightLayer.filter_tiles(ui.value, that.prevThreshold); // TODO: accommodate in demo, *256.0/100.0);
                    that.prevThreshold = ui.value;
                }
            });
        }
        return me;
    }();

