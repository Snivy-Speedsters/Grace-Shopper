import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";

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
        <h1>all products</h1>
        <ul>
          {products.map((product) => {
            return (
              <div product={product} key={product.id}>
                <h2>{product.name}</h2>
                <h2>{product.price}</h2>
              </div>
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
