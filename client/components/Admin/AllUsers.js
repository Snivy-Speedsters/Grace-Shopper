import React, { useState, useEffect } from 'react'
import { fetchUsers } from '../../store/allUsers'
import {connect} from 'react-redux'
import UserCard from './UserCard'


export const AllUsers = props => {
  const { allUsers, fetchUsers } = props
  const [users, setUsers] = useState([])

  const fetchData = async () => {
    await fetchUsers()
  }

  useEffect(() => {
    fetchData()
    setUsers(allUsers)
  }, [])

  useEffect(() => {
    setUsers(allUsers)
  }, [allUsers])


  return (
    <div>
      {
      users.length === 0 ?
      <h3>No Users</h3> :
      users.map(user => (<UserCard user={user} key={user.id}/>))
      }
    </div>
  )
}


const mapState = state => ({
  allUsers: state.allUsers
})

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)
