import * as fastify from 'fastify';
import routes from './routes';
import addErrorHandler from './helpers/addErrorHandler';
import * as errors from './helpers/errors';

const app = fastify({ logger: true });
app.register(require('fastify-formbody'));
app.register(require('fastify-cookie'));
app.register(require('fastify-session'), {
  cookieName: 'sessionId',
  secret: 'a secret with minimum length of 32 characters',
  cookie: { secure: false },
  expires: 1800000,
});

addErrorHandler(app, errors);

routes.forEach(({ registerRoute }) => registerRoute(app));

const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
