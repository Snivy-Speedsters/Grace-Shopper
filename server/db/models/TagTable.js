const Sequelize = require('sequelize');
const db = require('../db');

const TagTable = db.define('tag-table', {
});

module.exports = TagTable;
