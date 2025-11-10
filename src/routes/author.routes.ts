import { Router } from "express";
import { fetchAuthors, fetchAuthor, fetchAuthorWithPosts, createNewAuthor, updateExistingAuthor, deleteExistingAuthor } from "../controllers/author.controller";

const router = Router();

router.get("/", fetchAuthors);
router.get("/:id", fetchAuthor);
router.get("/:id/posts", fetchAuthorWithPosts);
router.post("/", createNewAuthor);
router.put("/:id", updateExistingAuthor);
router.delete("/:id", deleteExistingAuthor);

export default router;