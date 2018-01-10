$(function(){
	console.log("ready");
	var myNav = $(".navtop");
	var NavHeight = myNav.position().top;
	var collapsed = false;
	var bStorage = false;
	var pTotal = 0;
	if (typeof(Storage) !== "undefined") { //checking for local storage
		bStorage = true;
		var pickercol = localStorage.getItem("bancolour");
		$(".colchange").css("background-color",pickercol);
	} else {
		$(".colchange").css("background-color","#0a84b3");
	}
	$(".clicked").css("background-color","#000000");
	
	$(".buybutton").click(function cartAdd(){
		var item = this.closest(".item");
		var itemname = $(item).data("itemname");
		//console.log(itemname);
		var itemprice = $(item).data("price");
		//console.log(itemprice);
	
		var cartList = $("#itemlist > table > tbody > tr .name").filter(function(index){
			return $(this).text() == itemname
		});
		if (cartList.length >0){
			
			var qty = $(cartList).parent().find(".quantity").text();
			qty = parseInt(qty)+ 1;
			$(cartList).parent().find(".quantity").text(qty); //updating quantity
			
			var cuPrice = $(cartList).parent().find(".price").text();
			cuPrice= parseInt(cuPrice)+itemprice;
			$(cartList).parent().find(".price").text(cuPrice); //updating price
		}
		else{
			$("#itemlist > table > tbody").append("<tr><td class='name'>"+itemname+"</td><td class='price'>"+itemprice+"</td><td class='quantity'>1</td></tr>");	
		}
		
		var priceList = $("#itemlist > table > tbody > tr .price");
		pTotal =0;
		for(var i=0;i<priceList.length;i++){
			//Yu mu gway gway vi de sao
			pTotal += parseInt($(priceList[i]).text());
		}
		$("#total").text("Total cost:"+parseInt(pTotal));
	
		
	});

	
	
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
		pickercol = $(this).css("background-color");
		console.log(pickercol+" = colour selected");
		$(".colchange").css("background-color",pickercol);
		if (bStorage) {
			localStorage.setItem("bancolour",pickercol);
		} 
		else {
			//if local storage is not supported
		}
		$(".clicked").css("background-color","#000000");
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
