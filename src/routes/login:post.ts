const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        password: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['password', 'email'],
    },
  },
};

const registerRoute = app => {
  app.post('/login', opts, async (request, reply) => {
    const { email, password } = request.body;

    console.log('heyaaaa', email, password);
    if (password === '42') {
      request.session.authenticated = true;
      reply.redirect('/');
    } else {
      reply.redirect('/login');
    }
  });

  return app;
};

const route = {
  registerRoute,
};

export default route;
