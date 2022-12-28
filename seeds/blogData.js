const { blog } = require("../models");

const blogdata = [];

const seedBlog = () => blog.bulkCreate(blogdata);

module.exports = seedBlog;
