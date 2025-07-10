const express = require('express');
const User = require('./models/user.model')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validateSession } = require('./middleware/validation')
const userRoutes = require("./routes/user.route")
const sampleRoutes = require("./routes/sample.route")

// load environment variables
dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080
const MONGO = process.env.MONGODB;

// Middleware to parse JSON request bodies
app.use(express.json())

// connect to MongoDB
mongoose.connect(`${MONGO}/anotherMongooseTest`)
const db = mongoose.connection
db.once("open", () => {
    console.log(`connected: ${MONGO}`)
})

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
})

// use the user routes for signup and login
app.use("/api/user", userRoutes)

// sample routes for public and private
app.use("/api/sample", sampleRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});