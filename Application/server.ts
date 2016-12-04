var Port: number = process.env.port || 1337;
import Express = require("express");
var app = Express();
var path: any = require("path");


app.set("view engine", "ejs"); //Upgrade to Handlebars
app.set("views", "./Views");
app.use(Express.static('./node_modules/bootstrap/dist/css')) 

var Companies: any[] = require("./Database/Data.json").Companies;


// var companyRouter = require('./src/routes/bookRoutes')(nav);
// var Products: any = require("./Database/Data.json").Products;


// todo: Figure out the correct type for res

app.get("/", (req: any, res: any) => {
				res.writeHead(200, { "Content-Type": "text/html" });
				res.write("<h1>Home Page</h1>\n");
				res.write("<a href='/Companies'>Companies</h1> <br/>");
				res.write("<a href='/Companies/1'>AJP Northwest</h1>\n");
				res.end("");
});

var companyRouter = Express.Router();
companyRouter.get("/", (req: any, res: any) => {
				//app.locals.Companies = Companies;
				res.render(
							"Companies/Index",
								{ Companies: Companies }
				);
});


companyRouter.route("/:id").get((req, res) => {
				if (Companies.length >= req.params.id) {
								res.render(
												"Companies/Company",
												{ Company: Companies[req.params.id - 1] }
								);
				}
				else {
								res.render("Error");
				}
})
app.use("/Companies", companyRouter);


	app.listen(Port);