const { v4: uuidv4 } = require('uuid')
// const JSON5 = require('json5')
const {
  selectUsers,
  selectUser,
  createUser,
  changeUser,
  removeUser,
} = require('../repositories/users')

const getUsers = (req, reply) => {
  reply
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(selectUsers())
}

const getUser = (req, reply) => {
  const { userId } = req.params

  reply
  .code(200)
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(selectUser(String(userId)))
}

const postUser = (req, reply) => {
  const { name, login, password } = req.body
  const newUser = {
    id: uuidv4(),
    name,
    login,
    password,
  }

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(createUser(newUser))
}

const updateUser = (req, reply) => {
  const { userId } = req.params
  const { name, login, password } = JSON.parse(req.body)

  const newUser = {
    userId,
    name,
    login,
    password,
  }

  reply.send(changeUser(newUser))
}

const deleteUser = (req, reply) => {
  const { userId } = req.params

  reply.send(removeUser(userId))
}



module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
}