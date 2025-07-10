// import the necessary modules
const { Router } = require("express")
const { validateSession } = require("../middleware/validation")

// create a new router instance
const router = Router()

// GET - /api/public - public route
router.get("/public", (req, res) => {
    res.json({
        message: "This is a public route. No authentication required."
    })
})

// GET - /api/private - private route
router.get("/private", validateSession, (req, res) => {
    res.json({
        message: "This is a private route. Authentication required.",
        user: req.user // the user object attached by the validateSession middleware
    })
})

module.exports = router;