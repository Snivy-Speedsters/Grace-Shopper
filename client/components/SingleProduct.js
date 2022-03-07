import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { addToCart, fetchCart } from '../store/cart';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const SingleProduct = props => {
	const { productId } = props.match.params
	const product = useSelector((state) => state.singleProduct)
	const { imageUrl, name, price } = product

	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(fetchSingleProduct(productId))
	}, [])

	const handleAdd = () => {
		dispatch(addToCart(productId))
		.then(() => {dispatch(fetchCart())})
		.then(() => {history.push('/products')})
	}

	return(
	<div>
		{ product.id === productId ? <h3>No Product Found</h3> : (
			<>
				<h1>Buddy</h1>
				<img src={imageUrl} />
				<p>Name: {name}</p>
				<p>Price: ${price}</p>
				<button onClick={() => {handleAdd()}}>Add to Cart</button>
				<Link to={'/products'}>
					<button>View All Buddies</button>
				</Link>
			</>
		)}
	</div>
	)
}
