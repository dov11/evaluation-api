const express = require('express')
const bodyParser = require('body-parser')
const { Batch } = require('./models')

const PORT = process.env.PORT || 3030

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .get('/batches', (req, res, next) => {
    Batch.find()
    .sort({ createdAt: -1 })
    .then((recipes) => res.json(recipes))
    .catch((error) => next(error))
  })
  .get('/batches/:id', (req, res, next) => {
    const id = req.params.id
    Batch.findById(id)
      .then((game) => {
        if (!game) { return next() }
        res.json(game)
      })
      .catch((error) => next(error))
      })
  .post('/batches',
  // authenticate,
   (req, res, next) => {
    let newBatch = req.body
    // newGame.userId = req.account._id
    // newGame.grid=getNewGrid()

    Batch.create(newBatch)
      .then((game) => res.json(game))
      .catch((error) => next(error))
  })

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
