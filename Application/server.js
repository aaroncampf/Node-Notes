// note: Use [for of]
// todo: Figure out the correct type for res
// todo: Upgrade to use `123 ${X}` not "123 " + X
"use strict";
//#region Variables
const Express = require("express");
//import * as Express from "express";
let handlebars = require("express-handlebars");
const Port = process.env.port || 1337;
const app = Express();
const Companies = require("./Database/Data.json").Companies;
//#endregion
//#region Setup
let bodyParser = require('body-parser'); // required for POSTed form data
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
app.get("/", (req, res) => {
    res.render("Index");
});
//#endregion
//#region Companies
let companyRouter = Express.Router();
app.use("/Companies", companyRouter);
companyRouter.get("/", (req, res) => {
    // app.locals.Companies = Companies;
    res.render("Companies/Index", { Companies: Companies });
});
//#region Company
companyRouter.route("/:id").get((req, res) => {
    const Company = Companies.find(_ => _.ID = req.params.id);
    if (Company !== undefined) {
        res.render("Companies/Company", { Company: Company });
    }
    else {
        res.render("Error");
    }
});
companyRouter.route("/:id").post((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    if (Company === undefined) {
        res.render("Error");
    }
    else {
        Company.Name = req.body.Name;
        Company.Address = req.body.Address;
        Company.City = req.body.City;
        Company.State = req.body.State;
        Company.Zip = req.body.Zip;
        Company.Phone = req.body.Phone;
        res.render("Companies/Company", { Company: Company });
    }
});
companyRouter.route("/:id/Contacts_Delete/:contactid").get((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    if (Company === undefined) {
        res.render("Error");
    }
    else {
        Companies.splice(Companies.indexOf(Company), Companies.indexOf(Company) + 1);
        res.redirect("/Companies");
    }
});
companyRouter.route("/:id/Contacts_Create/:contactid").get((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    if (Company === undefined) {
        res.render("Error");
    }
    else {
        //const ID: number = Company.Contacts.length + 1
        const ID = Math.max(Company.Contacts.map(_ => _.ID));
        let Contact = { ID: ID.toString() };
        Company.Contacts.push(Contact);
        //res.render("Notes/Note", { Note: Note, CompanyId: Company.ID, CompanyName: Company.Name, ContactName: Contact.Name, ContactId: Contact.ID });
        res.redirect(`/Companies/${req.params.id} + /Contacts/${ID}`);
    }
});
//#endregion
//#region Contact
companyRouter.route("/:id/Contacts/:contactid").get((req, res) => {
    const Company = Companies.find(_ => _.ID = req.params.id);
    let Contact;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
    }
    if (Contact !== undefined) {
        res.render("Contacts/Contact", { Contact: Contact, CompanyId: Company.ID, CompanyName: Company.Name });
    }
    else {
        res.render("Error");
    }
});
companyRouter.route("/:id/Contacts/:contactid").post((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
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
companyRouter.route("/:id/Contacts_Delete/:contactid").get((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
    }
    if (Company === undefined) {
        res.render("Error");
    }
    else {
        Company.Contacts.splice(Company.Contacts.indexOf(Contact), Company.Contacts.indexOf(Contact) + 1);
        //res.render("Contacts/Contact", { Contact: Contact, CompanyId: Company.ID, CompanyName: Company.Name });
        res.redirect("/Companies/" + req.params.id);
    }
});
companyRouter.route("/:id/Contacts_Create/:contactid").get((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    if (Company === undefined) {
        res.render("Error");
    }
    else {
        //const ID: number = Company.Contacts.length + 1
        const ID = Math.max(Company.Contacts.map(_ => _.ID));
        let Contact = { ID: ID.toString() };
        Company.Contacts.push(Contact);
        //res.render("Notes/Note", { Note: Note, CompanyId: Company.ID, CompanyName: Company.Name, ContactName: Contact.Name, ContactId: Contact.ID });
        res.redirect(`/Companies/${req.params.id} + /Contacts/${ID}`);
    }
});
//#endregion
//#region Note
companyRouter.route("/:id/Contacts/:contactid/Notes/:noteid").get((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact;
    let Note;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
    }
    if (Contact !== undefined) {
        Note = Contact.Notes.find(Note => Note.ID === req.params.noteid);
    }
    if (Note !== undefined) {
        res.render("Notes/Note", { Note: Note, CompanyId: Company.ID, CompanyName: Company.Name, ContactName: Contact.Name, ContactId: Contact.ID });
    }
    else {
        res.render("Error");
    }
});
companyRouter.post("/:id/Contacts/:contactid/Notes/:noteid", (req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact;
    let Note;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
    }
    if (Contact !== undefined) {
        Note = Contact.Notes.find(Note => Note.ID === req.params.noteid);
    }
    if (Note !== undefined) {
        Note.Title = req.body.Title;
        Note.Text = req.body.Text;
        //res.render("Notes/Note", { Note: Note, CompanyId: Company.ID, CompanyName: Company.Name, ContactName: Contact.Name, ContactId: Contact.ID });
        //res.render("Contacts/Contact", { Contact: Contact, CompanyId: Company.ID, CompanyName: Company.Name });
        res.redirect(`/Companies/${req.params.id}/Contacts/${req.params.contactid}`);
    }
    else {
        res.render("Error");
    }
});
companyRouter.route("/:id/Contacts/:contactid/Notes_Create").get((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
    }
    if (Contact === undefined) {
        res.render("Error");
    }
    else {
        //const ID:number = Contact.Notes.length + 1
        const ID = Math.max(Contact.Notes.map(_ => _.ID));
        let Note = { ID: ID.toString() };
        Contact.Notes.push(Note);
        //res.render("Notes/Note", { Note: Note, CompanyId: Company.ID, CompanyName: Company.Name, ContactName: Contact.Name, ContactId: Contact.ID });
        res.redirect(`/Companies/${req.params.id}/Contacts/${req.params.contactid}`);
    }
});
companyRouter.route("/:id/Contacts/:contactid/Notes_Delete/:noteid").get((req, res) => {
    const Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact;
    let Note;
    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
    }
    if (Contact !== undefined) {
        Note = Contact.Notes.find(Note => Note.ID === req.params.noteid);
    }
    if (Note === undefined) {
        res.render("Error");
    }
    else {
        Contact.Notes.splice(Contact.Notes.indexOf(Note), Contact.Notes.indexOf(Note) + 1);
        //res.render("Contacts/Contact", { Contact: Contact, CompanyId: Company.ID, CompanyName: Company.Name });
        res.redirect(`/Companies/${req.params.id}/Contacts/${req.params.contactid}`);
    }
});
//#endregion
//#endregion
app.listen(Port);
//# sourceMappingURL=server.js.map