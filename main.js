var http = require('http');
var fs = require('fs');
var url = require('url'); //require 요구하다
//모듈(그룹핑)


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  console.log("quertDATA OBJ.id: ", queryData.id);
  // console.log(_url);
  if (_url == '/') {
    // _url = '/index.html'; // '/' 이면 index로 보내준다.
    title = 'Welcome';
  }
  if (_url == '/favicon.ico') {
    return response.writeHead(404); //실패 코드
  }
  response.writeHead(200); //성공코드
  // console.log(__dirname + url)
  // response.end(fs.readFileSync(__dirname + _url));
  fs.readFile(`data/${title}`, 'UTF-8', (err, description) => {
    var template = `
  <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ol>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ol>
  <h2>${title}</h2>
 <p>
 ${description}
 </p>
</body>
</html>
  `;
    response.end(template); // == 화면 출력해주는 곳 같다.
  });


  // response.end('egoing : ' + url);

});
app.listen(3000);
//포트번호