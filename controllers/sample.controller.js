exports.getPublicRoute = (req, res) => {
    res.json({
        message: "This is a public route. No authentication required."
    });
};

exports.getPrivateRoute = (req, res) => {
    res.json({
        message: "This is a private route. Authentication required.",
        user: req.user // The user object attached by the validateSession middleware
    });
};