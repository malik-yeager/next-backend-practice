import { client } from "../config/db";

export const getAllAuthors = async () => {
  const res = await client.query('SELECT * FROM "Author"');
  return res.rows;
};

export const getAuthorById = async (id: string) => {
  const res = await client.query('SELECT * FROM "Author" WHERE id=$1', [id]);
  return res.rows[0] || null;
};

export const getAuthorWithPosts = async (id: string) => {
  const res = await client.query(
    `SELECT a.*, array_agg(p.*) as posts
     FROM "Author" a
     LEFT JOIN "Post" p ON p."authorId" = a.id
     WHERE a.id = $1
     GROUP BY a.id`,
    [id]
  );
  return res.rows[0] || null;
};

export const createAuthor = async (
  id: string,
  bio: string | null,
  education: string | null,
  expertise: string | null,
  socialLinks: any | null,
  profileImage: string | null
) => {
  const res = await client.query(
    'INSERT INTO "Author" (id, bio, education, expertise, "socialLinks", "profileImage") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, bio, education, expertise, socialLinks, profileImage]
  );
  return res.rows[0];
};

export const updateAuthor = async (
  id: string,
  bio: string | null,
  education: string | null,
  expertise: string | null,
  socialLinks: any | null,
  profileImage: string | null
) => {
  const res = await client.query(
    'UPDATE "Author" SET bio=$1, education=$2, expertise=$3, "socialLinks"=$4, "profileImage"=$5 WHERE id=$6 RETURNING *',
    [bio, education, expertise, socialLinks, profileImage, id]
  );
  return res.rows[0] || null;
};

export const deleteAuthor = async (id: string) => {
  const res = await client.query('DELETE FROM "Author" WHERE id=$1 RETURNING *', [id]);
  return res.rows[0] ? { message: "Author deleted" } : null;
};