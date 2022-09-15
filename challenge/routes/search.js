const express = require("express");

const router = express.Router();

const { OOPArt } = require("../src/db.js");
const util = require("../src/util.js");

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

router.get("/", (req, res) => {
    let results = req.session.results;
    let query = req.session.query || "<empty>";

    if(!results || !Array.isArray(results)) {
        results = [];
    }
    res.render("search", { query, results });
});

router.post("/", async (req, res) => {
    let { query, level } = req.body;
    req.session.query = query;

    let entries = await OOPArt.findAll({ raw: true });
    let accessLevel = req.user?.accessLevel || "guest";

    if(accessLevel === "guest") {
        entries = entries.filter(e => e.accessLevel === "guest");
    }
    else if(accessLevel === "researcher") {
        entries = entries.filter(e => 
               e.accessLevel === "guest"
            || e.accessLevel === "researcher"
        );
    }

    if(level) {
        entries = entries.filter(e => e.accessLevel === level);
    }
    if(query) {
        query = query.toLowerCase();
        entries = entries.filter(e => 
               e.id.toLowerCase().startsWith(query)
            || e.name.toLowerCase().startsWith(query)
        );
    }
    req.session.results = entries;

    if(entries.length === 0) {
        util.flash(req, res, "error", "No results were found.");
    }
    else {
        util.flash(req, res, "info", `${entries.length} search results found:`);
    }
});

module.exports = router;