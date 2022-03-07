import React, {useState} from "react";
import { useSelector } from "react-redux";
import EditUser from "./EditUser";

const Profile = () => {
  const user = useSelector((state) => state.auth)

  const [view, setView] = useState('')

  const currentView = (view) => {
    switch(view){
      case 'edit':
        return (<EditUser />)
      default:
        return (<></>)
    }
  }

  return(
    <div>
      <h3>Hello {user.firstName} {user.lastName}!</h3>
      <h4>{user.email}</h4>
      <h4>{user.shippingAddress}</h4>

      <button onClick={() => {setView('edit')}}>Edit User</button>
      {currentView(view)}
    </div>
  )
}

export default Profile
