// import necessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// import the routes
const userRoutes = require("./routes/user.route")
const sampleRoutes = require("./routes/sample.route")
const blogRoutes = require("./routes/blog.route")

// load environment variables
dotenv.config()

// create an instance of express
const app = express();

// Set the port from environment variables or default to 8080
const PORT = process.env.PORT || 8080
const MONGO = process.env.MONGODB;

// Middleware to parse JSON request bodies
app.use(express.json())

// Middleware to enable CORS
app.use(cors());

// connect to MongoDB
mongoose.connect(`${MONGO}/anotherMongooseTest`)
const db = mongoose.connection
db.once("open", () => {
    console.log(`connected: ${MONGO}`)
})

// GET - /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
})

// use the user routes for signup and login
app.use("/api/user", userRoutes)

// sample routes for public and private
app.use("/api/sample", sampleRoutes)

// use the blog routes for blog operations
app.use("/api/blogs", blogRoutes)

// listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});