
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  fetchCartProducts,
  updateCartProduct,
  fetchCheckout,
} from "../store/cart";
import { me } from "../store/auth";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfOrders: this.props.pastOrders.length,
    };

    this.handleCheckout = this.handleCheckout.bind(this);
  }
  componentDidMount() {
    try {
      this.props.getCartProducts(this.props.userId);
    } catch (error) {
      console.log(error);
    }
  }

  async handleCheckout(user, cart) {
    await this.props.checkout(user, cart);
    await this.props.auth();
    this.setState({
      numOfOrders: this.props.pastOrders.length,
    });
  }

  render() {
    		let qty = [0, 1, 2, 3, 4, 5, 6, 7];
    let addedProducts = this.props.cartProducts.length ? (
      this.props.cartProducts.map((product) => {
        return (
          <li className="collection-product avatar" key={product.id}>
            <div className="product-img">
              <img src={product.img} className="" />
            </div>

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
<button
            className="checkout-button"
            onClick={() => {
              this.handleCheckout(this.props.userId, this.props.cartProducts);
            }}
          >
            Checkout
          </button>
          <div>
            <button>'view previous orders: {this.state.numOfOrders}</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cartProducts: state.cart,
  userId: state.auth.id,
  pastOrders: state.auth.pastOrders,
});

const mapDispatch = (dispatch) => ({
  getCartProducts: (userId) => dispatch(fetchCartProducts(userId)),
  updateCartProduct: (userId, productId, action) =>
    dispatch(updateCartProduct(userId, productId, action)),
  checkout: (userId, cartProducts) =>
    dispatch(fetchCheckout(userId, cartProducts)),
  auth: () => dispatch(me()),
				</div>
			</div>
		);
	}
}

export default connect(mapState, mapDispatch)(Cart);
