const crypto = require('crypto');
const { CourseCode, AdminPassword } = require("../config");
const express = require('express');
const router = express.Router();

const adminPasswordHash = crypto.createHmac('sha256', AdminPassword).digest('hex');

const isAdmin = (request) => {
  return ('admin-pass' in request.cookies) && request.cookies['admin-pass'] === adminPasswordHash;
};

router.get(['/', `/${CourseCode}`], function(req, res, next) {
  res.render('info', {
    title: `${CourseCode}/info`,
    courseCode: CourseCode,
    content: '### Lorem Ipsum is simply dummy text.\nof the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    currentPage: 'info',
    isAdmin: isAdmin(req)
  });
});

router.get('/task/:id', function(req, res, next) {
  res.render('singleTask', {
    title: `${CourseCode}/task ${req.param('id')}`,
    courseCode: CourseCode,
    currentPage: 'singleTask',
    isAdmin: isAdmin(req)
  });
});

router.get('/tasks', function(req, res, next) {
  res.render('tasks', {
    title: `${CourseCode}/tasks`,
    courseCode: CourseCode,
    currentPage: 'tasks',
    isAdmin: isAdmin(req)
  });
});

router.get('/upload', function(req, res, next) {
  res.render('upload', {
    title: `${CourseCode}/upload`,
    courseCode: CourseCode,
    currentPage: 'upload',
    isAdmin: isAdmin(req)
  });
});

module.exports = router;
