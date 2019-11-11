'use strict'

const fastify = require('fastify')()

// Register a plugin
fastify.register(require('fastify-jwt'), {
  secret: process.env.SECRET || 'youshouldspecifyalongsecret'
})
