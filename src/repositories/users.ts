export {}
const db = require('./db.ts')

/**
 * Returns all users

 * @returns Array of users array
 */
const selectUsers = () => db.users

/**
 * Returns a user with `id`
 * @param id first term string
 * @returns the user object
 */
const selectUser = (id: string) => {
  const returnUser = db.users.find((user: {id: string}) => user.id === String(id))
  delete returnUser.password

  return returnUser
}

/**
 * Returns the added `user`
 * @param user new user object
 * @returns the added user object
 */
const createUser = (user: {password?: string}) => {
  db.users.push(user)
  const returnUser = { ...user}
  delete returnUser.password

  return returnUser
}

/**
 * Returns the altered `user`
 * @param newUser new user object
 * @returns the altered user object
 */
const changeUser = (newUser: {id?: string, password?: string}) => {
  db.users = db.users.map((user: {id: string}) => (user.id === newUser.id ? newUser : user))
  const returnUser = { ...newUser}
  delete returnUser.password
  delete returnUser.id

  return returnUser
}

/**
 * Returns object with message about deleted user `id`
 * @param id remote user with id string
 * @returns object with message about deleted user `id` object
 */
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