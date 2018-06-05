const mongoose = require('mongoose')
const dbURI = process.env.DB_URI

function inititateConnection() {
  mongoose.connect(dbURI)

  let db = mongoose.connection
  db.once('open', function() {
    console.log('Database connection successful!')
  })
}

module.exports = {inititateConnection}
