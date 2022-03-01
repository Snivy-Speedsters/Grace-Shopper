import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { Link } from 'react-router-dom';

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.getSingleProduct(this.props.match.params.productId);
	}

	render() {
		const product = this.props.state.product;
		return (
			<div key={product.id}>
				<h1>Product:</h1>
				<img src={product.imageUrl} />
				<p>Name: {product.name}</p>
				<p>Price: ${product.price}</p>
				<button>Add to Cart</button>
				<Link to={'/products'}>
					<button>View All Products</button>
				</Link>
			</div>
		);
	}
}

const mapState = (state) => ({
	state,
});

const mapDispatch = (dispatch) => ({
	getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
