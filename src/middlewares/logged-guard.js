module.exports = (req, res, next) => {
    if (!req.currentUser) {
        res.redirect(`/login?backUrl=${req.originalUrl}&method=${req.method}`);
        return;
    }

    next();
};
