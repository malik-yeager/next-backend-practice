"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.createTag = exports.getTagById = exports.getAllTags = void 0;
const data_source_1 = require("../config/data-source");
const Tag_1 = require("../entities/Tag");
const tagRepo = data_source_1.AppDataSource.getRepository(Tag_1.Tag);
// ✅ Get all tags
const getAllTags = async () => {
    const tags = await tagRepo
        .createQueryBuilder("tag")
        .select([
        "tag.id",
        "tag.name",
        "tag.slug",
        "tag.description",
        "tag.createdAt",
        "tag.updatedAt",
    ])
        .getRawMany();
    return tags.map((t) => ({
        id: t.tag_id,
        name: t.tag_name,
        slug: t.tag_slug,
        description: t.tag_description,
        createdAt: t.tag_createdAt,
        updatedAt: t.tag_updatedAt,
    }));
};
exports.getAllTags = getAllTags;
// ✅ Get tag by ID
const getTagById = async (id) => {
    const tag = await tagRepo
        .createQueryBuilder("tag")
        .select([
        "tag.id",
        "tag.name",
        "tag.slug",
        "tag.description",
        "tag.createdAt",
        "tag.updatedAt",
    ])
        .where("tag.id = :id", { id })
        .getRawOne();
    if (!tag)
        return null;
    return {
        id: tag.tag_id,
        name: tag.tag_name,
        slug: tag.tag_slug,
        description: tag.tag_description,
        createdAt: tag.tag_createdAt,
        updatedAt: tag.tag_updatedAt,
    };
};
exports.getTagById = getTagById;
// ✅ Create tag
const createTag = async (name, slug, description) => {
    if (!name || !slug)
        throw new Error("Name and slug are required");
    const existing = await tagRepo.findOne({ where: { slug } });
    if (existing)
        throw new Error("Tag with this slug already exists");
    const tag = tagRepo.create({
        name,
        slug,
        description: description || null,
    });
    return tagRepo.save(tag);
};
exports.createTag = createTag;
// ✅ Update tag
const updateTag = async (id, name, slug, description) => {
    const tag = await tagRepo.findOne({ where: { id } });
    if (!tag)
        throw new Error("Tag not found");
    if (slug && slug !== tag.slug) {
        const existing = await tagRepo.findOne({ where: { slug } });
        if (existing)
            throw new Error("Slug already in use");
    }
    if (name !== undefined)
        tag.name = name;
    if (slug !== undefined)
        tag.slug = slug;
    if (description !== undefined)
        tag.description = description;
    return tagRepo.save(tag);
};
exports.updateTag = updateTag;
// ✅ Delete tag
const deleteTag = async (id) => {
    const tag = await tagRepo.findOne({ where: { id } });
    if (!tag)
        throw new Error("Tag not found");
    await tagRepo.remove(tag);
    return { message: "Tag deleted" };
};
exports.deleteTag = deleteTag;
//# sourceMappingURL=tag.service.js.map