'use strict'

// Creating a simple fastify server as described at
// https://www.fastify.io/docs/latest/Getting-Started/

const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
