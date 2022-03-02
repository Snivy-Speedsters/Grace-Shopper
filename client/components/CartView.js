import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  fetchCartProducts,
  updateCartProduct,
  fetchCheckout,
} from "../store/cart";

class Cart extends Component {
  componentDidMount() {
    try {
      this.props.getCartProducts(this.props.userId);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    let addedProducts = this.props.cartProducts.length ? (
      this.props.cartProducts.map((product) => {
        return (
          <li className="collection-product avatar" key={product.id}>
            <div className="product-img">
              <img src={product.img} className="" />
            </div>

            <div className="product-description">
              <span className="title">{product.name}</span>
              <p>{product.description}</p>
              <p>
                <b>Price: {product.price}$</b>
              </p>
              <p>
                <b>Quantity: {product.quantity}</b>
              </p>

              <button
                className="remove-button"
                onClick={() => {
                  this.props.updateCartProduct(
                    this.props.userId,
                    product.id,
                    "remove"
                  );
                }}
              >
                Remove Item
              </button>
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
              this.props.checkout(this.props.userId, this.props.cartProducts);
            }}
          >
            Checkout
          </button>
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
  checkout: (userId, cartProducts) =>
    dispatch(fetchCheckout(userId, cartProducts)),
});

export default connect(mapState, mapDispatch)(Cart);
