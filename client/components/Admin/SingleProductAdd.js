import React, { useState } from 'react'
import { createSingleProduct } from '../../store/singleProduct'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const SingleProductAdd = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.00)

  const data = () => {
    return {
      name,
      price
    }
  }

  const handleCreate = () => {
    dispatch(createSingleProduct(data()))
    .then(() => {history.push('/admin')})
  }


  return (
    <div>
      <input type='text' value={name} onChange={(event) => {setName(event.target.value)}}/>
      <input type='number' value={price} onChange={(event) => {setPrice(event.target.value)}}/>
      <Link to={`/admin/products`}>
        <button onClick={() => {handleCreate()}}>Create</button>
      </Link>
      <Link to={`/admin/products`}>
        <button>Back</button>
      </Link>
      <hr />
    </div>
  )
}

export default SingleProductAdd
