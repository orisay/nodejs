var http = require('http');
var fs = require('fs');
var url = require('url'); //require 요구하다
//모듈(그룹핑)


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
 
  const ERROR_MESG = "NOT FOUND";

  if (pathName === '/') {
    if (queryData.id === undefined) {
      // fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => { 
        // 읽어 오는게 없는데?
        let title = "Welcome to World";
        description = "Hello Node.js";
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
        response.writeHead(200);
        response.end(template);
      // });
    } else{
      fs.readFile(`data/${title}`, 'UTF-8', (err, description) => {
        let title = queryData.id;
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
        response.writeHead(200);
        response.end(template);
      });
    }
   
  } else {
    response.writeHead(404);
    response.end(ERROR_MESG);
  }

});
app.listen(3000);
//포트번호