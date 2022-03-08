import React from "react"

export const OrderCard = props => {
  const { id, complete, userId, cart } = props.order

  return (
    <div>
      <h3>Order ID: {id}</h3>
      <h4>User ID: {userId}</h4>
      <h4>Status: {complete? 'Completed' : 'In-progress'}</h4>
      {complete? <></> : <button>Complete</button>}
      <hr />
    </div>
  )
}

export default OrderCard
