'use strict';

const addErrorHandler = require('./6_error_handler');

const fastify = require('fastify')({
  logger: true,
});

// Validate incoming data
const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' },
      },
      required: ['someKey'],
    },
  },
};

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.post('/', opts, async (request, reply) => {
  return { hello: 'world' };
});

addErrorHandler(fastify);

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

// Task 1: create a package.json that includes the required Node.js modules
// https://docs.npmjs.com/creating-a-package-json-file
// Use `npm init`
