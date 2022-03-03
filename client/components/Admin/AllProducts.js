import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../../store/products'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'


export const AllProducts = props => {
  const { allProducts, fetchProducts } = props
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    await fetchProducts()
  }

  useEffect(() => {
    fetchData()
    setProducts(allProducts)
  }, [])

  useEffect(() => {
    setProducts(allProducts)
  }, [allProducts])


  return (
    <div>
      <Link to='/admin/products/add'>
        <button>Add Products</button>
      </Link>
      {
      products.length === 0 ?
      <h3>No Products</h3> :
      products.map(product => (<ProductCard product={product} key={product.id}/>))
      }
    </div>
  )
}


const mapState = state => ({
  allProducts: state.products
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
