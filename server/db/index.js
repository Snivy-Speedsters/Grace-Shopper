//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Tag = require('./models/Tag');
const TagTable = require('./models/TagTable');
const Order = require('./models/Order');

//associations could go here!
Product.belongsToMany(User, { through: 'cart' });
User.belongsToMany(Product, { through: 'cart' });
User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Tag, { through: TagTable });
Tag.belongsToMany(Product, { through: TagTable });

module.exports = {
	db,
	models: {
		User,
		Product,
		Cart,
		Tag,
		TagTable,
		Order,
	},
};
