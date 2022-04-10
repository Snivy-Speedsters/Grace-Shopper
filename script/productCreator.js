const { faker } = require('@faker-js/faker');

function createProduct(index) {
	const gender = faker.name.gender(true).toLowerCase();
	// const name = faker.commerce.product(
	// 	undefined,
	// 	undefined,
	// 	gender === 'male' ? 0 : 1
	// );
	const adj = faker.commerce.productAdjective();
	const name = `${adj} T-Shirt`;
	const description = faker.lorem.paragraph();
	const price = faker.commerce.price(25, 100);
	const imageUrl = `/images/tshirt/greytshirt.jpg`;

	return {
		name,
		price,
		description,
		imageUrl,
		gender,
	};
}

module.exports = createProduct;
