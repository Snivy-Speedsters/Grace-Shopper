import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {
	fetchCartProducts,
	removeCartProduct,
	fetchCheckout,
	updateCartProducts,
} from '../store/cart';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qty: 0,
			numOfOrders: 0,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
	}
	componentDidMount() {
		try {
			this.props.getCartProducts(this.props.userId);
			this.setState({
				qty: this.props.cartProducts.qty,
			});
		} catch (error) {
			console.log(error);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.cartProducts !== this.props.cartProducts) {
			this.setState({
				qty: this.props.cartProducts.qty,
			});
		}
	}

	handleChange(e, productId) {
		this.setState({
			qty: e.target.value,
		});
		this.props.updateCartProducts(e.target.value, productId);
	}

	async handleCheckout() {
		await this.props.checkout();
	}

	render() {
		const { handleChange } = this;
		const { qty } = this.state;
		let qtyArr = [0, 1, 2, 3, 4, 5, 6, 7];
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
								<select
									value={qty}
									onChange={(e) => {
										handleChange(e, product.id);
									}}
								>
									<option>{product.cart.qty}</option>
									{qtyArr.map((q) => {
										if (q != 0 && q != product.cart.qty)
											return <option key={q}>{q}</option>;
									})}
								</select>
							</b>

							<div>
								<button
									className="remove-button"
									onClick={() => {
										this.props.removeCartProduct(product.id);
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
					<button
						className="checkout-button"
						onClick={() => {
							this.handleCheckout();
						}}
					>
						Checkout
					</button>
					<div>
						<button>View previous orders: {this.state.numOfOrders}</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	cartProducts: state.cart,
});

const mapDispatch = (dispatch) => ({
	getCartProducts: (userId) => dispatch(fetchCartProducts(userId)),
	removeCartProduct: (productId) => dispatch(removeCartProduct(productId)),
	updateCartProducts: (qty, productId) =>
		dispatch(updateCartProducts(qty, productId)),
	checkout: () => dispatch(fetchCheckout()),
});

export default connect(mapState, mapDispatch)(Cart);
