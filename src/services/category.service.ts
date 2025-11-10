import { AppDataSource } from "../config/data-source";
import { Category } from "../entities/Category";

const categoryRepo = AppDataSource.getRepository(Category);

// ✅ Get all categories
export const getAllCategories = async () => {
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

// ✅ Get category by ID
export const getCategoryById = async (id: string) => {
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

  if (!category) return null;

  return {
    id: category.category_id,
    name: category.category_name,
    slug: category.category_slug,
    description: category.category_description,
    createdAt: category.category_createdAt,
    updatedAt: category.category_updatedAt,
  };
};

// ✅ Create category
export const createCategory = async (name: string, slug: string, description?: string | null) => {
  if (!name || !slug) throw new Error("Name and slug are required");

  const existing = await categoryRepo.findOne({ where: { slug } });
  if (existing) throw new Error("Category with this slug already exists");

  const category = categoryRepo.create({
    name,
    slug,
    description: description || null,
  });

  return categoryRepo.save(category);
};

// ✅ Update category
export const updateCategory = async (
  id: string,
  name?: string | null,
  slug?: string | null,
  description?: string | null
) => {
  const category = await categoryRepo.findOne({ where: { id } });
  if (!category) throw new Error("Category not found");

  if (slug && slug !== category.slug) {
    const existing = await categoryRepo.findOne({ where: { slug } });
    if (existing) throw new Error("Slug already in use");
  }

  if (name !== undefined) category.name = name!;
  if (slug !== undefined) category.slug = slug!;
  if (description !== undefined) category.description = description;

  return categoryRepo.save(category);
};

// ✅ Delete category
export const deleteCategory = async (id: string) => {
  const category = await categoryRepo.findOne({ where: { id } });
  if (!category) throw new Error("Category not found");
  await categoryRepo.remove(category);
  return { message: "Category deleted" };
};
