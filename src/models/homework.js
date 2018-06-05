let mongoose = require('mongoose')
let Schema = mongoose.Schema

let homeworkSchema = new Schema({
  id: String,
  name: String,
  description: String,
  difficulty: Number,
  fileName: String,
  maxPoints: Number,
  typeOfAudit: String,
  solutionFileName: String,
  startTime: Date,
  dueTime: Date,
  finishedBy: [String]
})

homeworkSchema.statics.getAll = function() {
  return this.
  find().
  select('-_id -solutionFileId -finishedBy').
  exec()
}

homeworkSchema.methods.finish = function(userId, cb) {
  if(this.finishedBy.includes(userId)) {
    cb(null, false)
  } else {
    this.finishedBy.push(userId)
    this.save((err) => {
      if (err) {
        cb(err)
      }
      cb(null, true)
    })
  }
}

homeworkSchema.statics.findById = function(homeworkId) {
  return this.findOne({id: homeworkId}).exec()
}

const Homework = mongoose.model('Homework', homeworkSchema)
module.exports = Homework
