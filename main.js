var http = require('http');
var fs = require('fs');
var url = require('url'); //require 요구하다
const ERROR_MESG = "NOT FOUND";
//모듈(그룹핑)


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
  if (pathName === '/') {
    if (queryData.id === undefined) {

      fs.readdir('./data', (err, filelist) => {
        console.log("fs는 무엇인가? : " + fs);
        console.log(filelist);
        let title = 'Welcome';
        let description = "Hello node.js";
        let list = '<ul>';
        let i = 0;
        while (i < filelist.length) {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list + '</ul>';
        //map으로 변경 가능할 것 같다.
        var template = `
        <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
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


    } else {
      fs.readdir('./data', (err, filelist) => {
        console.log("fs는 무엇인가? : " + fs);
        console.log(filelist);
        let title = 'Welcome';
        let description = "Hello node.js";
        let list = '<ul>';
        let i = 0;
        while (i < filelist.length) {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list + '</ul>';

      fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
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
        ${list}
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
    });
    }
  } else {
    response.writeHead(404);
    response.end(ERROR_MESG);
  }
});
app.listen(3000);
//포트번호