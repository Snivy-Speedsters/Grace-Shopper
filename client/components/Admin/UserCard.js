import React from "react"

export const UserCard = props => {
  const { firstName, lastName, email } = props.user

  return (
    <div>
      <h3>{firstName}</h3>
      <h4>{lastName}</h4>
      <h4>{email}</h4>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */


export default UserCard
