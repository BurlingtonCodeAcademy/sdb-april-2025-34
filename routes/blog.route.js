// import the necessary modules
const { Router } = require("express")
const { validateSession } = require('../middleware/validation');
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const { get } = require("mongoose");

// Create a new router instance
const router = Router();

// GET - /api/blogs - Fetch all blogs
router.get("/", getAllBlogs);

// POST - /api/blogs - Create a new blog
router.post("/", validateSession, createBlog);

// GET - /api/blogs/:id - Fetch a blog by ID
router.get("/:id", getBlogById);

// PUT - /api/blogs/:id - Update a blog by ID
router.put("/:id", validateSession, updateBlog);

// DELETE - /api/blogs/:id - Delete a blog by ID
router.delete("/:id", validateSession, deleteBlog);

// Export the router
module.exports = router;
