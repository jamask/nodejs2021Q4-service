export {}
const db = require('./db.ts')

/**
 * Returns all tasks

 * @returns Array of tasks array
 */
const selectTasks = (boardId: string) => db.tasks.filter((task: {boardId: string}) => task.boardId === String(boardId))

/**
 * Returns a task with `boardId` and `taskId`
 * @param boardId parent board id string
 * @param taskId task id string
 * @returns the task object
 */
const selectTask = (boardId: string, taskId: string) => db.tasks.find((task: {id: string, boardId: string}) => 
      (task.id === String(taskId) && (task.boardId === boardId)))

/**
 * Returns the added `task`
 * @param task new task object
 * @returns the added task object
 */
const createTask = (task: object) => {
  db.tasks.push(task)

  return task
}

/**
 * Returns the altered `task`
 * @param newTask new task object
 * @returns the altered task object
 */
const changeTask = (newTask: {id: string}) => {
  db.tasks = db.tasks.map((task: {id: string}) => (task.id === newTask.id ? newTask : task))

  return newTask
}

/**
 * Returns object with message about deleted task `taskId`
 * @param taskId remote task with id string
 * @returns object with message about deleted task `taskId` object
 */
const removeTask = (taskId: string) => {
  db.tasks = db.tasks.filter((task: {id: string}) => task.id !== taskId)

  return { message: `Task ${taskId} has been removed` }
}

module.exports = {
  selectTasks,
  selectTask,
  createTask,
  changeTask,
  removeTask,
}