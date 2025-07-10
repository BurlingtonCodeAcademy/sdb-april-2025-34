// import the necessary modules
const { Router } = require("express")
const { signup, login } = require("../controllers/user.controller")

// create a new router instance
const router = Router()

// POST - /api/signup - create a new user
router.post("/signup", signup)

// POST - /api/login - authenticate a user
router.post("/login", login)

module.exports = router;