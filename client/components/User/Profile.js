import React, {useState} from "react";
import { useSelector } from "react-redux";
import EditUser from "./EditUser";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth)

  const [view, setView] = useState('')
  const history = useHistory()

  const currentView = (view) => {
    switch(view){
      case 'edit':
        return (<EditUser />)
      default:
        return (<></>)
    }
  }

  const handleView = (newView) => {
    if(newView === view){
      setView('')
    } else {
      setView(newView)
    }
  }

  return(
    <div>
      <h3>Hello {user.firstName} {user.lastName}!</h3>
      <h4>{user.email}</h4>
      <h4>{user.shippingAddress}</h4>

      <button onClick={() => {handleView('edit')}}>Edit User</button>
      <button onClick={() => {history.push('/orderHistory')}}>Past Orders</button>
      {currentView(view)}
    </div>
  )
}

export default Profile
