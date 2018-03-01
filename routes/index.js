const CourseCode = require("../config").CourseCode;
const express = require('express');
const router = express.Router();

router.get(['/', `/${CourseCode}`], function(req, res, next) {
  res.render('info', {
    title: `${CourseCode}/info`,
    courseCode: CourseCode,
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    currentPage: 'info'
  });
});

router.get('/task/:id', function(req, res, next) {
  res.render('single-task', {
    title: `${CourseCode}/task ${req.param('id')}`,
    courseCode: CourseCode,
    currentPage: 'singleTask'
  });
});

router.get('/tasks', function(req, res, next) {
  res.render('tasks', {
    title: `${CourseCode}/tasks`,
    courseCode: CourseCode,
    currentPage: 'tasks'
  });
});

router.get('/upload', function(req, res, next) {
  res.render('upload', {
    title: `${CourseCode}/upload`,
    courseCode: CourseCode,
    currentPage: 'upload'
  });
});

module.exports = router;
