const {createLogger, format, transports} = require('winston');
const dotenv = require('dotenv')
dotenv.config()

/*
  error: 0
  warn: 1
  info: 2 default
*/
const LOG_LEVEL = process.env.LOG_LEVEL



const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.colorize(),
    format.cli(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
  ]
});



function logged(fastify: { addHook: Function }): void {

  interface IReq {
    params: object
    body: object
    url: string
  }

  interface IReply {
    statusCode: number
    code(a: number): IReply
    header(a: string, b: string): IReply
    send(a: string): void
  }

  fastify.addHook('onResponse', (req: IReq, reply: IReply, done: () => void) => {
    logger.info(`url: ${req.url}, body: ${JSON.stringify(req.body)}, queryParameters: ${JSON.stringify(req.params)}, statusCode: ${reply.statusCode}`)
    done()
  })

  fastify.addHook('onError', (req: IReq, reply: IReply, error: object, done: () => void) => {
    logger.error(JSON.stringify(error))

    reply
    .code(500)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send('Error')
    
    done()
  })
}
module.exports = logged