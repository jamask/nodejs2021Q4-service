export {};
const { v4: uuidv4 } = require('uuid')

const {
  selectTasks,
  selectTask,
  createTask,
  changeTask,
  removeTask,
} = require('../repositories/tasks.ts')

const getTasks = (req, reply) => {
  const { boardId } = req.params

  reply
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(selectTasks(boardId))
}

const getTask = (req, reply) => {
  const { boardId, taskId } = req.params
  const returnTask = selectTask(boardId, taskId)

  if (returnTask) {
    reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(returnTask)
  } else {
    reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ message: `Task ${taskId} has not been found` })
  }
}

const postTask = (req, reply) => {
  const { boardId } = req.params
  const { title, order, description, userId, columnId } = req.body

  const newTask = {
    id: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(createTask(newTask))
}

const updateTask = (req, reply) => {
  const { theBoardId, taskId } = req.params
  const { title, order, description, userId, boardId, columnId } = req.body

  const newTask = {
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }
  
  reply
    .code(200)
    .send(changeTask(newTask, theBoardId))
}

const deleteTask = (req, reply) => {
  const { taskId } = req.params

  reply.send(removeTask(taskId))
}



module.exports = {
  getTasks,
  getTask,
  postTask,
  updateTask,
  deleteTask,
}