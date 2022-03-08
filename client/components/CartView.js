import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProductCheckoutCard from './Cards/ProductCheckoutCard';
import MakePayment from	'./Checkout/MakePayment'

export const Cart = () => {
	const cart = useSelector((state) => state.cart.products);
	const loggedIn = useSelector((state) => state.auth.id)

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
			{loggedIn ? <button onClick={() => {history.push('/orderHistory')}}> Previous Orders </button>:
			<button onClick={() => {history.push('/login')}}>Login to Checkout</button>}
			{loggedIn ? <MakePayment /> : <></>}
		</div>
	);
};

export default Cart;
