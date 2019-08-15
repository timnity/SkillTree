let http = require('http')

let server = http.createServer((req, res) => {
  console.log('----- http server is running! -----')
})
server.listen(8000)
