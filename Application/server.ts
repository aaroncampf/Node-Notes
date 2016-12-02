var Http = require("http");
var Port = process.env.port || 1337;
import fs = require("fs");
var Companies = require('./Database/Data.json').Companies;
var Products = require('./Database/Data.json').Products;
import Express = require("express");
var app = Express();


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


//App.use(Express.static("Views"));
app.set("Views", Express.static("Views"));


app.get("/", (req, res) => {
	res.writeHead(200, { 'Content-Type': "text/html" });
	res.write("<h1>Home Page</h1>\n");
	res.write("<a href='/Companies'>Companies</h1>\n");
	res.end("");
});

app.get("/Companies", (req, res) => {
	res.writeHead(200, { 'Content-Type': "text/html" });

	res.render("Companies");
	res.end("");
	




/*
res.write("<h1>Companies</h1>\n");

for (var i = 0; i < Companies.length; i++) {
				var Company = Companies[i];
				res.write("<b>" + Company.Name + "</b>\n");
}

res.end("");
*/
});

app.listen(Port, err => {
	console.log("Running server on port " + Port);
});