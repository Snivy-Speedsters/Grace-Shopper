//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')

//associations could go here!
Product.belongsToMany(User, {through: 'cart'})
User.belongsToMany(Product, {through: 'cart'})

module.exports = {
  db,
  models: {
    User,
    Product
  },
}
