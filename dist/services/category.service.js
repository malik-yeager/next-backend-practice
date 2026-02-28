"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const data_source_1 = require("../config/data-source");
const Category_1 = require("../entities/Category");
const categoryRepo = data_source_1.AppDataSource.getRepository(Category_1.Category);
// ✅ Get all categories
const getAllCategories = async () => {
    const categories = await categoryRepo
        .createQueryBuilder("category")
        .select([
        "category.id",
        "category.name",
        "category.slug",
        "category.description",
        "category.createdAt",
        "category.updatedAt",
    ])
        .getRawMany();
    return categories.map((c) => ({
        id: c.category_id,
        name: c.category_name,
        slug: c.category_slug,
        description: c.category_description,
        createdAt: c.category_createdAt,
        updatedAt: c.category_updatedAt,
    }));
};
exports.getAllCategories = getAllCategories;
// ✅ Get category by ID
const getCategoryById = async (id) => {
    const category = await categoryRepo
        .createQueryBuilder("category")
        .select([
        "category.id",
        "category.name",
        "category.slug",
        "category.description",
        "category.createdAt",
        "category.updatedAt",
    ])
        .where("category.id = :id", { id })
        .getRawOne();
    if (!category)
        return null;
    return {
        id: category.category_id,
        name: category.category_name,
        slug: category.category_slug,
        description: category.category_description,
        createdAt: category.category_createdAt,
        updatedAt: category.category_updatedAt,
    };
};
exports.getCategoryById = getCategoryById;
// ✅ Create category
const createCategory = async (name, slug, description) => {
    if (!name || !slug)
        throw new Error("Name and slug are required");
    const existing = await categoryRepo.findOne({ where: { slug } });
    if (existing)
        throw new Error("Category with this slug already exists");
    const category = categoryRepo.create({
        name,
        slug,
        description: description || null,
    });
    return categoryRepo.save(category);
};
exports.createCategory = createCategory;
// ✅ Update category
const updateCategory = async (id, name, slug, description) => {
    const category = await categoryRepo.findOne({ where: { id } });
    if (!category)
        throw new Error("Category not found");
    if (slug && slug !== category.slug) {
        const existing = await categoryRepo.findOne({ where: { slug } });
        if (existing)
            throw new Error("Slug already in use");
    }
    if (name !== undefined)
        category.name = name;
    if (slug !== undefined)
        category.slug = slug;
    if (description !== undefined)
        category.description = description;
    return categoryRepo.save(category);
};
exports.updateCategory = updateCategory;
// ✅ Delete category
const deleteCategory = async (id) => {
    const category = await categoryRepo.findOne({ where: { id } });
    if (!category)
        throw new Error("Category not found");
    await categoryRepo.remove(category);
    return { message: "Category deleted" };
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.service.js.map