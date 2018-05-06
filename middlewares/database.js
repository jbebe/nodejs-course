const mongoose = require('mongoose');
const {Task, Submission, Course} = require('../database/schema');

module.exports.DbLoadIndex = async (req, res, next) => {
  res.locals.course = await Course.findOne();
  next();
};

module.exports.DbLoadTasks = async (req, res, next) => {
  res.locals.tasks = await Task.find();
  next();
};

module.exports.DbLoadSubmissions = async (req, res, next) => {
  const taskId = req.params.id;
  res.locals.submissions = await Submission.find({ task: taskId }).sort('neptun');
  next();
};