import { AppDataSource } from "../config/data-source";
import { Tag } from "../entities/Tag";

const tagRepo = AppDataSource.getRepository(Tag);

// ✅ Get all tags
export const getAllTags = async () => {
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

// ✅ Get tag by ID
export const getTagById = async (id: string) => {
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

  if (!tag) return null;

  return {
    id: tag.tag_id,
    name: tag.tag_name,
    slug: tag.tag_slug,
    description: tag.tag_description,
    createdAt: tag.tag_createdAt,
    updatedAt: tag.tag_updatedAt,
  };
};

// ✅ Create tag
export const createTag = async (name: string, slug: string, description?: string | null) => {
  if (!name || !slug) throw new Error("Name and slug are required");

  const existing = await tagRepo.findOne({ where: { slug } });
  if (existing) throw new Error("Tag with this slug already exists");

  const tag = tagRepo.create({
    name,
    slug,
    description: description || null,
  });

  return tagRepo.save(tag);
};

// ✅ Update tag
export const updateTag = async (
  id: string,
  name?: string | null,
  slug?: string | null,
  description?: string | null
) => {
  const tag = await tagRepo.findOne({ where: { id } });
  if (!tag) throw new Error("Tag not found");

  if (slug && slug !== tag.slug) {
    const existing = await tagRepo.findOne({ where: { slug } });
    if (existing) throw new Error("Slug already in use");
  }

  if (name !== undefined) tag.name = name!;
  if (slug !== undefined) tag.slug = slug!;
  if (description !== undefined) tag.description = description;

  return tagRepo.save(tag);
};

// ✅ Delete tag
export const deleteTag = async (id: string) => {
  const tag = await tagRepo.findOne({ where: { id } });
  if (!tag) throw new Error("Tag not found");
  await tagRepo.remove(tag);
  return { message: "Tag deleted" };
};
