// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //input always a string
  var output;

  function parseObj(json){
	  //parseObj
		//first char is a {
		//find : index

  } //end parseObj

  function parseArray(json){

  } //end parseArray

  function parseString(json){
 //end parseString
  }

  function parseValue(json){

  } //end parseValue

  function determineParse(json){
  	//run on json to break it into elements and run the appropriate parse on each element
  	//elements delimited by , outside of a pair of "" [may have a comma within a string]
  }

  	return output;
};
