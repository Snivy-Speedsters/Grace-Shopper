import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = props => {
  const { imageUrl, name, price, id } = props.product

  return (
    <div>
      <Link to={`/products/${id}`}>
        <img src={imageUrl} />
      </Link>

      <Link to={`/products/${id}`}>
      <h2>{name}</h2>
      </Link>

      <h3>{price}</h3>
    </div>
  )
}

export default ProductCard
