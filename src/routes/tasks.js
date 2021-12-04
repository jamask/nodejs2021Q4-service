const {
  getTasks,
  getTask,
  postTask,
  updateTask,
  deleteTask,
} = require('../services/tasks')

const Task = {
  type: 'object',
  properties: {
    id: { type: 'string'},
    title: { type: 'string'},
    order: { type: 'number'},
    description: { type: 'string'},
    userId: { type: ['number', 'null'] },
    boardId: { type: ['number', 'null'] },
    columnId: { type: ['number', 'null'] },
  }
}

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      }
    }
  },
  handler: getTasks,
}

const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    }
  },
  handler: getTask,
}

const postTaskOpts = {
  schema: {
    body: {
//      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId', 'columnId'],
      properties: {
        id: { type: 'string'},
        title: { type: 'string'},
        order: { type: 'number'},
        description: { type: 'string'},
        userId: { type: ['number', 'null'] },
        boardId: { type: ['number', 'null'] },
        columnId: { type: ['number', 'null'] },
      }
    },
    response: {
      201: Task
    }
  },
  handler: postTask
}

const updateTaskOpts = {
  schema: {
    response: {
      200: Task,
    }
  },
  handler: updateTask,
}

const deleteTaskOpts = {
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
  handler: deleteTask,
}

function tasksRoute(fastify, options, done) {
  // Get all tasks
  fastify.get('/boards/:boardId/tasks', getTasksOpts)

  // Get the task by id
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts)

  // Create task
  fastify.post('/boards/:boardId/tasks', postTaskOpts)

  // Update task
  fastify.put('/boards/:theBoardId/tasks/:taskId', updateTaskOpts)

  // Delete task
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts)

  done()
}

module.exports = tasksRoute