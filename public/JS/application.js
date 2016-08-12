$(document).ready(function(){
	getStores();
	getUser(1);
	$("#stores").autocomplete({
		source: searchTerms,
		minLength: 3,
		select: function( event, ui ) {
			assignStore(ui.item.value)
		},
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + dropdownBuilder(item.value) + "</div>" )
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
		$(".selected-store").html("Your Selected Store: " + "<br>" + selectedStoreBuilder(response["to_search_s"].split(",")));
		swapHandler();
	});
};

var getUser = function(id){
	$.ajax({
		url:"http://localhost:3000/users/" + id.toString()
	}).done(function(response){
		$(".welcome").html("Hey " + response["name"] + "!" + "<br>" + "Search and select your store!");
	});
};

var selectedStoreBuilder = function(searchArray) {
	return `<h3>${searchArray[0]}</h3><h5>${searchArray[1]}</h5><h5>${searchArray[2]}, ${searchArray[3]} ${searchArray[4]} </h5>`;
};

var dropdownBuilder = function(string) {
	var searchArray = string.split(",");
	return `${searchArray[0]}<br>${searchArray[1]}<br>${searchArray[2]} ${searchArray[3]}, ${searchArray[4]}`;
};

$("button").on("click", function(){
	swapHandler();
	$("#stores").val(" ");
	$(".ui-menu-item").hide();
});

var swapHandler = function() {
	$(".profile").toggle();
	$(".selection-container").toggle();
};