actor = function(f,o,t){
var a = {};
a.o=o;
a.stop=function(){
	this.go=0;
};
a.start=function(){
	this.go=1;
	this.run();
}
a.go=1;
a.clock=0;
a.run=function(){	
    if(a.go){
		a.clock+=1;
	    f.call(a);
        sleep(t).then(() => {
	        requestAnimationFrame(a.run);
	    });
    }
return this;
}
return a;
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
