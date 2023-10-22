let args = process.argv;
// console.log(args[2]);
// console.log("test : "+args);
const isEqual = (a, b) => a === b;
const data = args[2];
const RIGHT = '2';


console.log('a');
console.log('b');
if (isEqual(data, RIGHT)) {
    console.log('c1');
} else {
    console.log('c2');
}
console.log('d');


