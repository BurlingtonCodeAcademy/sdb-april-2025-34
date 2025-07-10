// import the necessary modules
const { Router } = require("express")
const Blog = require("../models/blog.model")
const { validateSession } = require('../middleware/validation');

// Create a new router instance
const router = Router();

// GET - /api/blogs - Fetch all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
});

// POST - /api/blogs - Create a new blog
router.post("/", validateSession, async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(400).json({ error: "Bad Request" });
    }
});

// GET - /api/blogs/:id - Fetch a blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT - /api/blogs/:id - Update a blog by ID
router.put("/:id", validateSession, async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.json(updatedBlog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE - /api/blogs/:id - Delete a blog by ID
router.delete("/:id", validateSession, async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router
module.exports = router;
