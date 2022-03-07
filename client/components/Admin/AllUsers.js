import React, { useState, useEffect } from 'react'
import { fetchUsers } from '../../store/allUsers'
import { useSelector, useDispatch } from 'react-redux'
import UserCard from './UserCard'


export const AllUsers = () => {

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      {
      users.length === 0 || !Array.isArray(users) ?
      <h3>No Users</h3> :
      users.map(user => (<UserCard user={user} key={user.id}/>))
      }
    </div>
  )
}

export default AllUsers
