import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCartProducts } from '../store/cart';


const Navbar = props => {
	const { handleClick, isLoggedIn, isAdmin, getCart, currentCart } = props

	const [cart, setCart] = useState([])

	useEffect(() => {
		getCart()
	}, [])

	useEffect(() => {
		setCart(currentCart)
	}, [currentCart])

return(
	<div>
		<h1>Buy-A-Buddy</h1>
		<nav>
			{isLoggedIn ? (
				<div>
					{/* The navbar will show these links after you log in */}
					<Link to="/home">Home</Link>
					<Link to="/products">All Buddies</Link>
					<Link to="/cart">View Cart</Link>
					{isAdmin ? <Link to="/admin">Admin</Link> : <></>}

					<a href="#" onClick={handleClick}>
						Logout
					</a>

					<span>Cart: {cart.length}</span>
				</div>
			) : (
				<div>
					{/* The navbar will show these links before you log in */}
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/products">All Products</Link>
				</div>
			)}
		</nav>
		<hr />
	</div>
)}

const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		isAdmin: state.auth.administrator,
		currentCart: state.cart
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() { dispatch(logout()) },
		getCart: () => dispatch(fetchCartProducts())
	};
};

export default connect(mapState, mapDispatch)(Navbar);
