const router = require("express").Router();
const {
  models: { User, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(
      userId,
      {
        include: {
          model: Product,
          attributes: ["id", "name", "price", "imageUrl"],
          through: { attributes: [] },
        },
      },
      { attributes: ["firstName", "lastName", "email"] }
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/cart", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId, {
      include: {
        model: Product,
        attributes: ["id", "name", "price", "imageUrl"],
        through: { attributes: [] },
      },
    });
    res.send(user.products);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/cart", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const action = req.body.action;

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
