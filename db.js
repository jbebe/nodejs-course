const mongoose = require('mongoose');

const NEPTUN_CODE = 'cgq956';
const DB_URL = `mongodb://localhost/${NEPTUN_CODE}`;

// create course
const CourseSchema = mongoose.Schema({
  _id: String,
  info: String,
  tasks: [{
    type: Number,
    ref: 'task'
  }]
});
const Course = module.exports.Course = mongoose.model('course', CourseSchema);

// create task
const TaskSchema = mongoose.Schema({
  _id: Number,
  deadline: Date,
  description: String,
  submissions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'submission'
  }],
  course: {
    type: String,
    ref: 'course'
  }
});
const Task = module.exports.Task = mongoose.model('task', TaskSchema);

// create submission
const SubmissionSchema = mongoose.Schema({
  path: String,
  neptun: String,
  late: Boolean,
  rating: String,
  comment: String,
  task: {
    type: Number,
    ref: 'task'
  }
});
const Submission = module.exports.Submission = mongoose.model('submission', SubmissionSchema);

module.exports.initDb = (withTestData = false) => {
  mongoose.connect(DB_URL)
    .catch(console.log)
    .then((self) => {
      console.log(`Connected to ${DB_URL}`);

      if (withTestData){
        // test instances
        const taskId = 5;
        const courseId = 'vitmav42';
        const neptunCode = 'cgq956';
        const submissionObj = new Submission({
          path: '/',
          neptun: neptunCode,
          late: false,
          rating: 'Ok',
          comment: 'Meh..',
          task: taskId
        });
        submissionObj.save().catch(console.log);
        const taskObj = new Task({
          _id: taskId,
          deadline: new Date(),
          description: 'This is the description',
          submissions: [submissionObj._id],
          course: courseId
        });
        taskObj.save().catch(console.log);
        const courseObj = new Course({
          _id: courseId,
          info: 'This is the info',
          tasks: [taskObj._id]
        });
        courseObj.save().catch(console.log);
      }
    });
};
