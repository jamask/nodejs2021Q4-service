export {};
const { v4: uuidv4 } = require('uuid')

const {
  selectTasks,
  selectTask,
  createTask,
  changeTask,
  removeTask,
} = require('../repositories/tasks.ts')

interface IReq {
  params: {
    boardId?: string,
    taskId?: string,
    theBoardId?: string
  }
  body: {
    title: string,
    order: string,
    description: string,
    userId: string,
    boardId?: string,
    columnId: string
  }
}

interface IReply {
  code(a: number): IReply
  header(a: string, b: string): IReply
  send(a: object): void
}

/**
 * Replies to the client with a list of tasks
 * @param req first term IReq
 * @param reply second term IReply
 */
const getTasks = (req: IReq, reply: IReply) => {
  const { boardId } = req.params

  reply
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(selectTasks(boardId))
}

/**
 * Replies to the client with a selected task or error
 * @param req first term IReq
 * @param reply second term IReply
 */
const getTask = (req: IReq, reply: IReply) => {
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

/**
 * Replies to the client with an added task
 * @param req first term IReq
 * @param reply second term IReply
 */
const postTask = (req: IReq, reply: IReply) => {
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

/**
 * Replies to the client with an updated task
 * @param req first term IReq
 * @param reply second term IReply
 */
const updateTask = (req: IReq, reply: IReply) => {
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

/**
 * Replies to the client with a deleted task
 * @param req first term IReq
 * @param reply second term IReply
 */
const deleteTask = (req: IReq, reply: IReply) => {
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