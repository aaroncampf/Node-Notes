var Port: number = process.env.port || 1337;
import Express = require("express");
var app = Express();
var path: any = require("path");


var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set("view engine", ".hbs");






app.set("views", "./Views");
app.use(Express.static('./node_modules/bootstrap/dist/css')) 

var Companies: any[] = require("./Database/Data.json").Companies;


// var companyRouter = require('./src/routes/bookRoutes')(nav);
// var Products: any = require("./Database/Data.json").Products;


// todo: Figure out the correct type for res

app.get("/", (req: any, res: any) => {
				res.render("Index")
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