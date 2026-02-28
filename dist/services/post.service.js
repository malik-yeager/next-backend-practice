"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getRelatedPosts = exports.getAllPosts = void 0;
const data_source_1 = require("../config/data-source");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const postRepo = data_source_1.AppDataSource.getRepository(Post_1.Post);
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
// ✅ Get all posts
const getAllPosts = async () => {
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
        "post.affiliate",
        "post.sponsored",
        "post.canonical_url",
        "post.featured_image",
        "post.scheduled_at",
        "author.id",
        "author.name",
        "author.email",
    ])
        .orderBy("post.created_at", "DESC")
        .getMany();
    return posts;
};
exports.getAllPosts = getAllPosts;
// ✅ Get related posts
const getRelatedPosts = async (id) => {
    const post = await postRepo.findOne({ where: { id } });
    if (!post)
        throw new Error("Post not found");
    const { tags, categories } = post;
    if ((!tags || tags.length === 0) && (!categories || categories.length === 0)) {
        return [];
    }
    const query = postRepo.createQueryBuilder("post")
        .where("post.id != :id", { id })
        .andWhere("post.status = 'published'");
    if (tags && tags.length > 0) {
        query.orWhere("post.tags && :tags", { tags });
    }
    if (categories && categories.length > 0) {
        query.orWhere("post.categories && :categories", { categories });
    }
    const relatedPosts = await query
        .limit(5)
        .getMany();
    return relatedPosts;
};
exports.getRelatedPosts = getRelatedPosts;
// ✅ Get post by ID
const getPostById = async (id) => {
    const post = await postRepo.findOne({
        where: { id },
        relations: ["author", "createdBy", "updatedBy", "previousVersion"],
    });
    return post || null;
};
exports.getPostById = getPostById;
// ✅ Create post
const createPost = async (data) => {
    const { slug, title, author_id } = data;
    if (!slug || !title)
        throw new Error("Slug and title are required");
    const existing = await postRepo.findOne({ where: { slug } });
    if (existing)
        throw new Error("Post with this slug already exists");
    let author = null;
    if (author_id) {
        author = await userRepo.findOne({ where: { id: author_id } });
        if (!author)
            throw new Error("Invalid author ID");
    }
    const post = postRepo.create({
        ...data,
        author,
    });
    return postRepo.save(post);
};
exports.createPost = createPost;
// ✅ Update post
const updatePost = async (id, data) => {
    const post = await postRepo.findOne({ where: { id } });
    if (!post)
        throw new Error("Post not found");
    if (data.slug && data.slug !== post.slug) {
        const existing = await postRepo.findOne({ where: { slug: data.slug } });
        if (existing)
            throw new Error("Slug already in use");
    }
    Object.assign(post, data);
    return postRepo.save(post);
};
exports.updatePost = updatePost;
// ✅ Delete post
const deletePost = async (id) => {
    const post = await postRepo.findOne({ where: { id } });
    if (!post)
        throw new Error("Post not found");
    await postRepo.softRemove(post);
    return { message: "Post deleted successfully" };
};
exports.deletePost = deletePost;
//# sourceMappingURL=post.service.js.map