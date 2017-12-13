const router = require('express').Router()
const { Batch } = require('../models')
const passport = require('../config/auth')


const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches', (req, res, next) => {
  Batch.find()
  .sort({ createdAt: -1 })
  .then((batches) => res.json(batches))
  .catch((error) => next(error))
})
.get('/batches/:id', (req, res, next) => {
  const id = req.params.id
  Batch.findById(id)
    .then((batch) => {
      if (!batch) { return next() }
      res.json(batch)
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
