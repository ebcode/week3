dbg = document.getElementById('debug');
/*
world = [
[0,0,0,0,0],
[0,0,1,0,0],
[0,0,0,0,0],
[0,0,0,0,0],
[1,1,1,1,1],
]; 
*/
world = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0],
[0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

tileDim=16;

worldHeight=world.length;
worldWidth=world[0].length;

//alert(world[0][0]);
bgTiles = ['sky.png','wall.png','brick.png'];
images = [];
all_images_loaded=0;
images_loaded=0;
images_to_load = bgTiles.length;

for (i=0; i<images_to_load; i++){
    images[i] = new Image();
    images[i].addEventListener('load',function(){
        images_loaded += 1;
       
        if(images_loaded == images_to_load){
            //alert('yay!');
            draw_world();
        }
       
        },false);
        images[i].src = bgTiles[i];
}
str="";
draw_world = function(){
    r=0;
    c=0;
    for(i=0;i<worldHeight;i++){
        for(j=0;j<worldWidth;j++){
            str=str+world[i][j];
            ctx.drawImage(images[world[i][j]],j*tileDim,i*tileDim);
        }
        str += '\n';
    }
    //alert(str);
}
