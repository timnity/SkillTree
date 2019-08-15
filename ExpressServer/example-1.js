const http = require('http')
const path = require('path')
const express = require('express')

/**
 * 创建服务器
 */
const app = module.exports = express()

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8080 || 3000

app.set('env', env)
app.set('port', port)

app.use(function(req, res) {
  res.sendFile('index.html', { root: __dirname })
})

http.createServer(app).listen(port, '127.0.0.1', (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
