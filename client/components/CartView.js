import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  fetchCartProducts,
  removeCartProduct,
  fetchCheckout,
} from "../store/cart";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.handleCheckout = this.handleCheckout.bind(this);
  }
  componentDidMount() {
    try {
      this.props.getCartProducts(this.props.userId);
    } catch (error) {
      console.log(error);
    }
  }

  async handleCheckout() {
    alert("Proceed with checkout");
    await this.props.checkout();
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
                  <option>{"Chosen Qty"}</option>
                  {qty.map((q) => {
                    if (q != 0) return <option key={q}>{q}</option>;
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
            <Link to={"/home"}>
              <button>View previous orders</button>
            </Link>
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
  checkout: () => dispatch(fetchCheckout()),
});

export default connect(mapState, mapDispatch)(Cart);
