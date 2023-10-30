var http = require('http');
var fs = require('fs');
var url = require('url'); //require 요구하다
var qs = require('querystring')
//node.js 최신 문법이 안먹힌다. 정확하게 import 쓰지 말것
//node.js 설명서에서는 써져있는데 뭐가 문제지..

const ERROR_MESG = "NOT FOUND";
const SUCCESS_MESG = "SUCCESS";

let template = {
  html: function (title, list, body, control) {
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
      ${control}
      ${body}  
    </body>
    </html>`

  },
  list: function (filelist) {
    let list = '<ul>';
    let i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
  },
};
//respones도 보내야한다.
function resSuccess(template, response) {
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
        let body = `<h2>${title}</h2>${description}
        `;
        let control = `<a href ="/create">create</a>
       `;

        // let list = templateList(filelist);
        // var template = templateHTML(title, list, body, control);

        let list = template.list(filelist);
        let html = template.html(title, list, body, control);
        resSuccess(html, response);

      });
    } else {
      fs.readdir('./data', (err, filelist) => {
        fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
          let title = queryData.id;
          let body = `<h2>${title}</h2>${description}`
          let list = template.list(filelist);
          let control = `<a href ="/create">create</a>
          <a href ="/update?id=${title}">update</a>
          <form action="delete_process" method="post"> 
          <input type = "hidden" name="id" value="${title}">
          <input type = "submit" value="delete">
          </form>
          `;
          let html = template.html(title, list, body, control);
          resSuccess(html, response);
        });
      });
    }
  } else if (pathName === '/create') {
    fs.readdir('./data', (err, filelist) => {
      let title = 'WEB - Create';
      let body = `<form action="/create_process" method="post">
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
      let list = template.list(filelist);
      var html = template.html(title, list, body, "");
      resSuccess(html, response);
    });
  } else if (pathName === '/update') {
    fs.readdir('./data', (err, filelist) => {
      fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
        let title = queryData.id;
        let list = template.list(filelist);

        let control = `<a href ="/create">create</a><a href ="/update?id=${title}">update</a>`;

        let body = `<form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p>
        <input type="text" name="title" placeholder="title" value="${title}">
        </p>
        <p>
        <textarea name="description" placeholder="description">${description}</textarea>
        </p>     
        <p>
        <input type="submit" value="Submit">
        </p>
        </form>`;

        let html = template.html(title, list, body, control);
        resSuccess(html, response);
      });
    });
  } else if (pathName === "/update_process") {
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      let post = qs.parse(body);
      let id = post.id;
      let title = post.title;
      let description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, (err) => {
        fs.writeFile(`data/${title}`, description, 'UTF-8', (err) => {
          if (err) throw err;
          response.writeHead(302, {
            location:
              `/?id=${title}`
          });
          response.end();
        })
      });
    });
  } else if (pathName === "/delete_process") {
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      let post = qs.parse(body);
      let id = post.id;
      fs.unlink(`data/${id}`, (err) => {
        if (err) throw err;
        response.writeHead(302, {
          Location: `/`
        });
        response.end();
      })

    });
  } else if (pathName === '/create_process') {
    let body = '';
    // createServer에 콜백함수 인자 요청할 때 웹브라우저 보낸 정보
    request.on('data', function (data) {
      body = body + data;
      //이부분에 일정 용량 넘어서면 끊어주는 함수가 필요하다.
    });
    //data 많으면 한번에 처리하다가 터진다. node.js 방식 

    //정보 수신 끝났을 때 호출
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      //options.encoding 기본값은 utf8인듯 함수니깐 인자 넣어주자
      fs.writeFile(`data/${title}`, description, 'UTF-8', (err) => {
        if (err) throw err;
        response.writeHead(302, {
          location:
            `/?id=${title}`
        });
        //200: 페이지 이동 성공 302: 페이지를 다른 곳으로 리다이렉션 시켜라
        response.end();
        //redirect 리다이렉션 할 때 end는 뭘 넣지 않아도 된다.
      });
    });

  } else {
    response.writeHead(404);
    response.end(ERROR_MESG);
  }
});
app.listen(3080);
//포트번호