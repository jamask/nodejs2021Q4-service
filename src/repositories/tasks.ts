export {}
const db = require('./db.ts')

const selectTasks = (boardId: string) => db.tasks.filter((task: {boardId: string}) => task.boardId === String(boardId))

const selectTask = (boardId: string, taskId: string) => db.tasks.find((task: {id: string, boardId: string}) => 
      (task.id === String(taskId) && (task.boardId === boardId)))

const createTask = (task: object) => {
  db.tasks.push(task)

  return task
}

const changeTask = (newTask: {id: string}) => {
  db.tasks = db.tasks.map((task: {id: string}) => (task.id === newTask.id ? newTask : task))

  return newTask
}

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