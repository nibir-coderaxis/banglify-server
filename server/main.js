var http = require('http');
var htdocs = '/../htdocs';
var fs = require('fs');
var banglaStream = require('./streamHandler');
var server = http.createServer(function (request, response) {

//TODO: use a framework, for lulz
  var link = request.url;

  var file = '';

  if (request.method == 'POST' && link == '/api/') {

    request.pipe(banglaStream.getNewStreamConverter()).pipe(response);
    return;
  }

  if (link == '/') {
    file = '/index.html';
    response.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8' //TODO: check if this is right for post as well
    });
    fetchFile(file, response);
    //Get favico
    //Proper landing page
    //writeDefault(response);
  } else {

    file = link;
    var ext = writeExtension(file,response);
    fetchFile(file, response);
  }
});

function fetchFile(fileName, response) {
  fs.readFile(__dirname + htdocs + fileName,
    function (err, fileContents) {
      if (err) {
        console.error(err);
        response.end('Error loading index.html');
      }
      else       response.end(fileContents);
    });
}

function writeExtension(filName,response){
var ext=  filName.split('.').pop();
  var type='';
  if (ext=='ttf' || ext=='woff2'){
    type= 'application/x-font-'+ext
  }else{
    type = 'text/'+ext
  }
  response.writeHead(200, {
    'Content-Type': +type //TODO: check if this is right for post as well
  });

}

server.listen(process.env.PORT);


function writeAll(response) {
  response.write('<h1>All the defaultLetters!</h1><ul>');
  for (var i in conn.letters) {
    response.write('<li>' + i + ' : ' + conn.letters[i] + '</li>')

  }
  response.end('</ul>');
}

function writeDefault(resp) {
  var test = '\u0995\u09A5\u09BE';
  test = 'বড়  আশা করে এসেছি গো কাছে দেকে নাও।';
  var result = banglaStream.convertString(test);
  resp.write('<div><h1>Test string:</h1><br/>');
  resp.write('<h2>' + test + '</h2></div>');
  resp.write('<div><h1>Converted:</h1><br/>');
  resp.write('<h2>' + result + '</h2></div>');
  resp.end('<div><h1>Sup?</h1></div>')

}
