const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

const { User } = require("../src/db.js");
const util = require("../src/util.js");

router.get("/", (req, res) => res.render("login"));
router.post("/", async (req, res) => {
    let { user, pass } = req.body;
    if(!user || !pass) {
        return util.flash(req, res, "error", "Missing username or password.");
    }

    let entry = await User.findByPk(user);
    if(!entry) {
        return util.flash(req, res, "error", "No user found with that username.");
    }

    if(!await bcrypt.compare(pass, entry.pass)) {
        return util.flash(req, res, "error", "Incorrect password.");
    }

    req.session.user = user;
    util.flash(req, res, "info", `Logged in as user <b>${user}</b>.`, "/");
});

module.exports = router;