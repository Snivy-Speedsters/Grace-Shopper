import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { fetchCartProducts } from "../store/products";

class Cart extends Component {
  componentDidMount() {
    try {
      this.props.getCartProducts(this.props.userId);
    } catch (error) {}
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

              <button className="remove-button">Remove Item</button>
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
  getCartProducts: (id) => dispatch(fetchCartProducts(id)),
  // deleteCartProduct: (id) => dispatch(removeCartProduct(id)),
});

export default connect(mapState, mapDispatch)(Cart);
