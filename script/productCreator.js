const { faker } = require('@faker-js/faker');

function createProduct(index) {
	const gender = faker.name.gender(true).toLowerCase();
	const name = faker.name.findName(
		undefined,
		undefined,
		gender === 'male' ? 0 : 1
	);
	const price = faker.commerce.price(1000, 5000);
	const imageUrl = `/images/${gender}/${gender}${index}.jpg`;

	return {
		name,
		price,
		imageUrl,
	};
}

module.exports = createProduct;
