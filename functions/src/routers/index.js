const useRouter = require('./user.routes');
const membershipsRouter = require('./memberships.routes');

function routerApi(app) {
  app.use('/users', useRouter);
  app.use('/memberships', membershipsRouter);
}

module.exports = routerApi;
