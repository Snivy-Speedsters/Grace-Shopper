const Sequelize = require('sequelize');
const db = require('../db');

const Tag = db.define('tag', {
	name: Sequelize.STRING,
});

module.exports = Tag;
