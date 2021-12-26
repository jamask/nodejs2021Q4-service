export {}
const db = require('./db.ts')

/**
 * Returns all boards

 * @returns Array of boards array
 */
const selectBoards = () => db.boards

/**
 * Returns a board with `id`
 * @param id first term string
 * @returns the board object
 */
const selectBoard = (id: string) => {
  const returnBoard = db.boards.find((board: {id: string}) => board.id === String(id))

  return returnBoard
}

/**
 * Returns the added `board`
 * @param board new board object
 * @returns the added board object
 */
const createBoard = (board: object) => {
  db.boards.push(board)

  return board
}

/**
 * Returns the altered `board`
 * @param newBoard new board object
 * @returns the altered board object
 */
const changeBoard = (newBoard: {id ?: string}) => {
  db.boards = db.boards.map((board: {id: string}) => (board.id === newBoard.id ? newBoard : board))
  const returnBoard = { ...newBoard}
  delete returnBoard.id

  return returnBoard
}

/**
 * Returns object with message about deleted board `id`
 * @param id remote board with id string
 * @returns object with message about deleted board `id` object
 */
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