'use strict'

function addErrorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.debug(`Request url: `, request.req.url)
    fastify.log.debug(`Payload: `, request.body)
    fastify.log.error(`Error occurred: `, error)

    reply.status(500).send({ message: 'Error occurred during request' })
  })
}

module.exports = addErrorHandler

// Task: Create some specific http error classes like a NotFoundError and
// BadRequestError. Then change the error handler so that it's checking for
// the application's base error class. It should automatically handle
// all implemented errors in a very straight forward way.

// Task 2: Push your code to github and publish an npm package. It should
// clearly state that this is a test. So a good module name is for example
// abstract-errors-playground-username.
