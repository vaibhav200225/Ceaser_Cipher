const express = require("express");

const router = express.Router();

const { OOPArt } = require("../src/db.js");
const util = require("../src/util.js");

router.get("/:id", util.isLoggedIn, async (req, res) => {
    let id = req.params.id;
    let entry = await OOPArt.findByPk(id);

    if(!entry) {
        return util.flash(req, res, "error", "No OOPArt was found with that id.", "/");
    }

    res.render("view", { entry });
});

module.exports = router;