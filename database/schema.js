const mongoose = require('mongoose');

// create course
const CourseSchema = mongoose.Schema({
  _id: String,
  info: String,
  tasks: [{
    type: Number,
    ref: 'tasks'
  }]
});
const Course = module.exports.Course = mongoose.model('courses', CourseSchema);

// create task
const TaskSchema = mongoose.Schema({
  _id: Number,
  name: String,
  deadline: Date,
  description: String,
  submissions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'submissions'
  }],
  course: {
    type: String,
    ref: 'courses'
  }
});
// So apparently we can't hook on document remove
/*TaskSchema.pre('remove', function(next){
  // remove all submissions before deleting parent task
  console.log('Deleting submissions...');
  this.model('submissions').remove({ task: this._id }, (err, result) => {
    if (err){
      console.log('Error, while deleting tasks: ' + JSON.stringify(err));
    }
    next.apply(null, arguments);
  });
});*/
const Task = module.exports.Task = mongoose.model('tasks', TaskSchema);

// create submission
const SubmissionSchema = mongoose.Schema({
  path: String,
  neptun: String,
  late: Boolean,
  rating: String,
  comment: String,
  task: {
    type: Number,
    ref: 'tasks'
  }
});
const Submission = module.exports.Submission = mongoose.model('submissions', SubmissionSchema);