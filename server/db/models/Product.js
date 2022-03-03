const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
	name: Sequelize.STRING,
	price: Sequelize.DECIMAL(10, 2),
	imageUrl: Sequelize.STRING,
});

module.exports = Product;
