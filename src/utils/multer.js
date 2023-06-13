
const multer = require("multer");
const path = require("path");
const { TYPE_DOCUMENTS } = require("../config/config");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let route = "documents";
        req.logger.info("fieldName = " + file.fieldname);
        const typeDocument = req.body.typeDocument;

        if (
            TYPE_DOCUMENTS.findIndex((value) => value == typeDocument) == -1 &&
            typeDocument != "product" &&
            typeDocument != "thumbnail" &&
            typeDocument != "document"
        ) {
            return cb(new Error("type file not support"));
        }
        

        if (file.fieldname == "thumbnail") route = "profile";
        if (file.fieldname == "document") route = "documents";
        if (file.fieldname == "product") route = "products";
        if (file.fieldname == "Identificación") route = "profile";

        req.route = route;
        cb(null, __dirname + `/../public/documents/${route}`);
    },
    filename: function (req, file, cb) {
        req.logger.info("req file type - " + file.mimetype);
        let user = req.user;
        let filename = `${Date.now()}-${file.originalname}`;
        if (file.fieldname != "image" && file.fieldname != "thumbnail")
            filename = `${user.email}-${file.fieldname}`;

        let fileExtension = file.originalname.split(".");

        req.filename = `${filename}.${fileExtension[1]}`;
        cb(null, `${filename}.${fileExtension[1]}`);
    },
});
const uploader = multer({ storage: storage });
const saveDocs = uploader.fields([
    { name: "thumbnail" },
    { name: "image" },
    { name: "document"},
    { name: "product"},
    { name: "location" },
    { name: "accState" },

]);
const upload = multer();
const reviewDocs = upload.fields([
    { name: "thumbnail" },
    { name: "image" },
    { name: "location" },
    { name: "accState" },
    { name: "identification" },
]);

module.exports = {saveDocs, reviewDocs}