const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	complete: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	cart: {
		type: Sequelize.ARRAY(Sequelize.JSONB),
		defaultValue: [],
	},
});

module.exports = Order;
