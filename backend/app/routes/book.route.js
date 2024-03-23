const express = require("express");
const book =  require("../controllers/book.controller");
const nxb = require("../controllers/nxb.controller");
const nv = require("../controllers/nv.controller");
const router = express.Router();
//NV route
router.route("/nv")
    .post(nv.create)
router.route("/nv/:id")
    .put(nv.update)
    .get(nv.changePassword)
router.route("/nv/login/")
    .post(nv.login)
// Book route
router.route("/admin/book")
    .post(book.create)
    .delete(book.deleteAll)

router.route("/admin/book/:id")
    .put(book.update)
    .delete(book.delete)

router.route("/book/find")
    .get(book.findAll)

router.route("/book/find/:id")
    .get(book.findOne)
//Nxb route
router.route("/admin/nxb")
    .post(nxb.create)
    .delete(nxb.deleteAll)

router.route("/admin/nxb/:id")
    .put(nxb.update)
    .delete(nxb.delete)

router.route("/nxb/find")
    .get(nxb.findAll)

router.route("/nxb/find/:id")
    .get(nxb.findOne)

module.exports = router;
