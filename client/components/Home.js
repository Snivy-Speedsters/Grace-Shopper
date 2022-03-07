import React from 'react'
import { useSelector } from 'react-redux'

export const Home = () => {
  const firstName = useSelector((state) => state.auth.firstName)

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
    </div>
  )
}

export default Home
