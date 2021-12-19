export {}
const db = require('./db.ts')

const selectBoards = () => db.boards

const selectBoard = (id: string) => {
  const returnBoard = db.boards.find((board: {id: string}) => board.id === String(id))

  return returnBoard
}

const createBoard = (board: object) => {
  db.boards.push(board)

  return board
}

const changeBoard = (newBoard: {id ?: string}) => {
  db.boards = db.boards.map((board: {id: string}) => (board.id === newBoard.id ? newBoard : board))
  const returnBoard = { ...newBoard}
  delete returnBoard.id

  return returnBoard
}

const removeBoard = (id: string) => {
  db.boards = db.boards.filter((board: {id: string}) => board.id !== String(id))
  db.tasks = db.tasks.filter((task: {boardId: string}) => task.boardId !== String(id))

  return { message: `Board ${id} has been removed` }
}

module.exports = {
  selectBoards,
  selectBoard,
  createBoard,
  changeBoard,
  removeBoard,
}