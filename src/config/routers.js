const router = require('../routes')

function addRoutersToApp(app) {
  app.use('/', router)
  return app
}

module.exports = {addRoutersToApp}
