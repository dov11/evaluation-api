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
.get('/batches/:id1/:id2', (req, res, next) => {
  const id1 = req.params.id1
  const id2 = req.params.id2
  Batch.findById(id1)
    .then((batch) => {
      if (!batch) { return next() }
      console.log(batch.students.filter(student=>student._id == id2)[0])
      res.json(batch.students.filter(student=>student._id == id2)[0])
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
