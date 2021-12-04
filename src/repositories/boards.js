const db = require('./db')

const selectBoards = () => db.boards

const selectBoard = (id) => {
  const returnBoard = db.boards.find((board) => board.id === String(id))

  return returnBoard
}

const createBoard = (board) => {
  db.boards.push(board)

  return board
}

const changeBoard = (newBoard) => {
  db.boards = db.boards.map((board) => (board.id === newBoard.id ? newBoard : board))
  const returnBoard = { ...newBoard}
  delete returnBoard.id

  return returnBoard
}

const removeBoard = (id) => {
  db.boards = db.boards.filter((board) => board.id !== id)

  return { message: `Board ${id} has been removed` }
}

module.exports = {
  selectBoards,
  selectBoard,
  createBoard,
  changeBoard,
  removeBoard,
}