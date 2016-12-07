// note: Use [let] not [var]
// note: Use [for of]
// todo: Figure out the correct type for res
"use strict";
//#region Variables
var Express = require("express");
//import * as Express from "express";
var handlebars = require("express-handlebars");
var Port = process.env.port || 1337;
var app = Express();
var Companies = require("./Database/Data.json").Companies;
//#endregion
//#region Setup
var bodyParser = require('body-parser'); // required for POSTed form data
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine(".hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./Views");
app.use(Express.static("./node_modules/bootstrap/dist/css"));
//#endregion
//#region Index
app.get("/", function (req, res) {
    res.render("Index");
});
//#endregion
//#region Companies
var companyRouter = Express.Router();
app.use("/Companies", companyRouter);
companyRouter.get("/", function (req, res) {
    // app.locals.Companies = Companies;
    res.render("Companies/Index", { Companies: Companies });
});
//#region Company
companyRouter.route("/:id").get(function (req, res) {
    var Company = Companies.find(function (_) { return _.ID = req.params.id; });
    if (Company !== undefined) {
        res.render("Companies/Company", { Company: Company });
    }
    else {
        res.render("Error");
    }
});
companyRouter.route("/:id").post(function (req, res) {
    var Company = Companies.find(function (Company) { return Company.ID = req.params.id; });
    if (Company === undefined) {
        res.render("Error");
    }
    else {
        Company.Name = req.body.Name;
        Company.Address = req.body.Address;
        Company.City = req.body.City;
        Company.State = req.body.State;
        Company.Zip = req.body.Zip;
        Company.Name = req.body.Title;
        Company.Phone = req.body.Phone;
        res.render("Companies/Company", { Company: Company });
    }
});
//#endregion
//#region Contact
companyRouter.route("/:id/Contacts/:contactid").get(function (req, res) {
    var Company = Companies.find(function (_) { return _.ID = req.params.id; });
    var Contact;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(function (Contact) { return Contact.ID === req.params.contactid; });
    }
    if (Contact !== undefined) {
        res.render("Contacts/Contact", { Contact: Contact, CompanyId: Company.ID, CompanyName: Company.Name });
    }
    else {
        res.render("Error");
    }
});
companyRouter.route("/:id/Contacts/:contactid").post(function (req, res) {
    var Company = Companies.find(function (Company) { return Company.ID = req.params.id; });
    var Contact;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(function (Contact) { return Contact.ID === req.params.contactid; });
    }
    if (Contact === undefined) {
        res.render("Error");
    }
    else {
        Contact.Name = req.body.Name;
        Contact.Position = req.body.Position;
        Contact.Email = req.body.Email;
        Contact.Details = req.body.Details;
        res.render("Contacts/Contact", { Contact: Contact, CompanyId: Company.ID, CompanyName: Company.Name });
    }
});
//#endregion
//#region Note
companyRouter.route("/:id/Contacts/:contactid/Notes/:noteid").get(function (req, res) {
    var Company = Companies.find(function (Company) { return Company.ID = req.params.id; });
    var Contact;
    var Note;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(function (Contact) { return Contact.ID === req.params.contactid; });
    }
    if (Contact !== undefined) {
        Note = Contact.Notes.find(function (Note) { return Note.ID === req.params.noteid; });
    }
    if (Note !== undefined) {
        res.render("Notes/Note", { Note: Note, CompanyId: Company.ID, CompanyName: Company.Name, ContactName: Contact.Name, ContactId: Contact.ID });
    }
    else {
        res.render("Error");
    }
});
companyRouter.post("/:id/Contacts/:contactid/Notes/:noteid", function (req, res) {
    var Company = Companies.find(function (Company) { return Company.ID = req.params.id; });
    var Contact;
    var Note;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(function (Contact) { return Contact.ID === req.params.contactid; });
    }
    if (Contact !== undefined) {
        Note = Contact.Notes.find(function (Note) { return Note.ID === req.params.noteid; });
    }
    if (Note !== undefined) {
        Note.Title = req.body.Title;
        Note.Text = req.body.Text;
    }
    else {
    }
    res.end();
});
//#endregion
//#endregion
app.listen(Port);
//# sourceMappingURL=server.js.map