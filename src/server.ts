const fastify = require('fastify')({ logger: false })
const logging = require('./log/index.ts')
const { Client } = require('pg')

fastify.register(require('./routes/users.ts'))
fastify.register(require('./routes/boards.ts'))
fastify.register(require('./routes/tasks.ts'))

logging(fastify)

const client = new Client({
  password: 'postgres',
  user: 'postgres',
  host: 'postgres'
})

fastify.get('/pg-test', async function (request, reply) {
  var data = await client.query("SELECT 1 + 1").then(() => "up").catch(() => "down");

  reply.send(data)
})

/**
 * Create RESTful API server
 */
const start = async () => {
  try {
    await fastify.listen(4000, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()