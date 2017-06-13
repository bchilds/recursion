// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // input is any type of object or primitive or array, including functions and undefined
  // per suggestion: think of single case, then of two, then of (n)

  var output = "";
  //check type of input
  var objType = typeof obj;

  //if it is a function or undefined, ignore
  if( obj === undefined || objType === "function" ){
  	return;
  }

	//base case (primitives)
	//string, number, boolean, obj ==== null, symbol, 
	if(objType != "object"){
    if( objType === "string"){
    	output = obj;
    } else if( objType === "number"){
    	output += "" + obj;
    } else if( objType === "boolean"){
    	output += "" + obj;
    } else if( objType === "symbol"){
    	output = "{}";
    }
    return output;
	} else { //if it IS an object...

		//last base case, since null returns typeof object
		if( obj === null ){
    	output = "null"
    	return output;
    }

		//recursive cases( array, obj )
		//if it is an array
		if( Array.isArray(obj) ) {
		  //remember '[' and ']'
		  //iterate across length of array
		  //check type of input
		  output += "[";
		  //iterate across array here
		  output += "]";
		} else {
		  //otherwise, for each property in this object
		  //remember '{' and '}'
		  output += "{";
		  //check the value type  	
		  //for each property...
		  output += "}";	
		}
		return output;
	}


  	  //this will be done with a recursive function. Base cases are any of the primitives, since all objects/arrays eventually reduce down to a primitive

  	  //output is a string version of the input
};
