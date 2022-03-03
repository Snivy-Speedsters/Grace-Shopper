const router = require("express").Router();
const {
  models: { User, Product },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

router.get("/", requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

router.get("/cart", requireToken, async (req, res, next) => {
  try {
    res.send(req.user.products);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/cart", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId, {
      include: {
        model: Product,
        attributes: ["id", "name", "price", "imageUrl"],
        through: { attributes: [] },
      },
    });

    const products = user.products;

    const orders = [...user.pastOrders, ...products];

    await user.update({ pastOrders: orders });

    await user.products.map(async (product) => {
      await user.removeProduct(product);

      user.products = user.products.filter((i) => i.id != product.id);
    });

    res.send([]);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/cart/:productId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const action = req.body.action;

    const user = await User.findByPk(userId, { include: { model: Product } });
    const product = await Product.findByPk(productId, {
      attributes: ["id", "name", "price", "imageUrl"],
    });

    switch (action) {
      case "add":
        await user.addProduct(product);
        user.products = [...user.products, product];
        break;
      case "remove":
        await user.removeProduct(product);
        user.products = user.products.filter((i) => i.id != product.id);
        break;
      default:
        break;
    }

    res.send(user.products);
  } catch (err) {
    next(err);
  }
});
