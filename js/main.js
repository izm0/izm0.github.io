var backgcol;
var winheight;

$(function(){
    console.log("ready!");
	winheight = window.innerHeight;
	$('body').css("height",winheight);
	if(localStorage && localStorage.getItem('backgcol')){
		backgcol = JSON.parse(localStorage.getItem('backgcol'));
		$('body').css("background-color",backgcol);
	}
	$('#inputcol').change(function(){
		console.log('getting to here');
		backgcol = this.value;
		localStorage.setItem('backgcol',JSON.stringify(backgcol));
		console.log(backgcol);
		$('body').css("background-color",backgcol);
		
			
	});
});

