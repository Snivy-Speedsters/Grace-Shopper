import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../store/orders";
import { Link } from "react-router-dom";

const OrderHistory = () => {

  const orders = useSelector((state) => state.orders)
    const [snivey, setSnivey] = useState(false)



  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const surprise = (snivey) => {
    if(snivey){
      return <img src='/images/snivey.png'/>
    } else {
      return <></>
    }
  }

  const allOrders = (
    orders.map((order) => {
      return order.cart.map((product) => {
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
        )
      }
      )
    })
  )

  return (
    <div className="container">
      <div className="cart">
        <h5>You have ordered:</h5>
        <ul className="collection">{allOrders}</ul>

        <button onClick={() => {setSnivey(!snivey)}}>shh</button>
        {surprise(snivey)}

      </div>
    </div>
  );
};

export default OrderHistory
