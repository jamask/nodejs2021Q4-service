const {
  getBoards,
  getBoard,
  postBoard,
  updateBoard,
  deleteBoard,
} = require('../services/boards.ts')

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

interface IFastify {
  get (a: string, b: object): void
  post (a: string, b: object): void
  put (a: string, b: object): void
  delete (a: string, b: object): void
}

function boardsRoute(fastify: IFastify, _: object, done: () => void) {
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