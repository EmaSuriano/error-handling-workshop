import { promisify } from 'util';

const registerRoute = app => {
  app.get('/logout', async (request, reply) => {
    if (request.session.authenticated) {
      await promisify(request.destroySession).call(request);
    }
    reply.redirect('/');
  });

  return app;
};

const route = {
  registerRoute,
};

export default route;
