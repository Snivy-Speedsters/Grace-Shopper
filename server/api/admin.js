const router = require('express').Router();
const {
	models: { User, Product, Order },
} = require('../db');
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization : req.body.headers.authorization
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

router.get("/users", requireToken, async (req, res, next) => {
  if(req.user.administrator){
    try{
      const users = await User.findAll({attributes:
        ['firstName','lastName','email', 'id']
      })

      res.send(users)
    } catch(error) {
      next(error)
      }
    } else {
      res.send('not authenticated')
  }
})

router.get("/orders", requireToken, async (req, res, next) => {
  if(req.user.administrator){
    try{
      const orders = await Order.findAll()

      res.send(orders)
    } catch(error) {
      next(error)
      }
    } else {
      res.send('not authenticated')
  }
})

router.post("/products", requireToken, async (req, res, next) => {
  if(req.user.administrator){
    try{
      const { name, price } = req.body.product

      const product = await Product.create({ name, price })

      res.send(product)
    } catch(error) {
      next(error)
    }
  } else {
    res.send('not authenticated')
  }
})

router.put("/products/:productId", requireToken, async (req, res, next) => {
  if(req.user.administrator){
    try{
      let product = await Product.findByPk(req.params.productId)
      const {name, price, time} = req.body.changes

      product = await product.set({
        name: name ? name : product.name,
        price: price ? price : product.price,
        time: time ? time : product.time})

      await product.save()

      res.send(product)
    } catch(error) {
      next(error)
    }
  } else {
    res.send('not authenticated')
  }
})

router.delete("/products/:productId", requireToken, async (req, res, next) => {
  if(req.user.administrator){
    try{
      let product = await Product.findByPk(req.params.productId)

      await product.destroy()

      res.send(product)
    } catch(error) {
      next(error)
    }
  } else {
    res.send('not authenticated')
  }
})
