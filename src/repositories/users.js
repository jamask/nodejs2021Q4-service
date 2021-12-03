const db = require('./db')

const selectUsers = () => db.users

const selectUser = (id) => {
  const returnUser = db.users.find((user) => user.id === id)

  return returnUser
}

const createUser = (user) => {
  db.users.push(user)

  return user
}

const changeUser = (newUser) => {
  db.users = db.users.map((user) => (user.id === newUser.id ? newUser : user))

  return newUser
}

const removeUser = (id) => {
  db.users = db.users.filter((user) => user.id !== id)

  return { message: `User ${id} has been removed` }
}

module.exports = {
  selectUsers,
  selectUser,
  createUser,
  changeUser,
  removeUser,
}