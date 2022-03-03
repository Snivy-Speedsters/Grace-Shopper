import React, { useState, useEffect } from 'react'
import { createSingleProduct } from '../../store/singleProduct'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const SingleProductAdd = props => {
  const id = props.match.params.productId
  const { createProduct } = props

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.00)

  const data = () => {
    return {
      name,
      price
    }
  }

  return (
    <div>
      <input type='text' value={name} onChange={(event) => {setName(event.target.value)}}/>
      <input type='number' value={price} onChange={(event) => {setPrice(event.target.value)}}/>
      <Link to={`/admin/products`}>
        <button onClick={() => {createProduct(id, data())}}>Create</button>
      </Link>
      <Link to={`/admin/products`}>
        <button>Back</button>
      </Link>
      <hr />
    </div>
  )
}


const mapDispatch = dispatch => ({
  createProduct: (id, data) => dispatch(createSingleProduct(id, data)),
})

export default connect(null, mapDispatch)(SingleProductAdd)
