import renderPage from '../helpers/renderPage';

const registerRoute = app => {
  app.get('/', async (request, reply) => {
    reply.type('text/html');
    // @ts-ignore
    if (request.session.authenticated) {
      return renderPage('logged');
    }
    return await renderPage('home');
  });

  return app;
};

const route = {
  registerRoute,
};

export default route;
