import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

const Login = () => {
  const name = 'login'
  const displayName = 'Login'
  const error = useSelector((state) => state.auth.error)

  const dispatch = useDispatch()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const user = {
      method: evt.target.name,
      email: evt.target.email.value,
      password: evt.target.password.value,
    }
    dispatch(login(user))
  }


  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
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
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

export default Login
