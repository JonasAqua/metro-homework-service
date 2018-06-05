const express = require('express')
const dbConfig = require('./config/db')
const routersConfig = require('./config/routers')

const appName = 'Homework Service'
const port = process.env.PORT

console.log('--- ' + appName + ' ---')

dbConfig.inititateConnection()

let app = express()
app = routersConfig.addRoutersToApp(app)
app.listen(port, () => console.log(appName + ' listening on port ' + port + '!'))
