import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCartProducts, updateCartProduct } from '../store/cart';

class Cart extends Component {
	componentDidMount() {
		try {
			this.props.getCartProducts(this.props.userId);
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		let qty = [0, 1, 2, 3, 4, 5, 6, 7];

		let addedProducts = this.props.cartProducts.length ? (
			this.props.cartProducts.map((product) => {
				return (
					<li className="collection-product avatar" key={product.id}>
						<div className="product-img">
							<img src={product.imageUrl} className="" />
						</div>

						<div className="product-description">
							<span className="title">{product.name}</span>
							<p>{product.description}</p>
							<p>
								<b>Price: {product.price}$</b>
							</p>
							<b>
								Days:
								<select>
									<option>{'Chosen Qty'}</option>
									{qty.map((q) => {
										if (q != 0) return <option key={q}>{q}</option>;
									})}
								</select>
							</b>

							<div>
								<button
									className="remove-button"
									onClick={() => {
										this.props.updateCartProduct(
											this.props.userId,
											product.id,
											'remove'
										);
									}}
								>
									Remove Buddy
								</button>
							</div>
						</div>
					</li>
				);
			})
		) : (
			<p>Nothing.</p>
		);
		return (
			<div className="container">
				<div className="cart">
					<h5>You have ordered:</h5>
					<ul className="collection">{addedProducts}</ul>
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	cartProducts: state.cart,
	userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
	getCartProducts: (userId) => dispatch(fetchCartProducts(userId)),
	updateCartProduct: (userId, productId, action) =>
		dispatch(updateCartProduct(userId, productId, action)),
});

export default connect(mapState, mapDispatch)(Cart);
