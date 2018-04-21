const mongoose = require('mongoose');
const { Course, Task } = require('./../db');

module.exports.DbLoadIndex = async (req, res, next) => {
  res.locals.course = await Course.findOne();
  next();
};

module.exports.DbLoadTasks = async (req, res, next) => {
  res.locals.tasks = await Task.find();
  next();
};