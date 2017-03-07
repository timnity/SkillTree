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

/**
 * 用于指定URL路径和服务器路径的映射
 */
const publicDir = path.resolve(__dirname, './public')
app.use('/', express.static(publicDir))

/**
 * 路由
 */
// 访问 www.yourdomain.com/home 时会访问这里
app.get('/home', function (req, res) {
  console.log('GET request to the homepage')
})

http.createServer(app).listen(port, '127.0.0.1', (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
