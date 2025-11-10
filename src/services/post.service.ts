import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

const postRepo = AppDataSource.getRepository(Post);
const userRepo = AppDataSource.getRepository(User);

// ✅ Get all posts
export const getAllPosts = async () => {
  const posts = await postRepo
    .createQueryBuilder("post")
    .leftJoinAndSelect("post.author", "author")
    .select([
      "post.id",
      "post.slug",
      "post.title",
      "post.excerpt",
      "post.status",
      "post.visibility",
      "post.views_count",
      "post.likes_count",
      "post.comments_count",
      "post.created_at",
      "post.updated_at",
      "author.id",
      "author.name",
      "author.email",
    ])
    .orderBy("post.created_at", "DESC")
    .getMany();

  return posts;
};

// ✅ Get post by ID
export const getPostById = async (id: string) => {
  const post = await postRepo.findOne({
    where: { id },
    relations: ["author", "createdBy", "updatedBy", "previousVersion"],
  });

  return post || null;
};

// ✅ Create post
export const createPost = async (data: Partial<Post>) => {
  const { slug, title, author_id } = data;

  if (!slug || !title) throw new Error("Slug and title are required");

  const existing = await postRepo.findOne({ where: { slug } });
  if (existing) throw new Error("Post with this slug already exists");

  let author: User | null = null;
  if (author_id) {
    author = await userRepo.findOne({ where: { id: author_id } });
    if (!author) throw new Error("Invalid author ID");
  }

  const post = postRepo.create({
    ...data,
    author,
  });

  return postRepo.save(post);
};

// ✅ Update post
export const updatePost = async (id: string, data: Partial<Post>) => {
  const post = await postRepo.findOne({ where: { id } });
  if (!post) throw new Error("Post not found");

  if (data.slug && data.slug !== post.slug) {
    const existing = await postRepo.findOne({ where: { slug: data.slug } });
    if (existing) throw new Error("Slug already in use");
  }

  Object.assign(post, data);
  return postRepo.save(post);
};

// ✅ Delete post
export const deletePost = async (id: string) => {
  const post = await postRepo.findOne({ where: { id } });
  if (!post) throw new Error("Post not found");
  await postRepo.softRemove(post);
  return { message: "Post deleted successfully" };
};
