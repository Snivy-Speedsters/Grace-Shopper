import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProductCheckoutCard from './Cards/ProductCheckoutCard';
import { makePayment } from './Checkout/makePayment';

export const Cart = () => {
	const cart = useSelector((state) => state.cart.products);

	const history = useHistory();

	return (
		<div>
			<h3>Current Cart</h3>
			{!cart.length ? (
				<h4>No items in cart</h4>
			) : (
				cart.map((product) => (
					<ProductCheckoutCard product={product} key={product.id} />
				))
			)}
			{makePayment()}
			<button
				onClick={() => {
					history.push('/orderHistory');
				}}
			>
				Previous Orders
			</button>
		</div>
	);
};

export default Cart;
