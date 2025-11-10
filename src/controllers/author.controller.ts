import { Request, Response } from "express";
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, getAuthorWithPosts } from "../services/author.service";

// Define params type for single author
interface AuthorParams {
  id: string;
}

// Define request body types for create and update
interface CreateAuthorBody {
  id: string;
  bio?: string | null;
  education?: string | null;
  expertise?: string | null;
  socialLinks?: any; // JSON in Prisma
  profileImage?: string | null;
}

interface UpdateAuthorBody {
  bio?: string | null;
  education?: string | null;
  expertise?: string | null;
  socialLinks?: any;
  profileImage?: string | null;
}

// ✅ Export all CRUD controller functions
export const fetchAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};

export const fetchAuthor = async (req: Request<AuthorParams>, res: Response) => {
  try {
    const { id } = req.params;
    const author = await getAuthorById(id);
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch author" });
  }
};

export const fetchAuthorWithPosts = async (req: Request<AuthorParams>, res: Response) => {
  try {
    const { id } = req.params;
    const author = await getAuthorWithPosts(id);
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch author with posts" });
  }
};

export const createNewAuthor = async (req: Request<{}, {}, CreateAuthorBody>, res: Response) => {
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

    const author = await updateAuthor(
      id,
      bio ?? null,
      education ?? null,
      expertise ?? null,
      socialLinks ?? null,
      profileImage ?? null
    );
    res.status(201).json(author);
  } catch (err: any) {
    if (err.code === "P2002") {
      res.status(400).json({ error: "An author with this ID already exists" });
    } else if (err.code === "P2003") {
      res.status(400).json({ error: "Invalid user ID: User does not exist" });
    } else if (err.message.includes("value too long")) {
      res.status(400).json({ error: "Bio exceeds maximum length of 500 characters" });
    } else {
      res.status(500).json({ error: err.message || "Failed to create author" });
    }
  }
};

export const updateExistingAuthor = async (req: Request<AuthorParams, {}, UpdateAuthorBody>, res: Response) => {
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

    const author = await createAuthor(
      id,
      bio ?? null,
      education ?? null,
      expertise ?? null,
      socialLinks ?? null,
      profileImage ?? null
    );
    
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err: any) {
    if (err.message.includes("value too long")) {
      res.status(400).json({ error: "Bio exceeds maximum length of 500 characters" });
    } else {
      res.status(500).json({ error: err.message || "Failed to update author" });
    }
  }
};

export const deleteExistingAuthor = async (req: Request<AuthorParams>, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteAuthor(id);
    if (!result) return res.status(404).json({ error: "Author not found" });
    res.json({ message: "Author deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete author" });
  }
};