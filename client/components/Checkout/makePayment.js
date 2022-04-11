import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { fetchCart, fetchCheckout } from '../../store/cart';
import { Button } from '@mui/material';

export const MakePayment = () => {
	const cart = useSelector((state) => state.cart.products);
	const dispatch = useDispatch();
	const history = useHistory();
	let totalAmount = 0;

	if (cart.length) {
		totalAmount = cart
			.map((product) => {
				return parseInt(product.price * product.cart.qty);
			})
			.reduce((prev, cur) => (prev += cur));
	}

	const paymentToken = (token) => {
		const body = {
			token,
			cart,
		};
		const headers = {
			'Content-Type': 'application/json',
		};

		return fetch(`http://localhost:8080/checkout`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		})
			.then(() => {
				dispatch(fetchCheckout())
					.then(() => {
						dispatch(fetchCart());
					})
					.then(() => {
						history.push('/confirmation');
					});
			})
			.catch((error) => console.log(error));
	};

	return (
		<StripeCheckout
			stripeKey="pk_test_51KajEaGJWhSw6KvjEOgLGKYpDIIfQ5j9BmjwsaKbbP81UCn9v9mRZ8YktsK7QeMmYIpqhEtSULNpP8DC28lg4a1e008qZTaRr1"
			token={paymentToken}
			name="Buy T-Shirt"
			amount={totalAmount * 100}
		>
			<Button variant="contained">Total: ${totalAmount}</Button>
		</StripeCheckout>
	);
};

export default MakePayment;
