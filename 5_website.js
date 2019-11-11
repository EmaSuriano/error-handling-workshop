'use strict'

const fs = require('fs').promises
const util = require('util')
const addErrorHandler = require('./6_error_handler')

const fastify = require('fastify')({
  logger: true
})

// Validate incoming data
const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        password: { type: 'string' },
        email: { type: 'string' }
      }
    }
  }
}

fastify.register(require('fastify-formbody'))
fastify.register(require('fastify-cookie'))
fastify.register(require('fastify-session'), {
  cookieName: 'sessionId',
  secret: 'a secret with minimum length of 32 characters',
  cookie: { secure: false },
  expires: 1800000
})

// Add a login route that returns a login page
fastify.get('/login', async (request, reply) => {
  reply.type('text/html')
  return fs.readFile('./5_login.html')
})

// Add a login route that handles the actual login
fastify.post('/login', opts, async (request, reply) => {
  const { email, password } = request.body

  console.log(email, typeof password)
  if (password === '42') {
    request.session.authenticated = true
    reply.redirect('/')
  } else {
    reply.redirect('/login')
  }
});

// Add a logout route
fastify.get('/logout', async (request, reply) => {
  if (request.session.authenticated) {
    await util.promisify(request.destroySession).call(request)
  }
  reply.redirect('/')
});

fastify.get('/picture', async (request, reply) => {
  // Add repeat logic
  const got = require('got')
  const res = await got('https://picsum.photos/600', { encoding: null })
  reply.type('image/jpeg')
  return res.body
})

fastify.get('/', async (request, reply) => {
  // The new part
  reply.type('text/html')
  if (request.session.authenticated) {
    return 'Logged in<br><br><a href="/logout">Logout</a>'
  }
  return 'Please login<br><br><a href="/login">Login</a>'
})

addErrorHandler(fastify)

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

// Task: Split the setup here into logical parts: Schemas, routes and a plugin
// folder. Make sure that everything is still working as expected.