import React, { useState, useEffect } from 'react'
import { fetchSingleProduct, updateSingleProduct, deleteSingleProduct } from '../../store/singleProduct'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const SingleProductEdit = props => {
  const id = props.match.params.productId
  const { product, fetchProduct, updateProduct, deleteProduct } = props

  const [name, setName] = useState('loading')
  const [price, setPrice] = useState(0.00)
  const [imageUrl, setImageUrl] = useState('loading')

  const fetchData = async (id) => {
    await fetchProduct(id)
  }

  const changes = () => {
    return {
      name,
      price
    }
  }

  useEffect(() => {
    fetchData(id)
  }, [])

  useEffect(() => {
    setName(product.name)
    setPrice(product.price)
    setImageUrl(product.imageUrl)
  }, [product])

  return (
    <div>
      <img src={imageUrl} />
      <input type='text' value={name} onChange={(event) => {setName(event.target.value)}}/>
      <input type='number' value={price} onChange={(event) => {setPrice(event.target.value)}}/>
      <Link to={`/admin/products`}>
        <button onClick={() => {updateProduct(id, changes())}}>Submit Changes</button>
      </Link>
      <Link to={`/admin/products`}>
        <button onClick={() => {deleteProduct(id)}}>Delete Buddy</button>
      </Link>
      <hr />
    </div>
  )
}



const mapState = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  fetchProduct: (id) => dispatch(fetchSingleProduct(id)),
  updateProduct: (id, changes) => dispatch(updateSingleProduct(id, changes)),
  deleteProduct: (id) => dispatch(deleteSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProductEdit)
