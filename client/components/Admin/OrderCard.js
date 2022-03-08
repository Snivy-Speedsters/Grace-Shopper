import React from "react"
import { completeOrder } from "../../store/orders"
import { useDispatch } from "react-redux"

export const OrderCard = props => {
  const { id, complete, userId, cart } = props.order
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Order ID: {id}</h3>
      <h4>User ID: {userId}</h4>
      <h4>Status: {complete? 'Completed' : 'In-progress'}</h4>
      {complete? <></> : <button onClick={() => {dispatch(completeOrder(id))}}>Complete</button>}
      <hr />
    </div>
  )
}

export default OrderCard
