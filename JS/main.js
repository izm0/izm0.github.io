$(function(){
	console.log("ready");
	var myNav = $(".navtop");
	var NavHeight = myNav.position().top;
	var collapsed = false;
	$(window).scroll(function stick() {
		if ($(this).scrollTop() > NavHeight){
			console.log("Applying class");
			myNav.addClass("sticky");
		} else {
			myNav.removeClass("sticky");
			console.log("Removing class");
		}
		
	});
	
	$(".picker").click(function(){
		console.log("getting to here");
		var pickercol = $(this).css("background-color");
		console.log(pickercol+" = colour selected");
		$(".colchange").css("background-color",pickercol);
		
	});
	
	$("#collarrow").click(function(){
		console.log("arrow clicked");
		if(!collapsed){
			$(this).addClass("rotate");
			$("#footer").addClass("collapse");
			collapsed = true;
		}
		else{
			$(this).removeClass("rotate");
			$("#footer").removeClass("collapse");
			collapsed = false;
		}
	});
	
	
	
});
