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
.patch('/batches/:id',
  // authenticate,
  (req, res, next) => {
  const id = req.params.id
  let newStudent = req.body
  console.log('here')
  console.log(newStudent)
  Batch.findById(id)
  .then((batch) => {
    if(!batch) {return next()}
    const updatedStudents = [newStudent].concat(batch.students)
    console.log(updatedStudents)
    Batch.findByIdAndUpdate(id, { students: updatedStudents }, { new: true })
    .then((batch) => res.json(batch))
  })

    .catch((error) => next(error))
})

module.exports = router
