const express = require("express");
const book =  require("../controllers/book.controller");
const router = express.Router();

router.route("/admin")
    .post(book.create)
    .delete(book.deleteAll)

router.route("/admin/:id")
    .put(book.update)
    .delete(book.delete)

router.route("/find")
    .get(book.findAll)

router.route("/find/:id")
    .get(book.findOne)

module.exports = router;
