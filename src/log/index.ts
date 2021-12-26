const fs = require('fs');
const {createLogger, format, transports} = require('winston');
const dotenv = require('dotenv')
dotenv.config()

/*
  error: 0
  info: 1
  silly: 2 default
*/

let LOG_LEVEL: string;

if (process.env.LOG_LEVEL === '0') {
  LOG_LEVEL = 'error'
} else if (process.env.LOG_LEVEL === '1') {
  LOG_LEVEL = 'info'
} else {
  LOG_LEVEL = 'silly'
}


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

  fastify.addHook('preHandler', (req: IReq, reply: IReply, done: () => void) => {
    logger.silly(`statusCode: ${reply.statusCode}, url: ${req.url}, body: ${JSON.stringify(req.body)}, queryParameters: ${JSON.stringify(req.params)}`)
    done()
  })

  fastify.addHook('onResponse', (req: IReq, reply: IReply, done: () => void) => {
    logger.info(`statusCode: ${reply.statusCode}, url: ${req.url}, body: ${JSON.stringify(req.body)}, queryParameters: ${JSON.stringify(req.params)}`)
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

process.on('uncaughtExceptionMonitor', (error, _) => {
  console.error(`captured error: ${error.message}`);
  fs.appendFileSync('error.log', `\r\ncaptured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: {message: string}, _) => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  fs.appendFileSync('error.log', `\r\nUnhandled rejection detected: ${reason.message}`);
});

module.exports = logged