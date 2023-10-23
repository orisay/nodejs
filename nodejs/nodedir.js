const testFolder = './data';
const fs = require('fs');

/* fs.readdir(testFolder, (err, filelist) => {
  filelist.forEach(file => {
    console.log(file);
  });
}); */

fs.readdir(testFolder, function(err, filelist){
    console.log(filelist);
})