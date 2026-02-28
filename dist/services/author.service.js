"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthorWithPosts = exports.getAuthorById = exports.getAllAuthors = void 0;
const db_1 = require("../config/db");
const getAllAuthors = async () => {
    const res = await db_1.client.query('SELECT * FROM "Author"');
    return res.rows;
};
exports.getAllAuthors = getAllAuthors;
const getAuthorById = async (id) => {
    const res = await db_1.client.query('SELECT * FROM "Author" WHERE id=$1', [id]);
    return res.rows[0] || null;
};
exports.getAuthorById = getAuthorById;
const getAuthorWithPosts = async (id) => {
    const res = await db_1.client.query(`SELECT a.*, array_agg(p.*) as posts
     FROM "Author" a
     LEFT JOIN "Post" p ON p."authorId" = a.id
     WHERE a.id = $1
     GROUP BY a.id`, [id]);
    return res.rows[0] || null;
};
exports.getAuthorWithPosts = getAuthorWithPosts;
const createAuthor = async (id, bio, education, expertise, socialLinks, profileImage) => {
    const res = await db_1.client.query('INSERT INTO "Author" (id, bio, education, expertise, "socialLinks", "profileImage") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, bio, education, expertise, socialLinks, profileImage]);
    return res.rows[0];
};
exports.createAuthor = createAuthor;
const updateAuthor = async (id, bio, education, expertise, socialLinks, profileImage) => {
    const res = await db_1.client.query('UPDATE "Author" SET bio=$1, education=$2, expertise=$3, "socialLinks"=$4, "profileImage"=$5 WHERE id=$6 RETURNING *', [bio, education, expertise, socialLinks, profileImage, id]);
    return res.rows[0] || null;
};
exports.updateAuthor = updateAuthor;
const deleteAuthor = async (id) => {
    const res = await db_1.client.query('DELETE FROM "Author" WHERE id=$1 RETURNING *', [id]);
    return res.rows[0] ? { message: "Author deleted" } : null;
};
exports.deleteAuthor = deleteAuthor;
//# sourceMappingURL=author.service.js.map