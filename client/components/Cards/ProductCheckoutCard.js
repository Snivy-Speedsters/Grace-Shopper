import React from "react";
import { Link } from "react-router-dom";
import { updateCartProducts } from "../../store/cart";
import { connect } from "react-redux";

const ProductCheckoutCard = props => {
  const { updateCart } = props
  const { imageUrl, name, price, id} = props.product
  const { qty } = props.product.cart

  const qtyDropdown = (amount) => {
    const outputArray = []
    let i = 1
    while(i <= amount){
      outputArray.push(<option value={i} >{i}</option>)
      i = i + 1
    }
    return outputArray
  }

  return (
    <div>
      <Link to={`/products/${id}`}>
        <img src={imageUrl} />
      </Link>

      <Link to={`/products/${id}`}>
      <h2>{name}</h2>
      </Link>

      <h3>{price}</h3>
      <select defaultValue={qty} onChange={(event) => {updateCart(event.target.value, id)}}>
        {qtyDropdown(7)}
      </select>
      <button>Remove</button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  updateCart: (qty, id) => {dispatch(updateCartProducts(qty, id))}
})

export default connect(null, mapDispatch)(ProductCheckoutCard);
