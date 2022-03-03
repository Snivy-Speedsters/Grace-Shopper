import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { addCartProduct } from '../store/cart';
import { Link } from 'react-router-dom';

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.getSingleProduct(this.props.match.params.productId);
		this.props.state.product.days = 1;
		console.log(this);
	}

	render() {
		const product = this.props.state.product;
		let qty = [0, 1, 2, 3, 4, 5, 6, 7];
		return (
			<div key={product.id}>
				<h1>Buddy:</h1>
				<img src={product.imageUrl} />
				<p>Name: {product.name}</p>
				<p>Price: ${product.price}</p>
				<Link to={'/products'}>
					<button
						className="add-button"
						onClick={() => {
							this.props.addCartProduct(product.id);
						}}
					>
						Add Buddy
					</button>
				</Link>
				{/* <p>
					Days:
					<select>
						{qty.map((q) => {
							if (q != 0) return <option key={q}>{q}</option>;
						})}
					</select>
				</p> */}
				<div>
					<Link to={'/products'}>
						<button>View All Buddies</button>
					</Link>
				</div>
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
	addCartProduct: (productId) => dispatch(addCartProduct(productId)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
