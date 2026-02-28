"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostTag = exports.createPostTag = exports.getPostTagById = exports.getAllPostTags = void 0;
const db_1 = require("../config/db");
const getAllPostTags = async () => {
    const res = await db_1.client.query('SELECT * FROM "PostTag"');
    return res.rows;
};
exports.getAllPostTags = getAllPostTags;
const getPostTagById = async (postId, tagId) => {
    const res = await db_1.client.query('SELECT * FROM "PostTag" WHERE "postId"=$1 AND "tagId"=$2', [postId, tagId]);
    return res.rows[0];
};
exports.getPostTagById = getPostTagById;
const createPostTag = async (postId, tagId) => {
    const res = await db_1.client.query('INSERT INTO "PostTag" ("postId", "tagId") VALUES ($1, $2) RETURNING *', [postId, tagId]);
    return res.rows[0];
};
exports.createPostTag = createPostTag;
const deletePostTag = async (postId, tagId) => {
    await db_1.client.query('DELETE FROM "PostTag" WHERE "postId"=$1 AND "tagId"=$2', [postId, tagId]);
    return { message: "PostTag deleted" };
};
exports.deletePostTag = deletePostTag;
//# sourceMappingURL=postTag.service.js.map