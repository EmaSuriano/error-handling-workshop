function addErrorHandler(app, errors) {
  app.setErrorHandler((error, request, reply) => {
    app.log.debug(`Request url: `, request.req.url);
    app.log.debug(`Payload: `, request.body);
    app.log.error(`Error occurred: `, error);

    if (error instanceof errors.ApplicationError) {
      reply.status(500).send({ message: 'Application error' });
      return;
    }

    reply.status(500).send({ message: 'Something else ...' });
  });
}

export default addErrorHandler;
