"use strict";
var Port = process.env.port || 1337;
var Express = require("express");
var app = Express();
var path = require("path");
app.set("view engine", "ejs"); //Upgrade to Handlebars
app.set("views", "./Views");
app.use(Express.static('./node_modules/bootstrap/dist/css'));
var Companies = require("./Database/Data.json").Companies;
// var companyRouter = require('./src/routes/bookRoutes')(nav);
// var Products: any = require("./Database/Data.json").Products;
// todo: Figure out the correct type for res
app.get("/", function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Home Page</h1>\n");
    res.write("<a href='/Companies'>Companies</h1> <br/>");
    res.write("<a href='/Companies/1'>AJP Northwest</h1>\n");
    res.end("");
});
var companyRouter = Express.Router();
companyRouter.get("/", function (req, res) {
    //app.locals.Companies = Companies;
    res.render("Companies/Index", { Companies: Companies });
});
companyRouter.route("/:id").get(function (req, res) {
    if (Companies.length >= req.params.id) {
        res.render("Companies/Company", { Company: Companies[req.params.id - 1] });
    }
    else {
        res.render("Error");
    }
});
app.use("/Companies", companyRouter);
app.listen(Port);
//# sourceMappingURL=server.js.map