import React, { useState, useEffect } from 'react'
import { fetchSingleProduct, updateSingleProduct, deleteSingleProduct } from '../../store/singleProduct'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const SingleProductEdit = props => {
  const id = props.match.params.productId

  const product = useSelector((state) => state.singleProduct)
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState('loading')
  const [price, setPrice] = useState(0.00)
  const [imageUrl, setImageUrl] = useState('loading')

  const changes = () => {
    return {
      name,
      price
    }
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [])

  useEffect(() => {
    setName(product.name)
    setPrice(product.price)
    setImageUrl(product.imageUrl)
  }, [product])

  const handleUpdate = () => {
    const updatedProduct = {
      id,
      changes: changes()
    }
    dispatch(updateSingleProduct(updatedProduct))
    .then(() => {history.push('/admin')})
  }

  const handleDelete = () => {
    dispatch(deleteSingleProduct(id))
    .then(() => {history.push('/admin')})
  }

  return (
    <div>
      <img src={imageUrl} />
      <input type='text' value={name} onChange={(event) => {setName(event.target.value)}}/>
      <input type='number' value={price} onChange={(event) => {setPrice(event.target.value)}}/>
      <button onClick={() => {handleUpdate()}}>Submit Changes</button>
      <button onClick={() => {handleDelete()}}>Delete Buddy</button>
      <hr />
    </div>
  )
}

export default SingleProductEdit
