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
  Batch.findById(id)
  .then((batch) => {
    if(!batch) {return next()}
    const updatedStudents = [newStudent].concat(batch.students)
    Batch.findByIdAndUpdate(id, { students: updatedStudents }, { new: true })
    .then((batch) => res.json(batch))
  })

    .catch((error) => next(error))
})
  .patch('/batches/:id1/:id2',
  // authenticate,
  (req, res, next) => {
    const id1 = req.params.id1
    const id2 = req.params.id2
    let evaluation = req.body
    evaluationDateNew = new Date(evaluation.evaluationDate).toDateString()
    Batch.findById(id1)
      .then((batch) => {
      if(!batch) {return next()}
      //clusterfuck below :'( needs refactoring
      const updatedStudentsWithEvals = batch.students.map(student=>{
        if (student._id==id2) {

          let evaluationDates=student.performanceCodes.map(code=>code.evaluationDate.toDateString())

          //overwrighting or adding evaluations
          let updatedCodes = evaluationDates.includes(evaluationDateNew) ?
          student.performanceCodes.map(code=>{
            if (code.evaluationDate.toDateString()===evaluationDateNew) {
              return evaluation
            }
            return code
          })
           :
          [evaluation].concat(student.performanceCodes)
          //

          return {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          linkToPhoto: student.linkToPhoto,
          performanceCodes: updatedCodes}
      }
      return student
      })

    Batch.findByIdAndUpdate(id1, { students: updatedStudentsWithEvals }, { new: true })
      .then((batch) => res.json(batch))
    })


    .catch((error) => {
      console.log(error)
      next(error)
    })
  })
.delete('/batches/:idB/:idS',
// authenticate,
(req, res, next) => {
  const idB = req.params.idB
  const idS = req.params.idS
  Batch.findById(idB)
  .then((batch) => {
    if(!batch) {return next()}
    const remainingStudents = batch.students.filter(student=>student._id!=idS)
    Batch.findByIdAndUpdate(idB, { students: remainingStudents }, { new: true })
    .then((batch) => res.json(batch))
  })
})

module.exports = router
