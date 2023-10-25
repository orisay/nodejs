var http = require('http');
var fs = require('fs');
var url = require('url'); //require 요구하다
const ERROR_MESG = "NOT FOUND";
//모듈(그룹핑)
function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}  
  </body>
  </html>`

}

function templateList(filelist){
  let list = '<ul>';
  let i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}
function resSuccess(template) {
  response.writeHead(200);
  response.end(template);
}


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
  if (pathName === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', (err, filelist) => {
        let title = 'Welcome';
        let description = "Hello node.js";
        let body = `<h2>${title}</h2>${description}`
        let list = templateList(filelist);
        var template = templateHTML(title, list, body);
        resSuccess(template);
      });
    } else {
      fs.readdir('./data', (err, filelist) => {
        fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
          let title = queryData.id;
          let body = `<h2>${title}</h2>${description}`
          let list = templateList(filelist);
          var template = templateHTML(title, list, body);
          resSuccess(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end(ERROR_MESG);
  }
});
app.listen(3001);
//포트번호