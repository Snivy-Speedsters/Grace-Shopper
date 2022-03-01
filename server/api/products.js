const router = require('express').Router();
const {
	models: { Product },
} = require('../db');
module.exports = router;

// /api/products
router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (err) {
		next(err);
	}
});

// /api/products/:id
router.get('/:id', async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		res.json(product);
	} catch (err) {
		next(err);
	}
});
