import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { ProductCard } from './Cards/ProductCard'


export const AllProducts = props => {

	// Deconstruct state and dispatch that was mapped to props
	const { allProducts, getProducts } = props

	// Executes when component first loads
	useEffect(() => {
		getProducts()
	}, [])


	return (
	<div>
		<h1>All Buddies</h1>
		{!allProducts.length ? <h3>No Products</h3> :
			allProducts.map(product => (<ProductCard product={product} key={product.id}/>))
		}
	</div>
  )
}


const mapState = (state) => {
	return {
		allProducts: state.products,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getProducts: () => dispatch(fetchProducts()),
	};
};

export default connect(mapState, mapDispatch)(AllProducts);
