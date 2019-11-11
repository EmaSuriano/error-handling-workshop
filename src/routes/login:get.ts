import renderPage from '../helpers/renderPage';

const registerRoute = app => {
  app.get('/login', async (request, reply) => {
    reply.type('text/html');
    return await renderPage('login');
  });

  return app;
};

const route = {
  registerRoute,
};

export default route;
