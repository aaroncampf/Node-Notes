"use strict";
var Port = process.env.port || 1337;
var Express = require("express");
var app = Express();
var path = require("path");
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set("view engine", ".hbs");
app.set("views", "./Views");
app.use(Express.static('./node_modules/bootstrap/dist/css'));
var Companies = require("./Database/Data.json").Companies;
// var companyRouter = require('./src/routes/bookRoutes')(nav);
// var Products: any = require("./Database/Data.json").Products;
// todo: Figure out the correct type for res
app.get("/", function (req, res) {
    res.render("Index");
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