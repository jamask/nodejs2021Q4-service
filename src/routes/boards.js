const {
  getBoards,
  getBoard,
  postBoard,
  updateBoard,
  deleteBoard,
} = require('../services/boards')

const Board = {
  type: 'object',
  properties: {
    id: { type: 'string'},
    title: { type: 'string'},
    columns: { 
      type: 'array',
      properties: {
        title: { type: 'string'},
        order: { type: 'number' }
      }
    },
  }
}

const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      }
    }
  },
  handler: getBoards,
}

const getBoardOpts = {
  schema: {
    response: {
      200: Board,
    }
  },
  handler: getBoard,
}

const postBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string', },
        columns: { type: 'array', },
      }
    },
    response: {
      201: Board
    }
  },
  handler: postBoard
}

const updateBoardOpts = {
  schema: {
    response: {
      200: Board,
    }
  },
  handler: updateBoard,
}

const deleteBoardOpts = {
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
  handler: deleteBoard,
}

function boardsRoute(fastify, options, done) {
  // Get all boards
  fastify.get('/boards', getBoardsOpts)

  // Get the board by id
  fastify.get('/boards/:boardId', getBoardOpts)

  // Create board
  fastify.post('/boards', postBoardOpts)

  // Update board
  fastify.put('/boards/:boardId', updateBoardOpts)

  // Delete board
  fastify.delete('/boards/:boardId', deleteBoardOpts)

  done()
}

module.exports = boardsRoute