const crypto = require('crypto');
const { CourseCode, AdminPassword } = require("../config");

const adminPasswordHash = crypto.createHmac('sha256', AdminPassword).digest('hex');

/*
    Ez a MW adja hozzá az ejs behelyettesítésekhez az admin kapcsolót.
 */
exports.PartialRenderAdminMW = function(req, res, next){
  const isAdmin = ('admin-pass' in req.cookies) && req.cookies['admin-pass'] === adminPasswordHash;
  res.locals.template = {
    isAdmin: isAdmin
  };
  next();
};

/*
    Ez a MW rendereli ki az index oldalt.
 */
exports.RenderIndexMW = function(req, res, next){
  const template = {
    title: `${CourseCode}/info`,
      courseCode: CourseCode,
    content: '### Lorem Ipsum is simply dummy text.\nof the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    currentPage: 'info'
  };
  Object.assign(res.locals.template, template);
  res.render('info', res.locals.template);
};

/*
    Ez a MW rendereli ki a feladat értékelés oldalt.
 */
exports.RenderSingleTaskMW = function(req, res, next) {
  const taskId = req.param('id');
  const template = {
    title: `${CourseCode}/task ${taskId}`,
    courseCode: CourseCode,
    currentPage: 'singleTask',
    taskId: taskId,
    ratings: [
      {
        neptun: 'ABC123',
        isLate: true,
        result: 'OK',
        comment: 'S\'okay...'
      },
      {
        neptun: 'DEF456',
        isLate: false,
        result: 'BAD',
        comment: 'Not okay'
      },
      {
        neptun: 'ZXY123',
        isLate: false,
        result: 'OK',
        comment: ''
      }
    ]
  };
  Object.assign(res.locals.template, template);
  res.render('singleTask', res.locals.template);
};

/*
    Ez a MW rendereli ki a feladatkiírások odlalát.
 */
exports.RenderTasksMW = function(req, res, next) {
  const template = {
    title: `${CourseCode}/tasks`,
    courseCode: CourseCode,
    currentPage: 'tasks'
  };
  Object.assign(res.locals.template, template);
  res.render('tasks', res.locals.template);
};

/*
    Ez a MW rendereli ki a feltöltő oldalt.
 */
exports.RenderUploadMW = function(req, res, next) {
  const template = {
    title: `${CourseCode}/upload`,
    courseCode: CourseCode,
    currentPage: 'upload',
    uploadStatus: req.query.status
  };
  Object.assign(res.locals.template, template);
  res.render('upload', res.locals.template);
};