const router = require('express').Router();
const {
	models: { User, Product, Cart },
} = require('../db');
module.exports = router;

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization
			? req.headers.authorization
			: req.body.headers.authorization;
		const user = await User.findByToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

router.get('/', requireToken, async (req, res, next) => {
	try {
		res.send(req.user);
	} catch (err) {
		next(err);
	}
});

router.get('/cart', requireToken, async (req, res, next) => {
	try {
		res.send(req.user.products);
	} catch (err) {
		next(err);
	}
});

router.put('/cart/:productId/update', requireToken, async (req, res, next) => {
	try {
		const { user } = req;
		const { productId } = req.params;
		const { qty } = req.body;

		const product = await Cart.findAll({
			where: {
				userId: user.id,
				productId,
			},
		});

		await product[0].update({ qty });
		await product[0].save();

		res.send(product);
	} catch (err) {
		next(err);
	}
});

router.put('/cart/checkout', requireToken, async (req, res, next) => {
	try {
		const { user } = req;
		const pastOrders = [...user.pastOrders, ...user.products];

		await user.update({ pastOrders });

		user.products.forEach(
			async (product) => await user.removeProduct(product.id)
		);

		res.send([]);
	} catch (err) {
		next(err);
	}
});

router.put('/cart/add/:productId', requireToken, async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const { user } = req;

		const product = await Product.findByPk(productId);
		await user.addProduct(product);
		user.products = [...user.products, product];
		res.send(user.products);
	} catch (err) {
		next(err);
	}
});

router.put('/cart/remove/:productId', requireToken, async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const { user } = req;

		await user.removeProduct(productId);
		user.products = user.products.filter((product) => product.id != productId);
		res.send(user.products);
	} catch (err) {
		next(err);
	}
});
