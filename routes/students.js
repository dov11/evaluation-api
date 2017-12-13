const router = require('express').Router()
const { Batch } = require('../models')
const passport = require('../config/auth')


const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches/:id1/:id2', (req, res, next) => {
  const id1 = req.params.id1
  const id2 = req.params.id2
  Batch.findById(id1)
  .then((batch) => {
    if (!batch) { return next() }
    res.json(batch.students.filter(student=>student._id == id2)[0])
  })
  .catch((error) => next(error))
})

module.exports = router
