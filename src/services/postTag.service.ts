import { client } from "../config/db";

export const getAllPostTags = async () => {
  const res = await client.query('SELECT * FROM "PostTag"');
  return res.rows;
};

export const getPostTagById = async (postId: string, tagId: number) => {
  const res = await client.query('SELECT * FROM "PostTag" WHERE "postId"=$1 AND "tagId"=$2', [postId, tagId]);
  return res.rows[0];
};

export const createPostTag = async (postId: string, tagId: number) => {
  const res = await client.query(
    'INSERT INTO "PostTag" ("postId", "tagId") VALUES ($1, $2) RETURNING *',
    [postId, tagId]
  );
  return res.rows[0];
};

export const deletePostTag = async (postId: string, tagId: number) => {
  await client.query('DELETE FROM "PostTag" WHERE "postId"=$1 AND "tagId"=$2', [postId, tagId]);
  return { message: "PostTag deleted" };
};