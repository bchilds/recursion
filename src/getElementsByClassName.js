// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

//You should use document.body, element.childNodes, and element.classList

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  //input: className that we are searching for (string)
  var output = [];
  var body = document.body;

  //will need to search all the child nodes of the body, and all child nodes of the child nodes
  //need a function which checks for classname, number of childNodes, and then runs on each child node if any

  //error - className is empty string, null, undefined, etc
  if(className === undefined || className === "") { return; }

  function check(elem, className) {
	 	//base case - childNodes is empty
	 	if ( elem.childNodes.length === 0 ) {
	 		 //classList contains target
	 		 if( elemen.classList.contains(className) ) { 
	 		 	output.push(elem);
	 		 	return; 
	 		 } else {
	 		 //classList does not contain target
	 		  return;
	 		}
	 	}

	  //recursive case - childNodes not empty, classList contains target
	  //recursive case - childNodes not empty, classList does not contain target
  }




  //output: array of all nodes with class in input?
  return output;
};
