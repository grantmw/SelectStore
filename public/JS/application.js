$(document).ready(function(){
	console.log("javascript connnected")
	$( "#stores" ).autocomplete({

		source: ["a","b","c"],
		minLength: 1,
		
    });
});

