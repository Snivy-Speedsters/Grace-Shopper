import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products";
import { ProductCard } from "./Cards/ProductCard";
import AllProductsFilter from "./AllProductsFilter";

export const AllProducts = () => {
  const products = useSelector((state) => state.products);
  const { tags, gender } = useSelector((state) => state.filter)
  const dispatch = useDispatch();

  // Executes when component first loads
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);


  const checkTags = (product) => {
    for(let i = 0; i < product.tags.length; i++){
      if(tags.includes(product.tags[i].name)){
        return true
      }
    }
    return false
  }

  const filterProducts = (products) => {
    let filteredProducts = []

    if(tags.length === 0){
      products.map((product) => filteredProducts.push(product))
    } else {
      products.map((product) => { if(checkTags(product)){ filteredProducts.push(product)}})
    }

    if(gender !== ''){
      filteredProducts = filteredProducts.map(product => {if(product.gender === gender){return <ProductCard product={product} key={product.id} />}})
    } else {
      filteredProducts = filteredProducts.map(product => <ProductCard product={product} key={product.id} />)
    }

    return filteredProducts
  }

  return (
    <div>
      <h1>All Buddies</h1>
      <AllProductsFilter />
      <div className="product-container">
        {!products ? <h3>No Products</h3> : filterProducts(products)}
      </div>
    </div>
  );
};

export default AllProducts;
