const express = require("express");
const bcrypt = require("bcrypt");

const REFERRAL_TOKEN = process.env.REFERRAL_TOKEN || require("crypto").randomBytes(32).toString("hex");

const router = express.Router();

const { User } = require("../src/db.js");
const util = require("../src/util.js");

router.get("/", util.isLoggedIn, (req, res) => res.render("register"));
router.post("/", util.isLoggedIn, async (req, res) => {
    let { user, pass, token } = req.body;
    if(!user || !pass) {
        return util.flash(req, res, "error", "Missing username or password.");
    }

    if(!token) {
        return util.flash(req, res, "error", "Missing referral token.");
    }

    if(token !== REFERRAL_TOKEN) {
        return util.flash(req, res, "error", "Incorrect referral token.");
    }

    let entry = await User.findByPk(user);
    if(entry) {
        return util.flash(req, res, "error", "A user already exists with that username.");
    }

    pass = await bcrypt.hash(pass, 12);

    await User.create({ user, pass, accessLevel: "researcher" });
    util.flash(req, res, "info", `A researcher has been created under the username <b>${user}</b>.`, "/");
});

module.exports = router;