$(function(){
	console.log("ready");
	var myNav = $(".navtop");
	var NavHeight = myNav.position().top;
	$(window).scroll(function stick() {
		if ($(this).scrollTop() > NavHeight){
			console.log("Applying class");
			myNav.addClass("sticky");
		} else {
			myNav.removeClass("sticky");
			console.log("Removing class");
		}
		
	});
	
	
	
	
});
