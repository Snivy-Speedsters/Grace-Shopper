const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
module.exports = app;
const stripe = require('stripe')(
	'sk_test_51KajEaGJWhSw6KvjthvlNQbPXhmnYH6ONnkq3lP9c9damd3RytB8tmSDgYotHI79BZeRLuBLQeIxMKTuwWV5f25v001w5bOlNU'
);
const { v4: uuidv4 } = require('uuid');

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(cors());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
	if (path.extname(req.path).length) {
		const err = new Error('Not found');
		err.status = 404;
		next(err);
	} else {
		next();
	}
});

// sends index.html
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.post('/payment', (req, res) => {
	const { product, token } = req.body;
	const idempotencyKey = uuidv4();

	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges.create(
				{
					amount: product.price * 100,
					currency: 'usd',
					customer: customer.id,
					receipt_email: token.email,
					description: `Purchase of ${product.name}`,
					shipping: {
						name: token.card.name,
						address: {
							country: token.card.address_country,
						},
					},
				},
				{ idempotencyKey }
			);
		})
		.then((result) => res.status(200).json(result))
		.catch((err) => console.log(err));
});
