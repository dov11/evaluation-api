const router = require('express').Router()
const { Batch } = require('../models')

router.get('/batches', (req, res, next) => {
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

module.exports = router