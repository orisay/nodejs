let fileSystem = require('fs');

/*fileSystem.readFile('./nodejs/sample.txt', 'UTF8', (err, data) => {

    if(err) throw err;
    console.log(data);
    // console.log(data);
    // -> <Buffer 73 68 6f 77 20 6d 65 20 74 68 65 20 6d 6f 6e 65 79 21 21 21 21>
    // 왜 버퍼가 나오지?
    // => 처리할 수 없는 형태를 출력해서 그렇다.
    // -> 해결 방안 'UTF8' 
    console.log("console log readFile : "+ data);
    // 얘는 묵시적으로 알아서 처리해주는 것 같다. 앞에 문자열이 포함되면 
}); */


fileSystem.readFile('./nodejs/sample.txt','UTF-8', function(err, data){
    console.log(data);
});