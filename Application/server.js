var Http = require("http");
var Port = process.env.port || 1337;
var fs = require("fs");
var Companies = require('./Database/Data.json').Companies;
var Products = require('./Database/Data.json').Products;
var Express = require("express");
var App = Express();


/*
Http.createServer(function (req, res) {
				res.writeHead(200, { 'Content-Type': "text/plain" });
				res.write("<h1>Companies</h1>\n");

				for (var i = 0; i < Companies.length; i++) {
								var Company = Companies[i];
								res.write("<b>" + Company.Name + "</b>\n");
				}

				res.end("");
				//fs.read("C:\Users\aaron\Documents\GitHub\Node Notes\Application\Database\Data.json");
}).listen(Port);
*/

App.get("/", function (req, res) {
				res.writeHead(200, { 'Content-Type': "text/html" });
				res.write("<h1>Home Page</h1>\n");
				res.write("<a href='/Companies'>Companies</h1>\n");
				res.end("");
});

App.get("/Companies", function (req, res) {
				res.writeHead(200, { 'Content-Type': "text/html" });
				res.write("<h1>Companies</h1>\n");

				for (var i = 0; i < Companies.length; i++) {
								var Company = Companies[i];
								res.write("<b>" + Company.Name + "</b>\n");
				}

				res.end("");
				//fs.read("C:\Users\aaron\Documents\GitHub\Node Notes\Application\Database\Data.json");
});

App.listen(Port, function (err) {
				console.log("Running server on port " + Port);
})