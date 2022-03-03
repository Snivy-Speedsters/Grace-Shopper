import axios from 'axios';

const SET_USERS = 'SET_USERS'

export const setUsers = (users) => ({ type: SET_USERS, users });

export const fetchUsers = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const { data } = await axios.get("/api/admin/users", { headers: { authorization: token }});
    return dispatch(setUsers(data));
  }
};


export default function (state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
