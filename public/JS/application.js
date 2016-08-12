$(document).ready(function(){
	getStores();
	getUser(1);
	$("#stores").autocomplete({
		source: searchTerms,
		minLength: 3,
		select: function( event, ui ) {
			assignStore(ui.item.value)
		},
		open: function(event, ui) {
	        var ul = $(this).autocomplete('widget'),offset=ul.offset();
	        ul.offset({top:offset.top+30});
		}
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
    	var storeArray = item.value.split(",");
    	return $( "<li>" )
        .append( "<div>" + storeInfoBuilder(storeArray) + "</div>" )
        .appendTo( ul );
    };
});

var allStoreObjects,
	searchTerms = [];

var getStores = function (){
	$.ajax({
		url:"http://localhost:3000/stores",
	}).done(function(response){
		allStoreObjects = response;
		for (var i=0; i<allStoreObjects.length; i++){
            searchTerms.push(allStoreObjects[i]["to_search_s"]);
        }
	});
};

var assignStore = function(storeSearchString){
	$.ajax({
		url:"http://localhost:3000/users/1",
		method: "PUT",
		data: {storeSearchString: storeSearchString}
	}).done(function(response){
		var selectedStoreArray = response["to_search_s"].split(",")
		$(".selected-store").html(storeInfoBuilder(selectedStoreArray));
		swapHandler();
	});
};

var getUser = function(id){
	$.ajax({
		url:"http://localhost:3000/users/" + id.toString()
	}).done(function(response){
		$(".user-message").html("Hey " + response["name"] + "!" + "<br>");
	});
};

var storeInfoBuilder = function(searchArray) {
	return `${searchArray[0]}<br>${searchArray[1]}<br>${searchArray[2]}, ${searchArray[3]} ${searchArray[4]}`;
};


$("button").on("click", function(){
	swapHandler();
	$("#stores").val(" ");
	$(".ui-menu-item").hide();
});

var swapHandler = function() {
	$(".profile-container").toggle();
	$(".selection-container").toggle();
};