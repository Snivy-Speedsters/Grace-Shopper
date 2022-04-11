const maleTags = [
	'moisture-wicking',
	'comfortable',
	'organic',
	'slimming',
	'popular',
	'highly-rated',
	'team favorite',
	'oversized',
	'snug fit',
	'runs big',
];
const femaleTags = [
	'moisture-wicking',
	'comfortable',
	'organic',
	'slimming',
	'popular',
	'highly-rated',
	'team favorite',
	'oversized',
	'snug fit',
	'runs big',
];

const createTag = (product) => {
	const dice = Math.floor(Math.random() * 20);
	let tagsBank = product.gender === 'male' ? [...maleTags] : [...femaleTags];
	const tags = [];
	let tagAmount = 0;

	if (dice < 5) {
		tagAmount = 1;
	} else if (dice < 14) {
		tagAmount = 2;
	} else {
		tagAmount = 3;
	}

	for (let i = 0; i < tagAmount; i++) {
		let newTag = tagsBank[Math.floor(Math.random() * tagsBank.length)];
		tags.push(newTag);
		tagsBank = tagsBank.filter((tag) => tag !== newTag);
	}

	return tags;
};

module.exports = {
	createTag,
	maleTags,
	femaleTags,
};
