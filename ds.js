(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("ds",
{ "height":16,
 "layers":[
        {
         "data":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 1, 1, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 1, 1, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 1, 1, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         "height":16,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":16,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":16,
 "tilesets":[
        {
         "firstgid":1,
         "margin":0,
         "name":"hm",
         "properties":
            {

            },
         "spacing":0,
         "tilecount":0,
         "tileheight":1,
         "tilewidth":1
        }, 
        {
         "firstgid":1,
         "image":"ds_tilemap.png",
         "imageheight":64,
         "imagewidth":64,
         "margin":0,
         "name":"ds",
         "properties":
            {

            },
         "spacing":0,
         "tilecount":16,
         "tileheight":16,
         "tilewidth":16,
         "transparentcolor":"#ff00ff"
        }],
 "tilewidth":16,
 "version":1,
 "width":16
});