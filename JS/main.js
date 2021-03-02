$(function(){ //ensures document is ready before scripts are ran
	console.log("ready"); 
	var myNav = $(".navtop");
	var NavHeight = myNav.position().top; //used for applying sticky to navbar
	var collapsed = false; //used for button to collapse footer
	var bStorage = false;  //whether local storage is supported - used to apply a default
	var bMenu = false; // dropdown menu 
	var pickercol; //colour selected from footer
	var pTotal = 0;
	if($("#canvas").length != 0){ //if canvas exists on page (turtle.html)
		var c = $("#canvas")[0];
		//console.log(c);
	
		var ctx = c.getContext("2d");
		ctx.canvas.width = c.clientWidth;
		ctx.canvas.height = c.clientHeight;
		
		$(".canimg").draggable({
			revert:"invalid",
			helper:'clone',
			start: handleDragEvent //on start drag equivalent
	
		});
		
		$("#canvas").droppable({
			drop: handleDropEvent 
		});
		
		var lastDragX;
		var lastDragY;
		
		function handleDragEvent(event, ui){ //when a drag event is called on the draggable images in turtle.html

			var mouseStartX = event.clientX; //mouse location in window
			var mouseStartY = event.clientY;
			
			var targetStartX = ui.offset.left; //offset of image in window
			var targetStartY = ui.offset.top;
			
		
			lastDragX = mouseStartX-targetStartX; //lastDrag is the relative position of the mouse on the image
			lastDragY = mouseStartY-targetStartY;
		}
		
		function handleDropEvent(event, ui){ //when a draggable image is dropped onto the canvas
			var draggable = ui.draggable[0];
			//converting to the canvas local space
			
			var x = event.clientX - $("#canvas").offset().left - lastDragX; 
			var y = event.clientY - $("#canvas").offset().top - lastDragY;
			console.log("Pos",x,y);
			ctx.drawImage(draggable,x,y); //draws the image from the drop onto the canvas at that position
		}

	}
	$(".colchange").css("background-color","#0a84b3");	//updates the background colour of the colchange class
	
	$("#navbutt").click(function(){ //click handling for mobile
		if(bMenu==false){
			console.log($(this));
			bMenu = true;
			$(".headermob .navtop").css("display","block")
		}
		else{
			bMenu = false;
				$(".headermob .navtop").css("display","none")
		}
	});
	if (typeof(Storage) !== "undefined") { //checking for local storage
		bStorage = true;
		pickercol = localStorage.getItem("bancolour");
		$(".colchange").css("background-color",pickercol);
	} else {
		$(".colchange").css("background-color","#0a84b3");
	}
	updateImage($(".colchange").css("background-color"));
	$(".clicked").css("background-color","#000000");
	$("#backsel img").click(function(){
		console.log($(this));
		ctx.drawImage($(this)[0],0,0,ctx.canvas.width,ctx.canvas.height);
	});
	$(".buybutton").click(function cartAdd(){ //adds the items data to the cart
		var item = this.closest(".item");
		var itemname = $(item).data("itemname");
		//console.log(itemname);
		var itemprice = $(item).data("price");
		//console.log(itemprice);
	
		var cartList = $("#itemlist > table > tbody > tr .name").filter(function(index){
			return $(this).text() == itemname
		});
		if (cartList.length >0){ 
			//this increases the quantity in the cart and adds the price total for each item
			
			var qty = $(cartList).parent().find(".quantity").text();
			qty = parseInt(qty)+ 1;
			$(cartList).parent().find(".quantity").text(qty); //updating quantity
			
			var cuPrice = $(cartList).parent().find(".price").text();
			cuPrice= parseInt(cuPrice)+itemprice;
			$(cartList).parent().find(".price").text(cuPrice); //updating price
		}
		else{
			$("#itemlist > table > tbody").append("<tr><td class='name'>"+itemname+"</td><td class='price'>"+itemprice+"</td><td class='quantity'>1</td></tr>");	
			//appends a table row if the item has not been added before
		}
		
		var priceList = $("#itemlist > table > tbody > tr .price");
		pTotal =0;
		for(var i=0;i<priceList.length;i++){
			//this adds the price total for each item to a grand total at the bottom of the cart
			pTotal += parseInt($(priceList[i]).text());
		}
		$("#total").text("Total cost:"+parseInt(pTotal));
	
		
	});


	
	$(window).scroll(function stick() {
		//this is called when the window is scrolled and checks the position of the navbar height
		//vs the top of the screen
		if($(this)[0].innerWidth >= 721){
			if ($(this).scrollTop() > NavHeight){
				console.log("Applying class");
				myNav.addClass("sticky");
			} else {
				myNav.removeClass("sticky");
				console.log("Removing class");
			}
		}
		
	});

	$(".picker").click(function(){
		//when the colour picker is clicked 
		console.log("getting to here");
		pickercol = $(this).css("background-color");
		console.log(pickercol+" = colour selected");
		$(".colchange").css("background-color",pickercol);
		if (bStorage) {
			localStorage.setItem("bancolour",pickercol);
			//sets local storage for banner colour and style
		} 
		else {
			//if local storage is not supported
		}
		$(".clicked").css("background-color","#000000");
		updateImage($(".colchange").css("background-color"));
	});
	
	$("#collarrow").click(function(){
		console.log("arrow clicked");
		if(!collapsed){ //global variable used to keep track of footer state
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
	
	function updateImage(colActive){ 
		//updates the image in turtle.html with the correct bandana colour
		$(".turtle").addClass("hidden");
		
		if(colActive=="rgb(255, 0, 0)"){ //unhiding images based on color
			$("#col1").removeClass("hidden");			
		}
		else if (colActive=="rgb(247, 133, 46)"){
			$("#col2").removeClass("hidden");
		}
		else if (colActive=="rgb(10, 132, 179)"){
			$("#col3").removeClass("hidden");
		}
		else if (colActive=="rgb(102, 64, 105)"){
			$("#col4").removeClass("hidden");
		}
	};
	
});

