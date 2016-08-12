
var allStoreObjects;
var searchTerms;

var getStores = function (){

	$.ajax({
		url:"http://localhost:3000/stores",
	}).done(function(response){
		console.log(response)
		allStoreObjects = response["stores"]
		for (var i=0; i<allStoreObjects.length; i++){
            searchTerms.push(allStoreObjects[i]["to_search_s"])
        }
	});

};

$(document).ready(function(){
	console.log("javascript connnected")

	getStores();
	$("#stores").autocomplete({

		source: searchTerms,
		minLength: 1,
		
    });
});




