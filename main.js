var progID = 'miyajima';
var debug = true;

var saved = false;
var userName;

var window_w = window.innerWidth;
var window_h = window.innerHeight;

var tile_w;
var tile_h;

var num_t_x = 15;
var num_t_y = 10;
var num_tiles = num_t_x * num_t_y;
var margin = 2;
var padding = 2;

//var min_w = 200;
//var min_h = 100;

var fontSize = 15;

var id_list = null;

var tile = new Array();

function mydebug(msg){
	if(debug)
		console.log(msg);
}
function keys(object) {
	var results = [];
	for (var property in object){
		results.push(property);
	}
	return results;
}
function setSize(){
}

function initial(){
	makeTiles();
	var ad = $('#fc2_footer');
	if(ad) ad.remove();
	setInterval(onTimer,20);
}

function makeTiles(){
	for(var i=0;i<num_t_x;i++){
		for(var j=0;j<num_t_y;j++){
			 $('div#main').append('<div class="tile" id="t'+(i+j*num_t_x)+'"><div class="tile_inside" id="tin'+(i+j*num_t_x)+'"></div></div>');
			 tile[i+j*num_t_x] = $('#t'+(i+j*num_t_x),'div#main');
		}
	}
	for(var i=0;i<num_tiles;i++){
		timeTable[i] = null;
	}
	retile();
	loadPics();
}


$(window).bind('load', initial);

$(window).bind('resize',function(){
	window_w = window.innerWidth;
	window_h = window.innerHeight;
	retile();
});

function retile(){
	tile_w = Math.floor((window_w - margin*(num_t_x+1))/num_t_x);
	tile_h = Math.floor((window_h - margin*(num_t_y+1))/num_t_y);
	for(var i=0;i<num_t_x;i++){
		for(var j=0;j<num_t_y;j++){
			$('#t'+(i+j*num_t_x),'div#main').css({width:''+tile_w+'px', height:''+tile_h+'px',
			left:i*(tile_w+margin)+margin,top:j*(tile_h+margin)+margin});
		}
	}
	$('.tile_inside').css('padding',padding);
	$('div#main').css('display','none');
	$('div#main').css('display','block');
}

function loadPics(){	
	stopped = false;
	for(var i=0; i<num_tiles; i++){
		$('#tin'+i).html('<img src="./img/1.gif" style="display:none;"/>');	
		setTimeout("setRandPic("+i+");",
			randInt(100,10000));
	}
	setTimeout(suddenDeath,randInt(30000,60000));
}

var timeTable = new Array();
var duration = new Array();
var currentNum = new Array();

function setRandPic(i){
	$('img','#tin'+i).css('display','block');
	if(Math.random()<0.5)
		duration[i] = randInt(1,100);
	else
		duration[i] = randInt(100,500);
	timeTable[i]=duration[i];
	currentNum[i]=0;
}

var count = 0;
var stopped = false;

function onTimer(){
	if(stopped)
		return;
	count++;
	for(var i=0;i<num_tiles;i++){
		if(timeTable[i]!=null)
			timeTable[i] -= 1;
		if(timeTable[i]==0){
			currentNum[i]++;
			if(currentNum[i]==11)
				currentNum[i] = 1;
			$('#tin'+i).html('<img src="./img/'+currentNum[i]+'.gif" />');
			timeTable[i] = duration[i];
		}
	}
}
function suddenDeath(){
	stopped = true;
	setTimeout(eraseAll,randInt(800,1500));
}

function eraseAll(){
	$('img').remove();
	timeTable = new Array;
	duration = new Array;
	currentNum = new Array;
	setTimeout(loadPics,randInt(5000,10000));
}

function randInt(min,max){
	return min+Math.floor(Math.random()*(max-min+1));
}