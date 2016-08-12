
var getStores = function (){

	$.ajax({
		url:"http://localhost:3000/stores",
	}).done(function(response){
		console.log(response)
	});

};

$(document).ready(function(){
	console.log("javascript connnected")

	getStores();
	$( "#stores" ).autocomplete({

		source: ["a","b","c"],
		minLength: 1,
		
    });
});




