// import the necessary modules
const { Router } = require("express")
const { validateSession } = require("../middleware/validation")
const { getPublicRoute, getPrivateRoute } = require("../controllers/sample.controller")

// create a new router instance
const router = Router()

// GET - /api/public - public route
router.get("/public", getPublicRoute)

// GET - /api/private - private route
router.get("/private", validateSession, getPrivateRoute)

module.exports = router;