import React from "react"
import { Link } from 'react-router-dom';

export const ProductCard = props => {
  const { name, price, imageUrl, id} = props.product

  return (
    <div>
      <img src={imageUrl} />
      <Link to={`/admin/products/${id}`}>
        <h3>{name}</h3>
      </Link>
      <h4>{price}</h4>
      <hr />
    </div>
  )
}

export default ProductCard
