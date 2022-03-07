import React from "react";
import { Link } from "react-router-dom";
import { updateProductQty, removeFromCart, fetchCart } from "../../store/cart";
import { useDispatch } from "react-redux";

const ProductCheckoutCard = props => {
  const { imageUrl, name, price, id} = props.product
  const { qty } = props.product.cart

  const dispatch = useDispatch()



  const qtyDropdown = (amount) => {
    const outputArray = []
    let i = 1
    while(i <= amount){
      outputArray.push(<option value={i} key={`p${id}-o${i}`}>{i}</option>)
      i = i + 1
    }
    return outputArray
  }

  const handleUpdate = (qty, productId) => {
    const updatedProduct = {
      qty,
      productId
    }
    dispatch(updateProductQty(updatedProduct))
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
    .then(() => {dispatch(fetchCart())})
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
      <select defaultValue={qty} onChange={(event) => {handleUpdate(event.target.value, id)}}>
        {qtyDropdown(7)}
      </select>
      <button onClick={() => {handleRemove(id)}}>Remove</button>
    </div>
  )
}

export default ProductCheckoutCard;
