import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders } from '../../store/orders'
import { OrderCard } from './OrderCard'

export const AllOrders = () => {

  const orders = useSelector((state) => state.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [])

  return (
    <div>
      {orders.length === 0 ?
        <h3>No Orders Found</h3>:
        <div>
        {orders.map(order => <OrderCard order={order}/>)}
        </div>
      }
    </div>
  )
}

export default AllOrders
