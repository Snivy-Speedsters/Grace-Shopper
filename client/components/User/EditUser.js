import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/auth"

const EditUser = () => {
  const user = useSelector((state) => state.auth)

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [shippingAddress, setShippingAddress] = useState(user.shippingAddress)

  const dispatch = useDispatch()

  const handleUpdate = () => {
    const updatedUser = {
      firstName,
      lastName,
      email,
      shippingAddress,
    }
    dispatch(updateUser(updatedUser))
  }


  return(
    <div>
      <h3>First Name</h3>
      <input type='text' value={firstName} onChange={(event) => {setFirstName(event.target.value)}}/>
      <h3>Last Name</h3>
      <input type='text' value={lastName} onChange={(event) => {setLastName(event.target.value)}}/>
      <h3>Email</h3>
      <input type='text' value={email} onChange={(event) => {setEmail(event.target.value)}}/>
      <h3>Shipping Address</h3>
      <input type='text' value={shippingAddress} onChange={(event) => {setShippingAddress(event.target.value)}}/>
      <button onClick={() => {handleUpdate()}}>Submit</button>
    </div>
  )
}

export default EditUser
