
var allStoreObjects;
var searchTerms = [];

var getStores = function (){

	$.ajax({
		url:"http://localhost:3000/stores",
	}).done(function(response){
		allStoreObjects = response["stores"]
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
		console.log(response)
	})

};

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

