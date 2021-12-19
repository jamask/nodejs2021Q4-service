export {};
const { v4: uuidv4 } = require('uuid')

const {
  selectBoards,
  selectBoard,
  createBoard,
  changeBoard,
  removeBoard,
} = require('../repositories/boards.ts')

interface IReq {
  params: {
    boardId: string,
  }
  body: {
    title: string,
    columns: Array<{id: string}>,
  }
}

interface IReply {
  code(a: number): IReply
  header(a: string, b: string): IReply
  send(a: object): void
}

const getBoards = (req: IReq, reply: IReply) => {
  reply
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(selectBoards())
}

const getBoard = (req: IReq, reply: IReply) => {
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

const postBoard = (req: IReq, reply: IReply) => {
  const { title, columns } = req.body

  for (let i = 1; i < columns.length; i += 1) {
    columns[i].id = uuidv4()
  }

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

const updateBoard = (req: IReq, reply: IReply) => {
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

const deleteBoard = (req: IReq, reply: IReply) => {
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