"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostView = exports.updatePostView = exports.createPostView = exports.getPostViewById = exports.getAllPostViews = void 0;
const db_1 = require("../config/db");
const getAllPostViews = async () => {
    const res = await db_1.client.query('SELECT * FROM "PostView"');
    return res.rows;
};
exports.getAllPostViews = getAllPostViews;
const getPostViewById = async (id) => {
    const res = await db_1.client.query('SELECT * FROM "PostView" WHERE id=$1', [id]);
    return res.rows[0];
};
exports.getPostViewById = getPostViewById;
const createPostView = async (postId, userId) => {
    const res = await db_1.client.query('INSERT INTO "PostView" ("postId", "userId") VALUES ($1, $2) RETURNING *', [postId, userId]);
    return res.rows[0];
};
exports.createPostView = createPostView;
const updatePostView = async (id, postId, userId) => {
    const res = await db_1.client.query('UPDATE "PostView" SET "postId"=$1, "userId"=$2 WHERE id=$3 RETURNING *', [postId, userId, id]);
    return res.rows[0];
};
exports.updatePostView = updatePostView;
const deletePostView = async (id) => {
    await db_1.client.query('DELETE FROM "PostView" WHERE id=$1', [id]);
    return { message: "PostView deleted" };
};
exports.deletePostView = deletePostView;
//# sourceMappingURL=postView.services.js.map