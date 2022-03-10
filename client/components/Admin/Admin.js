import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AllUsers from './AllUsers'
import AllProducts from './AllProducts'
import AllOrders from './AllOrders'


export const Admin = () => {
  const firstName = useSelector((state) => state.auth.firstName)
  const [adminView, setAdminView] = useState('')

  const currentView = (view) => {
    switch(view){
      case 'users':
        return (<AllUsers />)
      case 'orders':
        return (<AllOrders />)
      case 'products':
        return (<AllProducts />)
      case 'orders':
        return (<AllOrders />)
      default:
        return (<></>)
    }
  }

  return (
    <div>
      <h3>Hello, admin {firstName}</h3>
      <button onClick={() => {setAdminView('users')}}>Users</button>
      <button onClick={() => {setAdminView('products')}}>Products</button>
      <button onClick={() => {setAdminView('orders')}}>Orders</button>
      {currentView(adminView)}
    </div>
  )
}

export default Admin
