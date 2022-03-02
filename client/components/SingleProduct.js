import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { updateCartProduct } from '../store/cart';
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
				<Link to={'/products'}>
					<button
						className="add-button"
						onClick={() => {
							this.props.updateCartProduct(
								this.props.userId,
								product.id,
								'add'
							);
						}}
					>
						Add Item
					</button>
				</Link>
				<Link to={'/products'}>
					<button>View All Products</button>
				</Link>
			</div>
		);
	}
}

const mapState = (state) => ({
	state,
	userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
	getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
	updateCartProduct: (userId, productId, action) =>
		dispatch(updateCartProduct(userId, productId, action)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
