import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products";
import { ProductCard } from "./Cards/ProductCard";

export const AllProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Executes when component first loads
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  

  return (
    <div>
      <h1>All Buddies</h1>
      <div className="product-container">
        {!products ? (
          <h3>No Products</h3>
        ) : (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
