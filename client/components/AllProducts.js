import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';

class AllProducts extends Component {
	componentDidMount() {
		try {
			this.props.getProducts();
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		let products = this.props.products || [];
		return (
			<div>
				<h1>All Buddies</h1>
				<ul>
					{products.map((product) => {
						return (
							<li key={product.id}>
								<Link to={`/products/${product.id}`}>
									<img src={product.imageUrl} />
									<p>Name: {product.name}</p>
									<p>Price: ${product.price}</p>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		products: state.products,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getProducts: () => dispatch(fetchProducts()),
	};
};

export default connect(mapState, mapDispatch)(AllProducts);
