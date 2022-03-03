import React, { useState } from 'react'
import {connect} from 'react-redux'
import AllUsers from './AllUsers'
import AllProducts from './AllProducts'


export const Admin = props => {
  const {firstName} = props
  const [adminView, setAdminView] = useState('')

  const currentView = (view) => {
    switch(view){
      case 'users':
        return (<AllUsers />)
      case 'products':
        return (<AllProducts />)
      default:
        return (<></>)
    }
  }

  return (
    <div>
      <h3>Hello, admin {firstName}</h3>
      <button onClick={() => {setAdminView('users')}}>Users</button>
      <button onClick={() => {setAdminView('products')}}>Products</button>
      {currentView(adminView)}
    </div>
  )
}


const mapState = state => {
  return {
    firstName: state.auth.firstName,
  }
}

export default connect(mapState)(Admin)
