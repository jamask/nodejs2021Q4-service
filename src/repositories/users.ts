export {}
const db = require('./db.ts')

const selectUsers = () => db.users

const selectUser = (id: string) => {
  const returnUser = db.users.find((user: {id: string}) => user.id === String(id))
  delete returnUser.password

  return returnUser
}

const createUser = (user: {password?: string}) => {
  db.users.push(user)
  const returnUser = { ...user}
  delete returnUser.password

  return returnUser
}

const changeUser = (newUser: {id?: string, password?: string}) => {
  db.users = db.users.map((user: {id: string}) => (user.id === newUser.id ? newUser : user))
  const returnUser = { ...newUser}
  delete returnUser.password
  delete returnUser.id

  return returnUser
}

const removeUser = (id: string) => {
  db.users = db.users.filter((user: {id: string}) => user.id !== id)

  for (let i = 0; i < db.tasks.length; i += 1) {
    if (db.tasks[i].userId === String(id)) {
      db.tasks[i].userId = null
    }
  }

  return { message: `User ${id} has been removed` }
}

module.exports = {
  selectUsers,
  selectUser,
  createUser,
  changeUser,
  removeUser,
}