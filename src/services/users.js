const { uuidv4 } = require('uuid')
const {
  selectUsers,
  selectUser,
  createUser,
  changeUser,
  removeUser,
} = require('../repositories/users')

const getUsers = (req, reply) => {
  reply.send(selectUsers())
}

const getUser = (req, reply) => {
  const { id } = req.params

  reply.send(selectUser(id))
}

const addUser = (req, reply) => {
  const { name, login, password } = req.body
  const newUser = {
    id: uuidv4(),
    name,
    login,
    password,
  }

  reply.code(201).send(createUser(newUser))
}

const updateUser = (req, reply) => {
  const { id } = req.params
  const { name, login, password } = req.body

  const newUser = {
    id,
    name,
    login,
    password,
  }

  reply.send(changeUser(newUser))
}

const deleteUser = (req, reply) => {
  const { id } = req.params

  reply.send(removeUser(id))
}



module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
}