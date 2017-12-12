const express = require('express')
const bodyParser = require('body-parser')
const { batches } = require('./routes')
const passport = require('./config/auth')

const PORT = process.env.PORT || 3030

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(batches)
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
