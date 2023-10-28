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
    <a href ="/create">create</a>
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
//respones도 보내야한다.
function resSuccess(template,response) {
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
        resSuccess(template,response);
      });
    } else {
      fs.readdir('./data', (err, filelist) => {
        fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
          let title = queryData.id;
          let body = `<h2>${title}</h2>${description}`
          let list = templateList(filelist);
          var template = templateHTML(title, list, body);
          resSuccess(template,response);
        });
      });
    }
  } else if(pathName ==='/create'){
    fs.readdir('./data', (err, filelist) => {
      let title = 'WEB - Create';
      let body = `<form action="http://localhost:3080/process_create" method="post">
      <p>
      <input type="text" name="title" placeholder="title">
      </p>
      <p>
      <textarea name="description" placeholder="description"></textarea>
      </p>     
      <p>
      <input type="submit" value="Submit">
      </p>
      </form>
      `
      let list = templateList(filelist);
      var template = templateHTML(title, list, body);
      resSuccess(template,response);
    });
  } else {
    response.writeHead(404);
    response.end(ERROR_MESG);
  }
});
app.listen(3080);
//포트번호