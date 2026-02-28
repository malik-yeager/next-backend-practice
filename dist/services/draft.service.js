"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishDraft = exports.updateDraft = exports.getDraftById = exports.getAllDrafts = exports.createDraft = void 0;
const data_source_1 = require("../config/data-source");
const Draft_1 = require("../entities/Draft");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const draftRepo = data_source_1.AppDataSource.getRepository(Draft_1.Draft);
const postRepo = data_source_1.AppDataSource.getRepository(Post_1.Post);
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
// ✅ Create Draft
const createDraft = async (data) => {
    const draft = draftRepo.create(data);
    return draftRepo.save(draft);
};
exports.createDraft = createDraft;
// ✅ Get All Drafts
const getAllDrafts = async () => {
    return draftRepo.find({
        order: { updated_at: "DESC" },
        relations: ["author"]
    });
};
exports.getAllDrafts = getAllDrafts;
// ✅ Get Draft by ID
const getDraftById = async (id) => {
    return draftRepo.findOne({ where: { id }, relations: ["author"] });
};
exports.getDraftById = getDraftById;
// ✅ Update Draft
const updateDraft = async (id, data) => {
    const draft = await draftRepo.findOne({ where: { id } });
    if (!draft)
        throw new Error("Draft not found");
    Object.assign(draft, data);
    return draftRepo.save(draft);
};
exports.updateDraft = updateDraft;
// ✅ Publish Draft (Move to Post)
const publishDraft = async (id) => {
    return data_source_1.AppDataSource.transaction(async (transactionalEntityManager) => {
        const draft = await transactionalEntityManager.findOne(Draft_1.Draft, { where: { id } });
        if (!draft)
            throw new Error("Draft not found");
        if (!draft.title)
            throw new Error("Title is required to publish");
        // Generate slug if missing
        let slug = draft.slug;
        if (!slug) {
            slug = draft.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        // Check slug uniqueness
        const existingPost = await transactionalEntityManager.findOne(Post_1.Post, { where: { slug } });
        if (existingPost && existingPost.id !== draft.target_post_id) {
            throw new Error("Slug already in use");
        }
        let post;
        if (draft.target_post_id) {
            // Update existing post
            const existing = await transactionalEntityManager.findOne(Post_1.Post, { where: { id: draft.target_post_id } });
            if (!existing)
                throw new Error("Target post not found");
            post = existing;
        }
        else {
            // Create new post
            post = new Post_1.Post();
        }
        // Map Draft fields to Post fields
        post.title = draft.title;
        post.slug = slug;
        post.content = draft.content;
        post.excerpt = draft.excerpt;
        post.author_id = draft.author_id;
        post.status = 'published';
        post.published_at = new Date();
        // Map Meta fields
        if (draft.meta) {
            post.meta = draft.meta;
            post.featured_image = draft.meta.featuredImage || null;
            post.canonical_url = draft.meta.canonicalUrl || null;
            post.sponsored = draft.meta.isSponsored || false;
            post.affiliate = draft.meta.affiliateLinks?.length > 0 || false;
            post.tags = draft.meta.tags || [];
            // Handle categories (assuming meta stores selectedCategory object)
            if (draft.meta.selectedCategory) {
                post.categories = [draft.meta.selectedCategory.name];
            }
        }
        const savedPost = await transactionalEntityManager.save(Post_1.Post, post);
        // Delete draft after successful publish
        await transactionalEntityManager.remove(Draft_1.Draft, draft);
        return savedPost;
    });
};
exports.publishDraft = publishDraft;
//# sourceMappingURL=draft.service.js.map