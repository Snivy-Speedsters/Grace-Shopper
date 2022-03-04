import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { addCartProduct, fetchCartProducts } from '../store/cart';
import { Link } from 'react-router-dom';

const SingleProduct = props => {
	const { getProduct, addProduct, updateCart, product } = props
	const { productId } = props.match.params
	const { imageUrl, name, price } = props.product

	useEffect(() => {
		getProduct(productId)
	}, [])

	const handleAdd = async (productId) => {
		addProduct(productId)
		updateCart()
	}

	console.log(productId)

	return(
	<div>
		{ product.id === productId ? <h3>No Product Found</h3> : (
			<>
				<h1>Buddy</h1>
				<img src={imageUrl} />
				<p>Name: {name}</p>
				<p>Price: ${price}</p>
				<Link to={'/products'}>
					<button onClick={() => {handleAdd(productId)}}>Add to Cart</button>
				</Link>
				<Link to={'/products'}>
					<button>View All Buddies</button>
				</Link>
			</>
		)}
	</div>
	)
}

const mapState = (state) => ({
	product: state.product
});

const mapDispatch = (dispatch) => ({
	getProduct: (id) => dispatch(fetchSingleProduct(id)),
	addProduct: (productId) => dispatch(addCartProduct(productId)),
	updateCart: () => dispatch(fetchCartProducts())
});

export default connect(mapState, mapDispatch)(SingleProduct);
