import React from "react"

export const UserCard = props => {
  const { firstName, lastName, email } = props.user

  return (
    <div>
      <h3>{email}</h3>
      <h4>{firstName} {lastName}</h4>
      <hr />
    </div>
  )
}

export default UserCard
