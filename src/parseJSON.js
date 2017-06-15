// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //input always a string
  var index = 0;
  var output = {};

  function objOrArrayParse(json){
	  //parseObj or Array
		//first char is a { or [
		//slice off outer object/array
		//determine if next char an object or a value, call function for that

	  if(json[index] === '{') {

  	} else if(json[index] === '[') {

  	}

  }



  //parseValue
  	//check if string
  		//if yes, find ending "
  		//worry about escape characters
  	//check if...
  		//: next char, make this key and call value or object on next section (after the :)
  		//, next char, call value or object on next section (after the ,)
  //function valOrObjOrArray
  	//takes in a string, returns whether the next item in array is a value, array or object, runs appropriate function

  	return output;
};
