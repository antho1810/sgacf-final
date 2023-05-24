import http from '../http-common.js'

// SERVICES FOR Users
export const getAllUsers = () => {
  return http.get("/users")
}

export const getUser = (id) => {
  return http.get(`/users/${id}`)
}


const UserService = {
  getAllUsers,
  getUser,
};


export default UserService;