const express = require("express");
const app = express();

const PORT = process.env.PORT || 80;

const db = require("./src/db.js");
const util = require("./src/util.js");

const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);

app.use(session({
    secret: require("crypto").randomBytes(32).toString("hex"),
    store: new SessionStore({
        db: db.sequelize,
    }),
    resave: false,
    saveUninitialized: false,
}));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use((req, res, next) => {
    // no XSS or iframing :>
    res.setHeader("Content-Security-Policy", `
        default-src 'self';
        style-src 'self' https://fonts.googleapis.com;
        font-src https://fonts.gstatic.com;
        object-src 'none';
        base-uri 'none';
        frame-ancestors 'none';
    `.trim().replace(/\s+/g, " "));
    res.setHeader("X-Frame-Options", "DENY");
    next();
});

app.use(async (req, res, next) => {
    if(req.session.user) {
        try {
            req.user = await db.User.findByPk(req.session.user);
            res.locals.user = req.user;
        }
        catch(err) {
            req.session.user = null;
        }
    }
    next();
});

app.get("/debug", util.isLocalhost, (req, res) => {
    let utils = require("util");
    res.end(
        Object.getOwnPropertyNames(global)
        .map(n => `${n}:\n${utils.inspect(global[n])}`)
        .join("\n\n")
    );
});

app.use("/search", require("./routes/search.js"));
app.use("/scan", require("./routes/scan.js"));
app.use("/login", require("./routes/login.js"));
app.use("/register", require("./routes/register.js"));
app.use("/view", require("./routes/view.js"));

app.get("/logout", (req, res) => {
    req.session.destroy(() => {});
    util.flash(req, res, "info", "Logged out successfully.", "/");
});
app.get("/", (req, res) => res.render("index"));

app.listen(PORT, () => console.log(`OOPArtDB listening on port ${PORT}`));
