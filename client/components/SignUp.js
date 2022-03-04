import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/auth";

const SignUp = () => {
  const error = useSelector((state) => state.auth.error)

  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const user = {
      method: evt.target.name,
      email: evt.target.email.value,
      password: evt.target.password.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value
    }
    dispatch(signUp(user))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={"signup"}>
        <h1>welcome please fill out the information below</h1>
        <div>
          <label htmlFor="firstName">
            <small>first Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

export default SignUp
