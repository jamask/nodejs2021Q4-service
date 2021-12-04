const { v4: uuidv4 } = require('uuid')

const {
  selectBoards,
  selectBoard,
  createBoard,
  changeBoard,
  removeBoard,
} = require('../repositories/boards')

const getBoards = (req, reply) => {
  reply
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(selectBoards())
}

const getBoard = (req, reply) => {
  const { boardId } = req.params

  const returnBoard = selectBoard(boardId)

  if (returnBoard) {
    reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(returnBoard)
  } else {
    reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ message: `Board ${boardId} has not been found` })
  }
}

const postBoard = (req, reply) => {
  const { title, columns } = req.body

  const newBoard = {
    id: uuidv4(),
    title,
    columns,
  }

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(createBoard(newBoard))
}

const updateBoard = (req, reply) => {
  const { boardId } = req.params
  const { title, columns } = req.body

  const newBoard = {
    id: boardId,
    title,
    columns,
  }
  
  reply
    .code(200)
    .send(changeBoard(newBoard))
}

const deleteBoard = (req, reply) => {
  const { boardId } = req.params

  reply.send(removeBoard(boardId))
}



module.exports = {
  getBoards,
  getBoard,
  postBoard,
  updateBoard,
  deleteBoard,
}