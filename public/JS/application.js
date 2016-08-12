$(document).ready(function(){
	getStores();
	$("#stores").autocomplete({
		source: searchTerms,
		minLength: 3,
		select: function( event, ui ) {
			assignStore(ui.item.value)
		}
    });
});

var allStoreObjects,
	searchTerms = [];

var getStores = function (){
	$.ajax({
		url:"http://localhost:3000/stores",
	}).done(function(response){
		allStoreObjects = response
		for (var i=0; i<allStoreObjects.length; i++){
            searchTerms.push(allStoreObjects[i]["to_search_s"])
        }
	});
};

var assignStore = function(storeSearchString){
	$.ajax({
		url:"http://localhost:3000/users/1",
		method: "PUT",
		data: {storeSearchString: storeSearchString}
	}).done(function(response){
		console.log(response["to_search_s"].split(","))
		$(".profile").prepend("Your Selected Store: " + "<br>" + responseBuilder(response["to_search_s"].split(",")))
		swapHandler()
	});
};

var responseBuilder = function(searchArray) {
  return `<h3>${searchArray[0]}</h3><h5>${searchArray[1]}</h5><h5>${searchArray[1]}${searchArray[2]}, ${searchArray[3]}</h5>`
};

$("button").on("click", function(){
	swapHandler()
	$("#stores").val(" ")
	$(".ui-menu-item").hide()
});

var swapHandler = function() {
	$(".profile").toggle()
	$(".ui-widget").toggle()
};