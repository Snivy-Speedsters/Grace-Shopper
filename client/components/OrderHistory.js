import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const OrderHistory = (props) => {
  const { pastOrders } = props;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(pastOrders);
  }, []);

  useEffect(() => {
    setProducts(pastOrders);
  }, [pastOrders]);

  let addedProducts = pastOrders.length ? (
    pastOrders.map((product) => {
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
};

const mapState = (state) => ({
  pastOrders: state.auth.pastOrders,
});

const mapDispatch = (dispatch) => ({
  //getOrderHistory: () => dispatch(fetchOrderHistory()),
});

export default connect(mapState, mapDispatch)(OrderHistory);
