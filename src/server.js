const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/users'))
fastify.register(require('./routes/boards'))
fastify.register(require('./routes/tasks'))

const start = async () => {
  try {
    await fastify.listen(4000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()