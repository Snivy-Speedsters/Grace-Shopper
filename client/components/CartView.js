import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCheckout } from '../store/cart';
import ProductCheckoutCard from './Cards/ProductCheckoutCard'


export const Cart = () => {
	const cart = useSelector((state) => state.cart.products)

	const dispatch = useDispatch()
	const history = useHistory()

	const handleCheckout = () => {
		alert("Proceed with checkout?");
		dispatch(fetchCheckout())
	}

	return(
		<div>
			<h3>Current Cart</h3>
			{!cart.length ? <h4>No items in cart</h4> :
				cart.map(product => <ProductCheckoutCard product={product} key={product.id} />)
			}
			<button onClick={handleCheckout}>Checkout</button>
			<button onClick={() => {history.push('/orderHistory')}}>Previous Orders</button>
		</div>
	)
}

export default Cart;
