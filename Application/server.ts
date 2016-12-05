// Note: Use [let] not [var]
// Note: Use [for of]

import Express = require("express");
let handlebars = require("express-handlebars");
let Port: number = process.env.port || 1337;
let app = Express();

app.engine(".hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./Views");
app.use(Express.static("./node_modules/bootstrap/dist/css"));

let Companies: any[] = require("./Database/Data.json").Companies;

// todo: Figure out the correct type for res

app.get("/", (req: any, res: any) => {
    res.render("Index");
});

let companyRouter = Express.Router();
companyRouter.get("/", (req: any, res: any) => {
    // app.locals.Companies = Companies;
    res.render(
        "Companies/Index",
        { Companies: Companies }
    );
});

companyRouter.route("/:id").get((req: any, res: any) => {
    if (Companies.length >= req.params.id) {
        res.render(
            "Companies/Company",
            { Company: Companies[req.params.id - 1] }
        );
    }   
    else {
        res.render("Error");
    }
});

companyRouter.route("/:id/Contacts/:contactid").get((req: any, res: any) => {
    let Company = Companies.find(Company => Company.ID = req.params.id);
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
        res.render("Notes/Note", { Note: Note, CompanyId: Company.ID, CompanyName: Company.Name, ContactName: Contact.Name, ContactId: Contact.ID});
    }
    else {
        res.render("Error");
    }
});

app.use("/Companies", companyRouter);
app.listen(Port);