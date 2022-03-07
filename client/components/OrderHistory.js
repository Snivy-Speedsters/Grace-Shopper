import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { me } from "../store/auth";
import { Link } from "react-router-dom";

const OrderHistory = () => {

  const pastOrders = useSelector((state) => state.auth.pastOrders)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me());
  }, []);

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

export default OrderHistory
