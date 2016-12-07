// note: Use [let] not [var]
// note: Use [for of]
// todo: Figure out the correct type for res


//#region Variables

import Express = require("express");
//import * as Express from "express";
let handlebars = require("express-handlebars");
const Port: number = process.env.port || 1337;
const app = Express();
const Companies: any = require("./Database/Data.json").Companies;

//#endregion

//#region Setup

let bodyParser = require('body-parser') // required for POSTed form data
app.use(bodyParser.json());             // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({         // to support URL-encoded bodies
    extended: true
}));


app.engine(".hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./Views");
app.use(Express.static("./node_modules/bootstrap/dist/css"));

//#endregion


//#region Index
app.get("/", (req: any, res: any) => {
    res.render("Index");
});
//#endregion

//#region Companies

let companyRouter = Express.Router();
app.use("/Companies", companyRouter);

companyRouter.get("/", (req: any, res: any) => {
    // app.locals.Companies = Companies;
    res.render("Companies/Index", { Companies: Companies });
});

//#region Company

companyRouter.route("/:id").get((req: any, res: any) => {
    let Company = Companies.find(_ => _.ID = req.params.id);

    if (Company !== undefined) {
        res.render("Companies/Company", { Company: Company });
    }
    else {
        res.render("Error");
    }
});

companyRouter.route("/:id").post((req: any, res: any) => {
    let Company = Companies.find(Company => Company.ID = req.params.id);

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

companyRouter.route("/:id/Contacts/:contactid").get((req: any, res: any) => {
    let Company = Companies.find(_ => _.ID = req.params.id);
    let Contact: any;
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

companyRouter.route("/:id/Contacts/:contactid").post((req: any, res: any) => {
    let Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact: any;
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

//#endregion

//#region Note
companyRouter.route("/:id/Contacts/:contactid/Notes/:noteid").get((req: any, res: any) => {
    let Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact: any;
    let Note: any;

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

companyRouter.post("/:id/Contacts/:contactid/Notes/:noteid", (req: any, res: any) => {
    let Company = Companies.find(Company => Company.ID = req.params.id);
    let Contact: any;
    let Note: any;

    if (Company !== undefined) {
        Contact = Company.Contacts.find(Contact => Contact.ID === req.params.contactid);
    }

    if (Contact !== undefined) {
        Note = Contact.Notes.find(Note => Note.ID === req.params.noteid);
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