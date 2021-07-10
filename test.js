var randomId = require("random-id");

// length of the id (default is 30)
var len = 5;

// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
var pattern = "a";
console.log("Hello");
var id = randomId(len, pattern);
console.log(id);
