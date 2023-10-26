const fs = require("fs");

// readFileSync
/* console.log("a");
const result = fs.readFileSync("syntax/sample.txt", "utf-8");
console.log(result)
console.log("C"); 
 */
console.log("a");
fs.readFile("syntax/sample.txt", "utf-8", function (err, result) {
    console.log(result)
});
console.log("C");