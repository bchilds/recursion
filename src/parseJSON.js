// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //input always a string

  function getElementIndices(json){
  	//returns an array of the element indices
  	
		//get all element indices (this is the index of a comma)
		//iterate across json to find each element
  	var elementIndices = [];
  	var end = 0;
  	var inQuotes = false;
		for(end; end < json.length; end++){
			//for each character in the obj string, check if it is a comma that is outside of a quote.
			if(json[end] === '"') { 
				inQuotes = !inQuotes; 
			} else if(json[end] === ',' && !inQuotes){
				elementIndices.push(end);
			}
		}
		elementIndices.push(json.length);	//add the end of the obj/array as well to get last element (includes undefined/empty)

		return elementIndices;
  }

  function parseObj(json){
		//find : index for each property, determineParse each property/key
		var objOut = {};
		var elementIndices = getElementIndices(json);

		//now, for each element, find the : and determineParse each key/pair
		//we know that we just want the elements and not the outer object brackets, so let's remove those now
		elementJson = json.slice(1, json.length - 1);
		var start = 0;
		for(var i = 0; i < elementIndices.length; i++){
			if( findChar( ':', elementJson.slice(start, elementIndices[i] - 1) ) > 0 ){ //if it can find the colon
				var colonIndex = findChar( ':', elementJson.slice(start, elementIndices[i] - 1) );
				var spacer = 0;
				if(elementJson[start + colonIndex + 1] === ' ') { spacer = 1;}
				objOut[ determineParse( elementJson.slice(start, start + colonIndex) ) ] = determineParse( elementJson.slice(start + colonIndex + 1 + spacer, elementIndices[i] - 1) ); 
				//objOut[stringBeforeColon] = stringAfterColon
				start = elementIndices[i] + 1;
			}
		}

		return objOut;
  } //end parseObj

  function parseArray(json){
  	//input is a string, output is an array
  	//find each element and determineParse it
  	var array = [];
  	elementJson = json.slice(1, json.length - 1);
  	var elementIndices = getElementIndices(elementJson);
  	var start = 0;
  	for(var i = 0; i < elementIndices.length; i++){
  		if(elementJson.slice(start, elementIndices[i]) !== ""){
  			array.push( determineParse( elementJson.slice(start, elementIndices[i]) ) );
  		}
  		var spacer = 0;
			if(elementJson[elementIndices[i] + 1] === ' ') { spacer = 1;}
  		start = elementIndices[i] + 1 + spacer;
  	}

  	return array;
  } //end parseArray

  function parseString(json){
  	var outString = json.slice(1,json.length - 1);
  	if(outString === undefined){ outString = ""; }
 		return outString;
  } //end parseString

  function parseValue(json){
  	//will be given a string containing only chars, no quotes
  	//need to check which of these set values this string is, convert
  	//possible values: true, false, null, number

  	if(json === 'null'){ return null; }
  	else if(json === 'true') { return true; }
  	else if(json === 'false') { return false; }
  	else {
  		var out = Number(json);
  		if(out !== NaN){
  			return out;
  		}
  	}

  } //end parseValue

  function findChar(char, string){
  	//character will be ':'
  	var objCounter = 0;
  	var arrayCounter = 0;
  	var indexOut = -1;

  	for(var i = 1; i < string.length; i++){
  		if(string[i] === '{'){ objCounter++; }
  		else if(string[i] === '['){ arrayCounter++; }
  		else if(string[i] === ']'){ arrayCounter--; }
  		else if(string[i] === '}'){ objCounter--; }

  		if(string[i] === char && objCounter === 0 && arrayCounter === 0 ){
  			indexOut = i;
  		}
  	}

  	return indexOut;

  }

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
			return parseValue(json.trim());
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
