const router = require('express').Router()
const { models: { User, Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId

    const user = await User.findByPk(userId,
      {attributes: ['firstName', 'lastName', 'email']})
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId

    const user = await User.findByPk(userId,
      {include: {model: Product, attributes: ['id','name', 'price', 'imageUrl'], through: {attributes: []}}
    })
    res.send(user.products)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const productId = req.params.productId
    const action = req.body.action
    const actionVerb = action === 'add' ? 'Added' : 'Removed'

    const user = await User.findByPk(userId)
    const product = await Product.findByPk(productId)

    switch(action){
      case 'add':
        user.addProduct(product)
        break
      case 'remove':
        user.removeProduct(product)
        break
      default:
        break
    }

    res.send(`${actionVerb} ${product.name}`)

  } catch (err) {
    next(err)
  }
})
