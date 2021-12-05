const db = require('./db')

const selectTasks = (boardId) => db.tasks.filter((task) => task.boardId === String(boardId))

const selectTask = (boardId, taskId) => db.tasks.find((task) => 
      (task.id === String(taskId) && (task.boardId === boardId)))

const createTask = (task) => {
  db.tasks.push(task)

  return task
}

const changeTask = (newTask) => {
  db.tasks = db.tasks.map((task) => (task.id === newTask.id ? newTask : task))

  return newTask
}

const removeTask = (taskId) => {
  db.tasks = db.tasks.filter((task) => task.id !== taskId)

  return { message: `Task ${taskId} has been removed` }
}

module.exports = {
  selectTasks,
  selectTask,
  createTask,
  changeTask,
  removeTask,
}