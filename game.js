/* Game code.
 * thoughts: 
 *  -- canvas stuff moved to its own file
 *  -- world stuff moved to its own file ... happening a bit already w/ map, tilesize
 *  -- lastRow 
 */

can=document.getElementById("c")
var ctx = can.getContext('2d');
ctx.fillStyle = 'green';

counter =0;
max_counter =10;
slow_on=0;
gravity =1;
gravity_on =1;
friction =0.65;
air_friction =0.95;
playerRow =0;
playerCol =0;
hittable=0;
lastRow = 0;
lastCol = 0;

guys=3;

platform ={
    x:50,
    y:250,
    w:250,
    h:10,
    draw:function(){
        ctx.fillRect( this.x, this.y,this.w, this.h);
    },
}
/*
function collide(player,platform){
    if(player.x > platform.x && player.x < platform.x + platform.w
       && player.y + player.h > platform.y && player.y +player.h < platform.y + platform.h ){
        player.onground=1;
        player.yv=0;
    } else {
        player.onground = 0;
    }
}
*/

function collide(player, enemy){
	if(player.x + player.w >= enemy.x && player.x < enemy.x + enemy.w
       && player.y + player.h >= enemy.y && player.y +player.h <= enemy.y + enemy.h ){
        //console.log('enemy touch');
        if(player.falling){
			player.yv*=-1;
			enemy.dead=1;
		} else {
			do_die();
		}
    } 
}

enemy = {
	x:10*tileDim,
	y:13*tileDim,
	w:16,
	h:16,
	xv:-1,
	yv:0,
	dead:0,
	fillStyle:'red',
	draw:function(){
		if(!this.dead){
		ctx.fillStyle = 'red';
        ctx.fillRect( this.x, this.y,this.w, this.h);
		}
    },
	update:function(){
		this.x=Math.floor(this.x+this.xv);
        this.y=Math.floor(this.y+this.yv);
        
        get_enemy_grid_pos(this.x,this.y);
        
        var left_hittable = get_hittable(enemyRow,enemyCol-1);
       
       if(left_hittable){
		   //this.x=lastCol*tileDim;
		   if(this.x+this.xv<=enemyCol*tileDim){
			this.xv*=-1;
			//this.x = lastCol*tileDim;
			this.x = enemyCol*tileDim;
		   }
	   }
	   
	   var right_hittable = get_hittable(enemyRow,enemyCol+1);
       
       if(right_hittable){
		   //this.x=lastCol*tileDim;
		   if(this.x+this.xv>=enemyCol*tileDim){
			this.xv*=-1;
			//this.x = lastCol*tileDim;
			this.x = enemyCol*tileDim;
		   }
	   }
        
	},
	};

player = {
    x:14*tileDim,
    y:13*tileDim,
    w:16,
    h:16,
    xv:0,
    yv:0,
    max_xv:4,
    min_xv:-4,
    max_yv:20,
    onground:0,
    jumpStrength:-10,
    falling:1,
    jumping:0,
    draw:function(){
		ctx.fillStyle = 'green';
        ctx.fillRect( this.x, this.y,this.w, this.h);
    },
    update:function(){
        lastCol = playerCol;
        lastRow = playerRow;
        
        get_grid_pos(this.x,this.y);
        
        down_hittable = get_hittable(playerRow+1,playerCol);
       
       right_hittable = get_hittable(playerRow,playerCol+1);
       
       if(right_hittable){
		   //this.x=lastCol*tileDim;
		   if(this.x+this.xv>=playerCol*tileDim){
			this.xv=0;
			this.x = playerCol*tileDim;
		   }
	   }
       
       left_hittable = get_hittable(playerRow,playerCol-1);
       
       if(left_hittable){
		   //this.x=lastCol*tileDim;
		   if(this.x+this.xv<=playerCol*tileDim){
			this.xv=0;
			//this.x = lastCol*tileDim;
			this.x = playerCol*tileDim;
		   }
	   }
       
       up_hittable = get_hittable(playerRow-1,playerCol);
       
       if(up_hittable){
		   //this.x=lastCol*tileDim;
		   if(this.y+this.yv<=(playerRow)*tileDim){
			this.yv=0;
			//this.x = lastCol*tileDim;
			this.y = playerRow*tileDim;
		   }
		   if(up_hittable==2 && this.jumping){
			   world[playerRow-1][playerCol]=0; //breakable blocks
			   this.yv=0;
			}
	   }
       
       
       /*
       upleft_hittable = get_hittable(playerRow-1,playerCol-1);
       
       if(upleft_hittable && !this.onground){
		   //this.x=lastCol*tileDim;
		   if(this.y+this.yv<=(playerRow)*tileDim && this.x+this.xv<=playerCol*tileDim){
			this.yv=0;
			this.xv=0;
			//this.x = lastCol*tileDim;
			//this.y = playerRow*tileDim;
			//this.x = playerCol*tileDim;
		   }
	   }
       
       upright_hittable = get_hittable(playerRow-1,playerCol+1);
       
       if(upright_hittable &&!this.onground){
		   //this.x=lastCol*tileDim;
		   if(this.y+this.yv<=(playerRow)*tileDim && this.x+this.xv>=playerCol*tileDim){
			this.yv=0;
			this.xv=0;
			//this.x = lastCol*tileDim;
			//this.y = playerRow*tileDim;
			//this.x = playerCol*tileDim;
		   }
	   }
       */
        if(down_hittable && this.yv>0 && !this.onground){
			
		    //this.yv=0;
		    //this.x=lastCol*tileDim;
		    //this.y=lastRow*tileDim;  // adjust y to landed-on tile
		    //this.onground=1;
		    //this.falling=0;
		    if(this.y+this.yv>=playerRow*tileDim){
				this.yv=0;
				this.y = playerRow*tileDim;
				this.onground=1;
				this.falling=0;
			}
		    
		}
		
		
		if(this.onground && !down_hittable){
		   this.onground=0;
		   this.falling=1;
	   }
		
		//debug('x: '+this.x);
		
       /*
        dbg.innerHTML='';
        dbg.innerHTML+='x:'+this.x +'<br>';
        dbg.innerHTML+='y:'+this.y+'<br>';
        dbg.innerHTML+='xv:'+ Math.round( this.xv*100 )/100 +'<br>';
        dbg.innerHTML+='yv:'+ Math.round( this.yv*100 )/100+'<br>';
        dbg.innerHTML+='row:'+playerRow +'<br>';
        dbg.innerHTML+='col:'+playerCol+'<br>';
		dbg.innerHTML+='hittable:'+hittable+'<br>';
		dbg.innerHTML+='falling:'+this.falling+'<br>';
       dbg.innerHTML+='onground:'+this.onground+'<br>';
       */
        this.x=Math.floor(this.x+this.xv);
        this.y=Math.floor(this.y+this.yv);
        
        //reset player at boundries
        if(this.x>can.width)this.x=0;
        if(this.y>can.height)this.y=0;
        if(this.x<0)this.x=can.width;
        if(this.y<0)this.y=can.height;
        
        
        
        
        
        //adjust velocity
        if(gravity_on){
            if(!this.onground){
                this.yv =this.yv+gravity;
                this.yv = this.yv*air_friction;
                this.xv = this.xv*air_friction;
            } else {
				//this.yv =0;
                this.xv = this.xv*friction;
            }
        } else {
            //this.yv = Math.floor(this.yv * air_friction);
            //this.xv = Math.floor(this.xv * air_friction);
            this.yv = (this.yv * air_friction);
            this.xv = (this.xv * air_friction);
        }
        
        
        //limit player velocity
        if(this.yv > this.max_yv){
            this.yv = this.max_yv;
        }
        if(this.yv < this.max_yv - this.max_yv*2){
            this.yv = this.max_yv - this.max_yv*2;
        } 
        if(this.xv > this.max_xv){
            this.xv = this.max_xv;
        }
        if(this.xv < this.min_xv){
            this.xv = this.min_xv;
        }
        //at a certain speed, set to 0
        if(Math.abs(this.xv) < 0.15){
			this.xv=0;
		}
		if(Math.abs(this.yv) < 0.15){
			this.yv=0;
		}     
		if(this.jumping){
			if(this.yv>=0){
				this.jumping=0;
				this.falling=1;
			}
		
		}  
    }, 
};
   
keyboard={};   
document.onkeydown=function(evt){
    switch(evt.keyCode){
        case 37:
        keyboard.LEFT=1;
        break;
        case 38:
        keyboard.UP=1;
        break;
        case 39:
        keyboard.RIGHT=1;
        break;
        case 40:
        keyboard.DOWN=1;
        break;
    }   
}
   
document.onkeyup=function(evt){
    switch(evt.keyCode){
        case 37:
        keyboard.LEFT=0;
        break;
        case 38:
        keyboard.UP=0;
        break;
        case 39:
        keyboard.RIGHT=0;
        break;
        case 40:
        keyboard.DOWN=0;
        break;
    }   
}

function pollKeyboard(){
    if(keyboard.UP){ //jumping code
        if(gravity_on){
            if(player.onground){
                player.yv = player.jumpStrength;
                player.onground=0;
                player.jumping=1;
            }
        }else{
            player.yv-=1;
        }
    }
    if(keyboard.DOWN){
        player.yv+=1;
    }
    if(keyboard.RIGHT){
		
		
        player.xv+=1;
		
    }
    if(keyboard.LEFT){
		
        player.xv-=1;
		
    }
}

function gameloop(){
	t0 = performance.now();
    if(counter < max_counter && slow_on) {
        counter +=1;
    } else {
        counter=0;
    ctx.clearRect(0,0,can.width, can.height);
    draw_world();
    pollKeyboard();
    player.update();
    //collide(player,platform);
    enemy.update();
    if(!enemy.dead){
		collide(player,enemy);
	}
    highlight_grid_pos(playerRow,playerCol);
    //platform.draw();
    player.draw();
    enemy.draw();
    }
    t1 = performance.now();
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");   
    ctx.fillText(Math.round((t1 - t0))+ " ms", 10, 10);
    //draw_fps();
    
    //window.requestAnimationFrame(gameloop);
    setTimeout(gameloop,20);
}
setTimeout(gameloop,20);
//window.requestAnimationFrame(gameloop);

highlight_grid_pos = function(x,y){
    ctx.strokeStyle='white';
    ctx.strokeRect(y*tileDim,x*tileDim,tileDim,tileDim);
}

get_grid_pos = function(x,y){
	playerCol = Math.floor((x+tileDim/2)/tileDim);
	playerRow = Math.floor((y+tileDim/2)/tileDim);
	//debug('playerCol:'+playerCol+', playerRow:'+playerRow);
}

get_enemy_grid_pos = function(x,y){
	enemyCol = Math.floor((x+tileDim/2)/tileDim);
	enemyRow = Math.floor((y+tileDim/2)/tileDim);
	//debug('playerCol:'+playerCol+', playerRow:'+playerRow);
}

get_hittable = function(row,col){
	if ( world[row]) {
		return world[row][col];
	}
}
last_time=0;

do_die = function(){
	guys = guys -1;
	
	player.x=14*tileDim;
    player.y=13*tileDim;
    	
    	
	if(guys<=0){
		console.log('game over');
	}
}

function draw_fps(){
	time = performance.now();
	delta_time = Math.round(time - last_time);
	last_time = time;
	ctx.fillText(delta_time, 10, 10);
}

debug = function(msg){
if(msg!=this.lastmsg){
dbg.innerHTML=msg+'<br>'+dbg.innerHTML;
}
this.lastmsg=msg;
}


window.onload=function(){
	can.focus();
}
