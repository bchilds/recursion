// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //input always a string

  function parseObj(json){
		//find : index for each property, determineParse each property
		var objOut = {};



		return objOut;
  } //end parseObj

  function parseArray(json){
  	//input is a string, output is an array
  	//find each element and determineParse it
  	var array = [];


  	return array;
  } //end parseArray

  function parseString(json){
 
  } //end parseString

  function parseValue(json){

  } //end parseValue

  function determineParse(json){
  	//run on json to run appropriate functions on each element as we come across it
  	
		var initChar = json[0];

		if(initChar === '{'){
			if(json[json.length - 1] === '}'){
				return parseObj(json);
			} else { 
				//throw error
			}
		} else if(initChar === '[') {
			if(json[json.length - 1] === ']'){
				return parseArray(json);
			} else { 
				//throw error
			}

		} else if(initChar === '"') {
			return parseString(json);
		} else if(initChar === '\\'){
			//do something
		} else {
			//it's a value, run parseValue
			return parseValue(json);
		}
  	//get first char of element
  	//if it is {, we will parse obj
  		//iterate along to find matching }, will need counter
  	//if it is [, we will parse array
  		//iterate along to find matching ], will need counter
  	//if it is ", we will parse string
  		//iterate until find next ", everything in that is the string
  	//otherwise, parse as value
  	//handle \
  }

  	return determineParse(json);
};
