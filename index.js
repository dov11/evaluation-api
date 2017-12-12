const express = require('express')
const { Batch } = require('./models')

const PORT = process.env.PORT || 3030

let app = express()

app.get('/batches', (req, res, next) => {
  Batch.find()
  .sort({ createdAt: -1 })
  .then((recipes) => res.json(recipes))
  .catch((error) => next(error))
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
