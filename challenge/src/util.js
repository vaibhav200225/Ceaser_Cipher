const flash = (req, res, type, msg, url) => {
    let endpoint = url || req.originalUrl;
    let delim = endpoint.includes("?") ? "&" : "?";
    return res.redirect(`${endpoint}${delim}${type}=${encodeURIComponent(msg)}`);
};

const isLoggedIn = (req, res, next) => {
    if(!req.user) {
        return flash(req, res, "error", "You must be logged in to access this page.", "/");
    }
    next();
};

const isLocalhost = (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if(ip !== "127.0.0.1") {
        return flash(req, res, "error", "You cannot access this page.", "/");
    }
    next();
};

module.exports = { flash, isLoggedIn, isLocalhost };