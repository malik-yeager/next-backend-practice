import { client } from "../config/db";

export const getAllPostViews = async () => {
  const res = await client.query('SELECT * FROM "PostView"');
  return res.rows;
};

export const getPostViewById = async (id: string) => {
  const res = await client.query('SELECT * FROM "PostView" WHERE id=$1', [id]);
  return res.rows[0];
};

export const createPostView = async (postId: string, userId: string | null) => {
  const res = await client.query(
    'INSERT INTO "PostView" ("postId", "userId") VALUES ($1, $2) RETURNING *',
    [postId, userId]
  );
  return res.rows[0];
};

export const updatePostView = async (id: string, postId: string, userId: string | null) => {
  const res = await client.query(
    'UPDATE "PostView" SET "postId"=$1, "userId"=$2 WHERE id=$3 RETURNING *',
    [postId, userId, id]
  );
  return res.rows[0];
};

export const deletePostView = async (id: string) => {
  await client.query('DELETE FROM "PostView" WHERE id=$1', [id]);
  return { message: "PostView deleted" };
};