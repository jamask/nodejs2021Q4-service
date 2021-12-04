const {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
} = require('../services/users')

const User = {
  type: 'object',
  properties: {
    id: { type: 'string'},
    name: { type: 'string'},
    login: { type: 'string'},
    password: { type: 'string'},
  }
}

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      }
    }
  },
  handler: getUsers,
}

const getUserOpts = {
  schema: {
    response: {
      200: User,
    }
  },
  handler: getUser,
}

const postUserOpts = {
  schema: {
    body: {
//      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string', },
        login: { type: 'string', },
        password: { type: 'string', },
      }
    },
    response: {
      201: User
    }
  },
  handler: postUser
}

const updateUserOpts = {
  schema: {
    response: {
      200: User,
    }
  },
  handler: updateUser,
}

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: deleteUser,
}

function usersRoute(fastify, options, done) {
  // Get all users
  fastify.get('/users', getUsersOpts)

  // Get the user by id
  fastify.get('/users/:userId', getUserOpts)

  // Create user
  fastify.post('/users', postUserOpts)

  // Update user
  fastify.put('/users/:userId', updateUserOpts)

  // Delete user
  fastify.delete('/users/:userId', deleteUserOpts)

  done()
}

module.exports = usersRoute