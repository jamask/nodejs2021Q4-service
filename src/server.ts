const fastify = require('fastify')({ logger: false })

fastify.register(require('./routes/users.ts'))
fastify.register(require('./routes/boards.ts'))
fastify.register(require('./routes/tasks.ts'))

/**
 * Create RESTful API server
 */
const start = async () => {
  try {
    await fastify.listen(4000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()