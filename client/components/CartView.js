import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCheckout } from '../store/cart';
import ProductCheckoutCard from './Cards/ProductCheckoutCard'


export const Cart = props => {
	const { userCart, checkout } = props

	const handleCheckout = () => {
		alert("Proceed with checkout?");
		checkout()
	}

	return(
		<div>
			<h3>Current Cart</h3>
			{!userCart.length ? <h4>No items in cart</h4> :
				userCart.map(product => <ProductCheckoutCard product={product} key={product.id} />)
			}
			<button onClick={handleCheckout}>Checkout</button>
			<Link to={"/orderHistory"}>
				<button>Previous Orders</button>
			</Link>
		</div>
	)
}

const mapState = (state) => ({
  userCart: state.cart,
});

const mapDispatch = (dispatch) => ({
	checkout: () => dispatch(fetchCheckout()),
});

export default connect(mapState, mapDispatch)(Cart);
