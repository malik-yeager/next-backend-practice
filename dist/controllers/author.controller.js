"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExistingAuthor = exports.updateExistingAuthor = exports.createNewAuthor = exports.fetchAuthorWithPosts = exports.fetchAuthor = exports.fetchAuthors = void 0;
const author_service_1 = require("../services/author.service");
// ✅ Export all CRUD controller functions
const fetchAuthors = async (req, res) => {
    try {
        const authors = await (0, author_service_1.getAllAuthors)();
        res.json(authors);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch authors" });
    }
};
exports.fetchAuthors = fetchAuthors;
const fetchAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await (0, author_service_1.getAuthorById)(id);
        if (!author)
            return res.status(404).json({ error: "Author not found" });
        res.json(author);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch author" });
    }
};
exports.fetchAuthor = fetchAuthor;
const fetchAuthorWithPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await (0, author_service_1.getAuthorWithPosts)(id);
        if (!author)
            return res.status(404).json({ error: "Author not found" });
        res.json(author);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch author with posts" });
    }
};
exports.fetchAuthorWithPosts = fetchAuthorWithPosts;
const createNewAuthor = async (req, res) => {
    try {
        const { id, bio, education, expertise, socialLinks, profileImage } = req.body;
        // Validation
        if (!id) {
            return res.status(400).json({ error: "Author ID is required" });
        }
        if (bio !== undefined && bio !== null && typeof bio !== "string") {
            return res.status(400).json({ error: "Bio must be a string or null" });
        }
        if (bio && bio.length > 500) {
            return res.status(400).json({ error: "Bio cannot exceed 500 characters" });
        }
        if (education !== undefined && education !== null && typeof education !== "string") {
            return res.status(400).json({ error: "Education must be a string or null" });
        }
        if (expertise !== undefined && expertise !== null && typeof expertise !== "string") {
            return res.status(400).json({ error: "Expertise must be a string or null" });
        }
        if (profileImage !== undefined && profileImage !== null && typeof profileImage !== "string") {
            return res.status(400).json({ error: "Profile image must be a string or null" });
        }
        const author = await (0, author_service_1.updateAuthor)(id, bio ?? null, education ?? null, expertise ?? null, socialLinks ?? null, profileImage ?? null);
        res.status(201).json(author);
    }
    catch (err) {
        if (err.code === "P2002") {
            res.status(400).json({ error: "An author with this ID already exists" });
        }
        else if (err.code === "P2003") {
            res.status(400).json({ error: "Invalid user ID: User does not exist" });
        }
        else if (err.message.includes("value too long")) {
            res.status(400).json({ error: "Bio exceeds maximum length of 500 characters" });
        }
        else {
            res.status(500).json({ error: err.message || "Failed to create author" });
        }
    }
};
exports.createNewAuthor = createNewAuthor;
const updateExistingAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, education, expertise, socialLinks, profileImage } = req.body;
        if (bio != null) { // handles undefined and null
            if (typeof bio !== "string") {
                return res.status(400).json({ error: "Bio must be a string" });
            }
            if (bio.length > 500) {
                return res.status(400).json({ error: "Bio cannot exceed 500 characters" });
            }
        }
        // Validation
        if (bio !== undefined && bio !== null && typeof bio !== "string") {
            return res.status(400).json({ error: "Bio must be a string or null" });
        }
        if (bio && bio.length > 500) {
            return res.status(400).json({ error: "Bio cannot exceed 500 characters" });
        }
        if (education !== undefined && education !== null && typeof education !== "string") {
            return res.status(400).json({ error: "Education must be a string or null" });
        }
        if (expertise !== undefined && expertise !== null && typeof expertise !== "string") {
            return res.status(400).json({ error: "Expertise must be a string or null" });
        }
        if (profileImage !== undefined && profileImage !== null && typeof profileImage !== "string") {
            return res.status(400).json({ error: "Profile image must be a string or null" });
        }
        const author = await (0, author_service_1.createAuthor)(id, bio ?? null, education ?? null, expertise ?? null, socialLinks ?? null, profileImage ?? null);
        if (!author)
            return res.status(404).json({ error: "Author not found" });
        res.json(author);
    }
    catch (err) {
        if (err.message.includes("value too long")) {
            res.status(400).json({ error: "Bio exceeds maximum length of 500 characters" });
        }
        else {
            res.status(500).json({ error: err.message || "Failed to update author" });
        }
    }
};
exports.updateExistingAuthor = updateExistingAuthor;
const deleteExistingAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, author_service_1.deleteAuthor)(id);
        if (!result)
            return res.status(404).json({ error: "Author not found" });
        res.json({ message: "Author deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Failed to delete author" });
    }
};
exports.deleteExistingAuthor = deleteExistingAuthor;
//# sourceMappingURL=author.controller.js.map