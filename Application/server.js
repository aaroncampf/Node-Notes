var Http = require("http");
var Port = process.env.port || 1337;
var fs = require("fs");


Http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': "text/plain" });
    res.end("Hello World\n");
    fs.read()
}).listen(Port);