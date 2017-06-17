// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //input always a string

  function getElementIndices(json){
  	//returns an array of the element indices
  	//also needs to check to make sure it is not within an array or object element inside checked obj/array

		//get all element indices (this is the index of a comma)
		//iterate across json to find each element
  	var elementIndices = [];
  	var end = 0;
  	var inQuotes = false;
  	var objCounter = 0;
  	var arrayCounter = 0;
		for(end; end < json.length; end++){
			//for each character in the obj string, check if it is a comma that is outside of a quote.
			if(json.charAt(end) === '"') { 
				inQuotes = !inQuotes; 
			} else if(json.charAt(end)  === '{'){ objCounter++; }
  		else if(json.charAt(end) === '['){ arrayCounter++; }
  		else if(json.charAt(end) === ']'){ arrayCounter--; }
  		else if(json.charAt(end) === '}'){ objCounter--; }
  		else if(json.charAt(end) === ',' && !inQuotes && objCounter === 0 && arrayCounter === 0){
				elementIndices.push(end);
			}
		}
		elementIndices.push(json.length);	//add the end of the obj/array as well to get last element (includes undefined/empty)

		return elementIndices;
  }

  function parseObj(json){
		//find : index for each property, determineParse each property/key
		var objOut = {};

		//now, for each element, find the : and determineParse each key/pair
		//we know that we just want the elements and not the outer object brackets, so let's remove those now
		var elementJson = json.slice(1, json.length - 1);
		var elementIndices = getElementIndices(elementJson);

		var start = 0;
		for(var i = 0; i < elementIndices.length; i++){
			if( findChar( ':', elementJson.slice(start, elementIndices[i] - 1) ) > 0 ){ //if it can find the colon
				var colonIndex = findChar( ':', elementJson.slice(start, elementIndices[i] - 1) );
				var spacer = 0;
				if(elementJson[start + colonIndex + 1] === ' ') { spacer = 1;}
				objOut[ determineParse( elementJson.slice(start, start + colonIndex) ) ] = determineParse( elementJson.slice(start + colonIndex + 1 + spacer, elementIndices[i]) ); 
				//objOut[stringBeforeColon] = stringAfterColon
				start = elementIndices[i] + 1;
        if(elementJson.charAt(start) === ' ') { start += 1; }
			}
		}

		return objOut;
  } //end parseObj

  function parseArray(json){
  	//input is a string, output is an array
  	//find each element and determineParse it
  	var array = [];
  	var elementJson = json.slice(1, json.length - 1);
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
  	var outString = '';
  	//var outString = json.slice(1,json.length - 1);
  	var workingArray = json.slice(1,json.length - 1).split('');
  	//need to go across string and deal with escape characters
  	var escCounter = 0;
  	for(var i = 0; i < workingArray.length; i++){
  		if(workingArray[i] === "\\"){
  			//workingArray.splice(i + 1,1);
  			escCounter++;
  			//if it's the last character, make sure to add it to throw syntax error
  			if(i + 1 === workingArray.length && escCounter === 1){
  				outString += workingArray[i];
  			}
  		} else {
  			if(escCounter > 1 && escCounter % 2 === 1 && workingArray[i] === '"'){ //this line filters down multiple \
  				outString += '\\';
  			}
  			outString += workingArray[i];
  			escCounter = 0;
  		}
  		
  	}

  	if(outString === undefined){ outString = ""; }

  	if(outString.charAt(outString.length - 1) === '\\'){
  		throw new SyntaxError('Invalid JSON');
  	} else {
 			return outString;
 		}
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
    var quoteCount = 0;

  	for(var i = 0; i < string.length; i++){
  		if(string.charAt(i) === '{'){ objCounter++; }
  		else if(string.charAt(i) === '['){ arrayCounter++; }
  		else if(string.charAt(i) === ']'){ arrayCounter--; }
  		else if(string.charAt(i) === '}'){ objCounter--; }
      else if(string.charAt(i) === '"'){ quoteCount = (quoteCount + 1) % 2}

  		if(string.charAt(i) === char && objCounter === 0 && arrayCounter === 0 && quoteCount === 0){
  			indexOut = i;
  		}
  	}

  	return indexOut;

  }

  function determineParse(json){
  	//run on json to run appropriate functions on each element as we come across it
  	json = json.trim();
		var initChar = json.charAt(0);

		if(initChar === '{'){
			if(json.charAt(json.length - 1) === '}'){
				return parseObj(json);
			} else { 
				throw new SyntaxError('Incomplete object, lacking brace');
			}
		} else if(initChar === '[') {
			if(json.charAt(json.length - 1) === ']'){
				return parseArray(json);
			} else { 
				throw new SyntaxError('Incomplete array, lacking bracket');
			}

		} else if(initChar === '"') {
			if(json.charAt(json.length - 1) === '"'){
				return parseString(json);
			} else { 
				throw new SyntaxError('Incomplete string, ' + json + ' lacking closing "');
			}
		} else if(initChar === '\\'){
			//do something
		} else {
			//it's a value, run parseValue
			return parseValue(json.trim());
		}
  	
  }

  	return determineParse(json);
};
