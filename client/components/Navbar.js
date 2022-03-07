import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart';
import { logOut } from '../store/auth';


const Navbar = () => {
	const isLoggedIn = !!(useSelector((state) => state.auth.id))
	const dispatch = useDispatch()
	const cartAmount = useSelector((state) => state.cart.amount)
	const isAdmin = useSelector((state) => state.auth.administrator)

	useEffect(() => {
		dispatch(fetchCart())
	}, [window.localStorage.getItem('token')])

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

					<a href="#" onClick={() => {dispatch(logOut())}}>
						Logout
					</a>

					<span>Cart: {cartAmount}</span>
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

export default Navbar
